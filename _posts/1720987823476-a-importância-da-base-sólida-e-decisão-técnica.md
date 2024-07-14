---
title: 'A importância da base sólida e decisão técnica'
excerpt: 'Só porque você consegue arrancar um parafuso da parede com um alicate, não quer dizer que deveria, acha a porra da chave correta'
coverImage: 'https://github.com/user-attachments/assets/533aea2a-b831-4d62-8916-dd47915ce91a'
date: '2024-07-14T20:11:19.916Z'
author:
  name: Alexandro castro
  picture: 'https://github.com/alexcastrodev.png'
ogImage:
  url: 'https://github.com/user-attachments/assets/533aea2a-b831-4d62-8916-dd47915ce91a'
---

## Introdução

Existem algumas coisas que me deixam profundamente chateado no nosso contexto de desenvolvimento de software.

Posso citar algumas como: decisão sem motivo técnico, ataque à decisão sem saber o contexto de implementação e falta de compromisso com seu próprio trabalho.

Vou explorar esses três pontos e dar minha visão pessoal sobre eles.

### Ataque à decisão técnica

Não importa se você é Frontend, Backend ou DevOps. Se você já tem experiência, já deve ter implementado algo que hoje em dia não é muito comum.

Assim como no Japão se usa fax ao invés de e-mail, ou startups que usam FTP ao invés de algum CI com Github, Gitlab, ou o que for, sempre haverá alguém que irá criticar a abordagem.

O que eu defendo não é o que está sendo usado e sim o contexto do todo. Vá até o Japão e grite para todo mundo que deveriam usar e-mails, e que sua opinião é super validada e maravilhosa. Boa sorte!

Um post muito "interessante" falando sobre não se deveria usar várias bibliotecas para resolver o suposto "problema".

O autor não estava errado em dizer que não deveria haver falta de padronização, porém duas ferramentas podem coexistir pela identificação de um problema técnico.

Vou contar uma experiência pessoal, mas não leve tanto em conta a tecnologia usada, porque hoje ela está em alta, amanhã será uma totalmente diferente.

Eu mesmo, quando era Frontend Lead, tomei uma decisão onde escolhi uma biblioteca que era bastante usada, tinha "battle-tested" (termo usado para algo bem utilizado por anos), e resolvia 90% dos problemas.

Porém, a implementação no NextJS era ruim, mas só se perceberia isso com o tempo. Após um ano e meio da existência, foi necessário migrar, pois do contrário prejudicaria o uso da plataforma.

Uma nota importante aqui: o workaround não valia a pena. Era tampar o sol com a peneira.

A escolha da mudança deveria ser bem testada, cobrir a necessidade do uso atual e cobrir o caso de uso onde estava ocorrendo o problema.

Migrar tudo seria muito trabalhoso, então decidi criar uma dívida técnica e migrar os pontos onde estava começando o gargalo. E então, toda alteração na aplicação posterior que tocasse nessa biblioteca, era necessário mover para a nova implementação.

Pontos importantes:

- O ponto é usar a ferramenta correta no tempo correto.
- Ter base técnica na escolha e na mudança.
- Nem tudo é projeto recém-iniciado, onde você tem todas as escolhas certas.
- Provavelmente, a ferramenta que você acha ideal nem existia quando a solução foi feita.

### Decisão sem motivo técnico

Uma decisão feita por falta de contexto ou conhecimento, embora não seja comum num cargo de líder técnico, na minha opinião, dá para entender.

Ninguém tem que ficar a cada segundo procurando a última ferramenta do momento, embora as escolhas precisem ser baseadas no CASO DE USO para o problema que está sendo resolvido.

Mas não estou falando de overengineering. Não é basicamente escolher Kubernetes, Kafka, RabbitMQ, e outros exemplos que podem ser demais para atender poucos clientes.

Vou dar um exemplo baseado na experiência que tive um tempo atrás.

Existe um problema no Frontend que não é novidade. Acontece em todos os frameworks e foi resolvido com Tree-Shaking. Você pode depois pesquisar caso não conheça esses problemas de bundler. Você também pode ver uma pesquisa que eu fiz sobre [code splitting](https://alexandrocastro.dev.br/posts/1686297600322-code-splitting).

Certa altura, quando apresentei esse problema em um dos comentários de um code review, a resposta que recebi foi: "Entendo seu ponto. Mas siga da minha forma, que fica mais padronizado".

Onde a opinião pessoal foi mais forte que uma base técnica.

Eu realmente não me importo com isso, desde que não seja com um projeto sob minha responsabilidade. Isto é um sintoma de fraqueza, onde o ego é maior do que sua base técnica e suas bases fracas.

Eu compartilho de uma coisa que o Akita disse sobre DHH e o Ruby on Rails: ["Certo ou errado, ele owna as decisões em vez de se esconder atrás de um comitê. Isso é integridade conceitual que todo projeto precisa: um ditador benevolente. Gostem ou odeiem, foi o que manteve o Rails intacto até hoje."](https://www.akitaonrails.com/2019/08/21/akitando-59-a-historia-de-ruby-on-rails-por-que-deu-certo)

DHH, ou o criador do Rails, tem opiniões fortes porque suas bases são fortes.

Pontos importantes:

- O chef não conhece todas as comidas do mundo, mas ele tem um paladar treinado e sabe quando algo é mal feito.
- Você não precisa saber tudo, mas precisa ter boas bases sólidas.
- Com bases fracas, criam-se líderes fracos.

### Falta de compromisso com seu próprio trabalho

Eu já falei minha opinião no último post sobre fazer testes unitários e de integração.

Se você ainda está aprendendo ou tem pouca experiência como programador, o que vou dizer não é para você. Mesmo que, na minha opinião, você já deveria estar explorando testes.

Mas eu já estou cansado de ver pessoas "experientes" dando desculpinhas sobre fazer testes. Pessoas com anos de experiência, com a falácia de "ninguém faz testes, e se meu PR for aprovado, não vou fazer o teste. Só se for obrigatório". Ou até mesmo líderes que não se importam com testes, não têm métricas, e os poucos testes que fazem têm nível porco de validação.

Para mim, todos não têm compromisso com seu próprio trabalho, preferem estar correndo atrás do rabo em um ciclo sem fim, tentando corrigir bugs que nem deveriam existir, e bugs que já foram corrigidos várias vezes e que passam de mão em mão.

Pior que um líder medíocre é ter pessoas que não se importam se seu "grande código à prova de falha" quebrar em produção.

Se você ainda quer se salvar, leia este artigo sobre: [Rant: Projetos, TESTES e Estimativa???](https://www.akitaonrails.com/2022/10/25/akitando-130-rant-projetos-testes-e-estimativa-rated-r-5097af48-c72f-42b7-bec4-486e24a86cfc)

Pontos importantes:

- Sua estimativa da tarefa deveria contar com a tarefa e os testes.
- Se você tem a possibilidade de fazer testes e mesmo assim não faz, seu trabalho ainda é tão medíocre quanto você.
- Falar que o projeto já está há meses ou até anos sem nenhum teste é o cúmulo da preguiça.
