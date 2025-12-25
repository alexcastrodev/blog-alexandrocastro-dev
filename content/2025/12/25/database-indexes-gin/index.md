---
title: "Pequena otimização com índice GIN"
date: '2025-12-25T19:53:00-03:00'
slug: database-indexes-gin
tags:
- database
- indexes
- postgres
draft: false
---

# Introdução

Em pleno feriado, nada para fazer, eu tinha em mente um relatório que recebi no fim de semana, de um dos meus serviços que deixo rodando no meu homelab.

O report recebido era esse:

![image](https://github.com/user-attachments/assets/ac95d993-2d7f-4a2e-a706-e4f4fd8f0a90)

Essa era a "pior" query, visto que era um serviço com poucos acessos, então outros endpoint estava em um ótimo tempo de resposta.

Essa query, se fosse algum serviço maior e mais sério, não precisava gastar tanto tempo nisso, mas foi umas horas de aprendizado.


# Contexto

Tenho uma API onde a autenticação é delegado ao Auth0, e ao criar um novo usuário na minha db, antes preciso verificar se esse email já foi criado ou não. A princípio, isso é uma coisa banal de se fazer, já que temos índices unique na maioria dos bancos de dados.

O "problema" é que um usuário, pode ter várias "identidades", ou formas de se conectar. Para o Auth0, login via Google, é uma conta diferente de Login / Password, que também é diferente do Login com Facebook. Para vincular as contas, entra os "link account".

Se sua regra de negócio não permite que o mesmo email seja contas diferentes, você precisa ter uma "action" que faz alguma ação antes de realizar o cadastro. E eu tenho uma API com chave (M2M) que diz se aquele email já existe em minha base, ou não.

Basicamente armazeno as contas do seguinte formato:

- id (PK)
- auth0_id (qual identity é a principal, para controle de qual não pode ser desassociada, até a troca de outra principal)
- auth0_infos 

Entenda auth0_infos como dados parciais da conta como se fosse um cache. por exemplo: 

`{ {"identities" => {"google-oauth2|1234" => {"email" => "xx@x.com", "connection" => "google-oauth2", "email_verified" => true } } )`

# Problema

O index que criei primeiramente, era para solucionar a busca rápida pelo auth0_id, que fazia algo do tipo:

```sql
select auth0_infos->'identities' ? 'google-oauth2|1234' from users
```

com o index:

```sql
(auth0_infos -> 'identities'::text)
```

O explain analyze me retornou um bitmap, com menos de 1ms, estava feliz e pronto, vida que segue.

Porém quando surgiu a necessidade de existir a implementação dos identities, o que eu fiz foi algo do tipo:

```sql
SELECT "users".* FROM "users" WHERE (EXISTS (
        SELECT 1 FROM jsonb_each(auth0_infos->'identities') AS identity
          WHERE identity.value->>'email' = 'user_xpto@example.com'
));
```

Na minha cabeça, funcionava perfeito, como tinha poucos usuários, não me importei muito, então "compilou, vendeu".

O resultado foi ter um [FULL SCAN Query](https://en.wikipedia.org/wiki/Full_table_scan).

# Pesquisa

Após ver o report, decidi melhorar meu entendimento sobre como isso realmente funcionava, e vou deixar uns artigos que me ajudou:

- [Optimizing Array Queries With GIN Indexes in PostgreSQL](https://www.tigerdata.com/learn/optimizing-array-queries-with-gin-indexes-in-postgresql)

- [Understanding Postgres GIN Indexes: The Good and the Bad](https://pganalyze.com/blog/gin-index)

- [GIN - Just A Kind Of Index](https://www.cybertec-postgresql.com/en/gin-just-an-index-type/)

- [Mastering PostgreSQL GIN Indexes: The Ultimate Guide to Faster JSONB, Array, and Full-Text Search](https://medium.com/@vedantthakkar1003/mastering-postgresql-gin-indexes-the-ultimate-guide-to-faster-jsonb-array-and-full-text-search-f1f8ec3e67af)

Um [post do Stack Overflow](https://stackoverflow.com/questions/44326458/is-gin-index-on-postgres-jsonb-column-nested) me chamou atenção aqui: "For containment @> it works with nested values. For other operators it works only for top-level keys or whatever level is used in expression index. Also, according to documentation, using expression index on level you want to query will be faster than simple index on whole column (makes sense as size is smaller).

If you are doing only containment search, consider using jsonb_path_ops while building your index. It is smaller and faster."

Então se juntarmos os posts, com o esse comentário, percebemos que o problema ta mesmo na query e não no index.

Mas até onde podemos melhorar?

# Solução 

Primeiro, Vamos trocar testar remover o jsonb_each e usar operador simples de concat. @> que o jsonb_path_ops suporta:

```
SELECT * FROM users WHERE auth0_infos -> 'identities' @> '[{"auth0_id": "auth0|52e3af8e7f5be863c4169abb"}]'::jsonb;
SELECT * FROM users WHERE auth0_infos -> 'identities' @> '[{"email": "user_100000_aa7daf85@example.com"}]'::jsonb;
```

No Rails:

![changes](https://github.com/user-attachments/assets/33b9ef4e-33ae-4a4e-a927-96afa0a6b406)

Preparei uma DB com uma quantidade considerável de usuários ( 100 mil ), e o resultado:

```bash
Antes:
Execution Time: 187.472 ms

Depois: 
Execution Time: 0.084 ms
```

Se só estamos utilizando esse operador, e não precisamos de tanta flexibilidade (interseções, mais entradas indexadas), não precisamos ter tantas entries no nosso índice.

Atualmente temos este peso (índice não é grátis): 

```bash
SELECT pg_size_pretty(pg_relation_size('index_users_on_auth0_infos_identities'));

22 MB
```

Agora quero ver qual a diferença que tenho, após criar apenas jsonb_path_ops:

```sql
CREATE INDEX idx_users_auth0_identities ON users USING GIN ((auth0_infos -> 'identities') jsonb_path_ops);
SELECT pg_size_pretty(pg_relation_size('index_users_on_auth0_infos_identities'));

12 MB
```

Bem menos, resolvendo o mesmo problema!

# Conclusão

Ainda não é um assunto que domino 100%, mas entender a diferença de BTREE, GIN, GIST, Brin, Hash como índice, e sua estrutura de dados te faz pensar com mais clareza na solução.

Foi bom conhecer também os limites de escritas dos índices GIN, tanto em tamanho de pendentes, como em lentidão de escrita, que me faz pensar no como o não relacional resolve bem essa parte.

Obrigado por ler até aqui, um abraço.