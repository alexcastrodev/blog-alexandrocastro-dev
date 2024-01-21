---
title: 'AdonisJS e sua produtividade - NodeJS on Rails'
excerpt: 'Quando você conhece o termo convention over configuration, você entende o que é produtividade.'
coverImage: 'https://github.com/AlexcastroDev/blog-alexandrocastro-dev/assets/10711649/6b5c7570-f5d1-4c49-9a6d-a6f654b47c97'
date: '2024-01-21T09:00:00.322Z'
author:
  name: Alexandro castro
  picture: 'https://github.com/alexcastrodev.png'
ogImage:
  url: 'https://github.com/AlexcastroDev/blog-alexandrocastro-dev/assets/10711649/6b5c7570-f5d1-4c49-9a6d-a6f654b47c97'
---

TLDL: Este artigo gira mais em volta de produtividade, do que falar de framework em si.

Já faz uns meses que eu não tenho escrito nada, e nem feito twitch ou lives no Youtube. Isso tem me chateado um pouco, por que é algo visível da minha evolução de explicar algumas coisas que tenho curiosidade. Exclusivamente para isso, pois nunca olhei números de views de meus vídeos, e nem tenho atualmente analytics no meu blog.

Este artigo vai documentar um pensamento, e espero que ajude a ver as coisas desse modo, concordando ou não.

## Frameworks

Hoje todos nós temos um leque de frameworks como o [NestJS](https://nestjs.com/), [Adonis](https://learn.adonisjs.com/), [Express](https://expressjs.com/), [Fastify](https://fastify.dev/), Koa, Hapi, etc...

Fora os ORM (TypeORM, Prisma, Knex, etc...), Testing library, etc...

No mundo Javascript, isso é bem normal, né ? "Não gosto da biblioteca X, vou construir uma totalmente nova e diferente, por que do meu jeito é melhor". Daí percebemos uma divisão na comunidade.

## Background

Normalmente quando eu penso em Java, penso Spring e Hibernates, quando penso C#: .NET MVC e Entity Framework, Ruby: penso em Rails e PHP penso Laravel e Eloquent.

Essas ferramentas (entenda que são ferramentas) não são bala de prata, mas padronizam os projetos.

Veja por exemplo o caso do Ruby on Rails, e da própria comunidade Rails. A mentalidade é completamente diferente, as coisas já foram resolvidadas a tanto tempo, que não é necessário ficar recriando as coisas.

"Ah, e se eu quiser escalar", Rails escala mesmo com arquitetura monolito. (Veja o caso Spotify com Rails Engine)[https://shopify.engineering/shopify-monolith]

Não é necessário recriar ORM, se existe algum problema no ORM Active Record, bora lá abrir uma issue, abrir um PR, e resolver o problema. Sinceramente, isso mudou meu pensamento. ( olha que eu amo criar Open Source )

Realmente, tem coisas que não precisa ser criadas, e um PR resolveria.

## O Tempo

O ponto alto da produtividade, é usar ferramentas que existe há um tempo, que já resolve o mesmo problema há tempo.

O melhor Framework, ORM, Biblioteca de testes em pleno 2024 não deveria ser a pergunta para iniciar um projeto. e na verdade, convention over configuration já existe desde antes de 2005.

O AdonisJS traz isso ao Backend NodeJS desde 2015. Não estou dizendo que vai resolver todos seus problemas, mas repito que essas decisões não deveria existir no começo da construção de software.

Ferramentas novas, ainda não sofreu suficiente no mundo real, para se por a prova. Você não vai mudar tudo de Node para Bun, Denos, "por que sim". Muito menos mudar de TypeORM, Sequelize, Lucid que já existe há anos para Prisma "por que sim".

Se você se pergunta, "será que devo...?" Não, primeiro resolve seu problema com algo que já existe, quando "bater na parede", você pensa em mudar. 

## Arquitetura de pastas?

Por que não existe um consenso? você vai para uma empresa, utilizam DDD, sem convenção, e ás vezes você se pergunta se os devs implementaram eram Domain Driven Design ou Directory Driven Design. Outras vão usar Clean Architecture, com seus use cases, etc... Só que Clean Architecture na empresa A, não é igual na empresa B.

Você perde tempo, perde produtividade, e as vezes você trabalha debaixo de uma arquitetura de como o líder acredita ser a correta.

então novamente, convention over configuration.

## Performance

O desempenho da sua aplicação, depende muito mais de você e da sua infraestrutura, do que do seu código. O seu conhecimento sobre SQL e banco de dados, deveria ser superior ao qual é o ORM de qualquer framework do momento.

Tenha um pensamento crítico, por exemplo: Deveria usar um framework MVC na Azure Functions? (ou Google Functions, AWS lambda, etc.. ?) Claro que não, Serveless não é pra isso.

Pensa em iniciar com performance, se você está num contexto onde já existe um negócio, com milhares de usuários, com problemas acontecendo a cada X tempos, e essa aplicação é pra tirar o gargalo de outros serviços.  

## Trabalho em equipe

A melhor coisa de convention over configuration, é trabalhar em equipe. 

Você consegue trocar de contexto entre projetos, de forma uniforme e com foco na entrega de valor.

## Entrega de valor

Eu simplesmente amo essa parte. 

Você faz o start do seu projeto, e já ataca o negócio / solução.

Esquece qual é a melhor tecnologia para X, Y, Z. ( pense no que eu disse sobre performance )

Isso não se aplica somente a framework e bibliotecas.

Olha esse seguinte caso:

### Caso: Processando dados em massa

Tenho um monolito, onde tudo está correndo tudo bem. 

Recebo uma demanda para trabalhar com arquivos Word, Excel com validações, etc... Podemos trabalhar com Node Streams para resolver isso. A limitação não seria a linguagem.

Mas como andam as bibliotecas que resolvem isso ?

Se isso resolvesse rápido com C# ? Bibliotecas já implementadas, todas mantidas pela Microsoft.

Somos pagos para resolver problemas com as ferramentas certas, de forma produtiva.

# Conclusão

Não tem uma conclusão, Conhecer arquiteturas não é o mal.

Os pontos foram focados em eficiência na entrega de valor.

<img src="https://github.com/AlexcastroDev/blog-alexandrocastro-dev/assets/10711649/75f0c198-556f-451b-a2e4-afed9b824b8d">

# Referências

https://www.mindtheproduct.com/overengineering-can-kill-your-product/

https://rubyonrails.org/doctrine