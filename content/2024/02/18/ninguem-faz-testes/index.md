---
title: "Ninguém Faz Testes"
date: '2024-02-18T17:47:00-03:00'
slug: ninguem-faz-testes
tags:
- testes
- testing
- desenvolvimento
- qualidade
- backend
- frontend
- bdd
- unit-tests
- integration-tests
draft: false
---

Este problema que abordo nesse post se encaixa maior parte das vezes com desenvolvedores júniors e pleno (mid level), por que sêniors e líderes só evitam testes se quiserem, já que tem grande influência sobre o que está fazendo. 
Mas vou incluir alguns, que trabalham em grandes empresas e que realmente, seja muito difícil mudar algo internamente. (Tenho dificuldade em acreditar que essas empresas realmente não implementam testes)

Mas vamos ao ponto principal, e não espere uma solução mágica vindo deste post, por que o limite dele, é meu conhecimento.

# Minha empresa não faz testes, o que fazer?

Vários fatores cria esse ambiente, falta de prioridade, produto interno que não tem grande prioridade, falta de senioridade do líder (existe líderes junior, acreditem), entre outros...

Todos esses fatores não justificam que o pedaço que você está construindo, seja feito de qualquer forma, igual aos outros membros.

### Lugares "flexíveis"

Em alguns casos, onde não se é proibido (sim, existe esse local) criar testes no projeto e for algo totalmente opcional, você pode importar apenas seu trecho, e validar a função ou a classe que criou.

Nestes casos, vai ser mais fácil para Mid-level, já que eles fizeram testes, ou tem uma facilidade em ler uma documentação. 
Sinto de dizer que para muito juniors, vai ser uma experiência ruim, já que vai ter que fazer sozinho (caso realmente ninguém se importe com testes), e quando falhar, vai ser um pouco decepcionante, caso for outra pessoa que quebrou e não validou.

Pode também ser considerado uma pessoa mais lenta para fazer funcionalidades. Mas considere um seguinte ponto, é melhor ser conhecido por fazer um pouco mais lento que outros, e fazer apenas uma vez, do que fazer rápido e estar sempre voltando por causa de problemas.

No final, eu sempre vou aconselhar seguir com testes, sempre foi minha opinião, e nunca me impediram isso, mas tenho amigos que já bloquearam ele e poderia custar o emprego. Sinceramente, segure seu emprego e aprenda coisas por fora, até encontrar um ambiente melhor.

### Lugares não flexíveis

Como eu disse no texto anterior, existem lugares onde realmente não querem que você perca tempo criando testes, porém, vão te cobrar se não funcionar corretamente, exigindo um teste manual.

Neste caso, no Backend (na minha opinião), será mais fácil resolver, por que você pode usar localmente um modelo Behaviour Driven Development, onde você precisa trabalhar com API's, e então seus testes locais vão fazer requisições, e você pode no final validar as resposta 200, 400, 422, etc...

O Frontend é pra mim, muito mais difícil fazer esse isolamento. Vou dar um exemplo de uma parte do fluxo da empresa onde eu trabalho.

Se eu quiser testar a disponibilidade de um produto, dentro de uma reserva, eu preciso: Ter um produto criado (com preço, configuração de estoque, fotos, descrição), ter uma reserva (com cliente, data), o cliente precisa ter parametros cadastrados, e enfim adicionar tudo a reserva e então validar com testes de end-to-end. E tem o risco de alguem alterar parte do fluxo, e quebrar seu teste.

Claro que não nos encaixamos neste cenário, mas como eu já disse, tenho amigos que passaram por isso.

# Falta de senioridade

Esta talvez seja a mais desafiadora no começo, quando você nunca teve uma experiência com testes, quer implementar, mas nem você e nem seus colegas tem conhecimento.
(Aqui, eu só conheço 1 pessoa, onde ele é o lider, e tem pouco tempo de experiência, e tem apenas 1 desenvolvedor com ele.)

Neste caso, tente você ler sobre testes, divide seu tempo com vídeos e artigos que ensinam como fazer no ambiente próximo ao seus, e no final puxa um workshop para que todos consigam aprender um pouco contigo. Não espere que outros façam, vai e faz.

Tente pedir ajuda de alguém experiente em colocar verificação de testes na pipeline, caso você não souber. 

Não tenho muito o que dizer além disso, é sentar na cadeira de noite, e estudar para resolver o problema.

# Afinal de contas, Então o que fazer ?

Não tem o que fazer para mudar o agora, mas normalmente esses tipo de lugares, muito das vezes, quebra fluxo quase o tempo todo. Aí é sua hora de brilhar, na reunião fala que é possível resolver com testes unitários, end-to-end, de integração. Mostra seu projeto pessoal como você fez isso. 

Óbvio, não é sempre que vão te dar a medalha pela brilhante idéia, mas insiste, em outras reuniões, que certamente vai ter fluxo quebrando, diz que é possível resolver.

Tenha cuidado ao dizer, e quando dizer. Imagina que o fluxo quebrou em um cliente importante, perderam uma oportunidade muito boa, ou uma considerável, e ele recebeu reclamação, e então vai repassar isso pro Sênior ou Lead. Ai você, um bom menino vai falar: "Olha, testes resolveria esse caso.".

Talvez seja uma experiência que você nunca vai ter, mas não tira a possibilidade de você mostrar para seu Lead ou Sênior a importância. 

Outra coisa que você pode fazer ( mesmo sendo junior ), é pedir para criar uma meeting de 15 a 20 minutos, sobre testes, e como você faz. Você não precisa ser o melhor testador de software do planeta, sua soft skill de melhorar a qualidade da sua entrega, vai ser compensada em ajuda de desenvolvedores mais experientes.


# Considerações finais

Este artigo não é um paper ciêntifico, então, não tem referências. Assim como a maioria dos livros, é apenas minha experiência pessoal.

Não espere que seus esforços para mudar as coisas, vão acontecer. Mas sempre espere que seu conhecimento adquirido em criar algo com qualidade, seja um fruto de emprego, salário e considições melhores.

Não pense que foi em vão, todo seu esforço. Em uma entrevista, mostrar que você viu algo errado, e tentou melhorar, é um ótimo ponto.

Uma recomendação não técnica, é ler o livro do Pete Goodlife: Como ser um Programador Melhor: um Manual Para Programadores que se Importam com código.