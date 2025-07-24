---
title: "Testes de Integração em Frontend"
date: '2024-03-29T00:00:00-03:00'
slug: testes-de-integracao-em-frontend
tags:
- frontend
- testing
- integration-tests
- javascript
- typescript
- playwright
- cypress
- react
- nextjs
- quality-assurance
draft: false
---

## Introdução

Sempre gostei de testes unitários, integração, e tive que aprofundar mais, quando fiz um trabalho pela minha empresa durante um ano em testes manuais e automatizado em um e-commerce escrito em React Native.

Os problemas no fim das contas, são sempre os mesmos: Fluxos complexos, tempo de execução, dispositivos diferentes, sistemas operacionais diferentes, ambiente diferentes e problemas que surgem por causa de versão do dispositivo, do S.O, da linguagem nativa, da linguagem utilizada de alto nível, arquitetura, e etc...

Eu não vou abordar todos os pontos, mas vou selecionar um específico.

## Testes unitários não é uma bala de prata

Houve um tempo que como líder técnico, eu decidi deixar o Jest num projeto NextJS com 90% de coverage para todo novo módulo.

Essa era uma das muitas vantagem de ter um Monorepo, se você tem um projeto em andamento, e ele tem 30, 40, 50% de coverage em todo o projeto, você pode trabalhar com módulos completos como um package, e exigir que seja um coverage alto. até mesmo se você achar que o módulo Y não precisa ter tanto testes, por ser algo interno, ou uma prova de conceito, você pode abaixar, ou até anular para aquele package, sem influenciar todo o projeto em volta que está sendo melhorado.

------------------------

Um exemplo desse bom funcionamento, é uma aplicação de delivery, onde cada parte do App era administrado por uma squad. Pelo menos no contexto do Android, o carrinho era um .jar com seus gerenciamento de estado, fluxos, e etc. Assim era mais fácil de gerir um módulo especialista ou até simplesmente descartar ele por completo, sem se preocupar com arquivos perdidos no resto da aplicação.

------------------------

Dessa forma, eu consegui com que diminuisse drásticamente a quantidade de issue aberta por causa de erros de renderização ou informações que não deveriam aparecer de tal forma. 

Estes testes não cobrem coisas visuais, alinhamento, fontes, e outros erros no desenvolvimento de Frontend, para isso existe outras ferramentas, e não é disso que quero abordar hoje.

Um dos motivos de eu ter decidido parar de exigir um nível tão alto de coverage, foi ver que embora as issues referentes a quebras de componentes e módulos terem diminuido, não garantia a integração nas aplicações.

Como posso saber que ao alterar um módulo de verificação de disponibilidade de um produto vai funcionar no App X, e quebrar no App Y ? Todas as funcionalidades estão normais, a API não mudou, tenho 90% de coverage, e o meu Storybook mostra todas as definições.

A reposta é simples: O teste unitário não leva em conta o contexto. 

Embora as ferramentas evoluam, e esteja mais próximo do comportamento real do user (como o Testing Library), ainda não é um fluxo integrado, e sim uma unidade, por isso, advinha advinha, teste UNITÁRIO.

Então, vamos avaliar os problemas:

## Problemas e Soluções

Para cada desafio aqui, vai ser um pequeno tópico.

Nestes exemplos, não se preocupe com qual ferramenta eu vou mencionar, qualquer uma que resolve esses problemas, vai ser a melhor. Isso é atemporal.

### Login externo

O fluxo era mais ou menos simples, eu entrava na aplicação, me redirecionava para a página do Auth0, eu validava o network do client, colocava login e senha (use variáveis de ambiente), era redirecionado e fazia o snapshot dos cookies.

Isso era feito no setup global do Playwright, é bem similar ao cypress. Eu conseguia entrar em todas páginas logado, com esse unico setup global.

### Reutilização

É muito comum repetir fluxos durante vários testes, e os testes ficarem grande.

Pense em DRY (do not repeat yourself). Imagine que você precise de criar um produto, então você terá duas classes.

- BaseTest
- ItemTest

ItemTest herda de BaseTest, então no BaseTest você terá o browser headless, e poderá fazer qualquer coisa.

