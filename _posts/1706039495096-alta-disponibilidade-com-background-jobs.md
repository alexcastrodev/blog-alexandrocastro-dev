---
title: 'Alta disponibilidade - Background Jobs'
excerpt: 'Trabalhos em segundo plano são uma abordagem para terceirizar o trabalho. Um trabalho em segundo plano é uma tarefa a ser realizada posteriormente, fora do ciclo de resposta de solicitação.'
coverImage: 'https://github.com/AlexcastroDev/blog-alexandrocastro-dev/assets/10711649/acd5ff3a-0a57-4e9b-b486-1971da7870ad'
date: '2024-01-22T22:00:00.322Z'
author:
  name: Alexandro castro
  picture: 'https://github.com/alexcastrodev.png'
ogImage:
  url: 'https://github.com/AlexcastroDev/blog-alexandrocastro-dev/assets/10711649/acd5ff3a-0a57-4e9b-b486-1971da7870ad'
---

Tráfego na rede, requisições lentas com um parceiro de pagamentos, ou tempo processando arquivo pode fazer sua aplicação ficar mais lenta, ou parar de responder.

Instabilidade gera milhões em prejuízo, e nós como desenvolvedores precisamos saber como mitigar esse tipo de problema. Esse assunto acaba indo para algumas tangentes que leva desde a experiência do usuário, observabilidade, e escalabilidade horizontal com orquestração de containers.

Mas um assunto muito básico e útil, é o uso de Background Jobs. 

## Entendendo o problema

Eu fiz uma experiência recentemente com [Node HTTP](https://github.com/castro-research/http-node-event-loop), e mesmo que não deixamos de receber requisições no Node, por utilizar o Event loop pattern e o Event Emitter, cada processo síncrono precisa ser processado um de cada vez. Então se eu tenho um processo que exige mais CPU, e pare o processo de resposta, outras chamadas vão dar timeout ou simplesmente, crashar. ( Veja a referência 4 )

Essas tarefas podem ser:

- enviar e-mails

- processar imagens e vídeos

- Acionar webhooks ou fazer solicitações a terceiros

- Reconstruir índices de busca

- Importar grandes conjuntos de dados

- Limpar dados obsoletos


# Por que usamos Background Jobs?

Background Jobs são usados para diminuir o trabalho excessivo da sua aplicação principal. Independente da linguagem que você esteja utilizando, o processo feito será fora do ciclo de vida da sua aplicação. 

Hoje em dia uso Ruby on Rails e NestJS, tanto um como o outro podem delegar uma tarefa para ser executada, por exemplo processar alguma imagem na Azure, essa tarefa é armazenada um UUID no Redis, e um Worker -- ou seja, um novo processo separado -- irá processar (na mesma ou em outra máquina), e depois preencher o resultado e emitir que foi concluido para aplicação principal. Então a aplicação principal poderá enviar um email de sucesso, mudar um campo no banco de dados, ou enviar uma mensagem via websocket. A implementação pode mudar, também como o uso da tecnologia também pode, por exemplo como usar banco relacional para guardar os jobs ( veja a referência 6). Mas o importante aqui, é o uso dessa implementação, e não da tecnologia utilizada.

## Implementações

O conceito de multi-tarefa vem evoluindo desde 1950, então com certeza hoje temos soluções buil-in nos frameworks Backend.

No Rails podemos usar o Sidekiq, ou o mais novo ActiveJobs ( referência 9 )

O NestJS, por ser mais um wrapper, ele abstrai o package (BullMQ)[https://github.com/taskforcesh/bullmq]

Ambos são fáceis de usar, sabendo do problema que isto resolve, e o modo Rails e Nest de resolver sua estrutura.

-----------------------

Espero ter ajudado, e fique a vontade para ler os links de referências.


# References

1 - https://shopify.engineering/high-availability-background-jobs

2 - https://www.servertribe.com/kubernetes-alternatives/

3 - https://nodejs.org/en/guides/dont-block-the-event-loop

4 - https://blog.platformatic.dev/the-nodejs-event-loop

5 - https://docs.abp.io/en/abp/latest/Background-Jobs

6 - https://planetscale.com/blog/distributed-caching-systems-and-mysql

7 - https://docs.nestjs.com/techniques/queues

8 - https://learn.microsoft.com/en-us/azure/well-architected/reliability/background-jobs

9 - https://edgeguides.rubyonrails.org/active_job_basics.html