Se para criar o produto, você precisa: Navegar para inventário -> clicar em criar -> preencher X, Y e Z -> Clicar em Salvar -> Produto deve aparecer na lista de produtos.

Você não precisa ter tudo no arquivo spec, no BaseTest você tem o "navegar para" (vai ser igual para todos), e para cada "preencher Y", "preencher X" é um método da classe ItemTest. Então seu teste ficaria simples:

```typescript
const item = new ItemTest()
const name = Faker().name // Use aqui para verificar se está na tabela 

item.fillTitle(name) // se quiser pode ter internamente um Faker::name
item.fillDescription()

await page.waitForSelector(`tr >> text=${nameOfItem}`)

const findItemInTable = await page.$(`text=${nameOfItem}`)

// Valide
expect(findItemInTable).toBeTruthy()
```

Deste jeito, se você precisar mudar algo do fluxo, você concentra os selector e ação em um único lugar.

Utilize boas práticas da sua ferramenta de teste, mas tente atender esse problema, por que quando você tiver 700 testes de integração, como hoje no backend temos, será horrível ter que atualizar todos testes que ficaram outdated.

Mitigue esse problema o máximo possível.

### Reutilização de HTTP

No Ruby on Rails, utilizamos VCR, uma ferramenta nascida em 2010 e que funciona perfeitamente até hoje. O nome no Playwright se chama HAR ( HTTP Archive ). 

Você não precisa SEMPRE chamar o backend, você precisa que com a resposta do Backend, a sua funcionalidade funcione sempre, mesmo que modifique o componente. É isso, não inventa.

Se vai mudar algo no Backend, por exemplo, na criação de produto, agora existe uma nova validação, onde o produto tem pode ou não aparecer no Marketplace, então sim REGRAVE os HAR.

Lembre que o importante é fazer com que a integração do Frontend funcione.

Não utilizar HAR, gera pode gerar vários problemas como: Rate limit, um teste pode corromper outro (concorrência ou ordem de execução pode excluir ou inativar um produto que no próximo teste irá precisar) e longo tempo de execução ( Tempo da tarefa + Resposta das requisições )

### Começar pelo meio, não pelo começo

Em certa altura, você pode precisar ter um produto, reservado para um cliente, para os próximos dois dias, e pago. 

Só que para isso, você precisa ter um item novo (para não ter erro de ordem de execução ou concorrência), criar a ordem, adicionar o produto, a data, o cliente e mover para estado de reservado. Isso pode gerar um tempo desnecessário de execução, por que você pode ter 20 testes que valida a partir deste ponto.

Então é hora de começar a usar helpers (fixtures/support), e criar classes ou funções que utilizam os serviços que você já usa no frontend (Redux, axios, fetch, tanstack, ou qualquer outra ferramenta), para deixar um ambiente pronto para começar a partir daquele ponto. Talvez você precise fazer umas 2 ou 3 request: Criar produto, Criar ordem já com o produto, data, cliente, e outra para trocar o estado da reserva. 

Agora você tem o que é necessário para iniciar o teste, e validar o que for necessário validar.

Existe formas mais fáceis, caso o backend fosse mais perto do frontend, como criar service container no github actions e criar usuários específicos para cada situação, mas nem sempre é assim. O backend vai ser em Java, C#, PHP, Ruby, então prefiro que os testes sejam sempre independente do Backend.

### Multiplos frontend web com testes integrados

Este deixei por ultimo, por que precisa entender os problemas anteriores.

Talvez seja necessário inativar um cliente, e todos produtos dele no marketplace não apareçam mais. Então é necessário navegar para outra página. Acredito que todas ferramentas populares, como Playwright, Cypress, Selenium atenda esse requisito, é basicamente alterar o endereço. Porém o bom uso do DRY, como eu disse anteriormente vai ajudar a não ter que perder fluxo que você já criou.

Se você já consegue achar um dono de produto, ou achar um produto pelo dono dele, nos testes do seu e-commerce / Marketplace, você pode reutilizar esses teste e esperar que eles falhem.


---------------------------

A gente se vê, até mais!
