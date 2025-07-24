---
title: "Code Spliting com NextJS"
date: '2023-06-19T17:47:00-03:00'
slug: code-spliting-com-nextjs
tags:
- nextjs
- javascript
- react
- dynamic-import
- code-splitting
- import-dynamic
- import-dynamic-nextjs
draft: false
---

# O Problema em desenvolvimento

## O Problema 1

Em desenvolvimento, quando se importa um componente de um index (por exemplo no diretório `components/index2.ts`) com outras exportações, o webpack gera o bundle com todos os componentes exportados no index.

No nosso screens/Home_1.tsx, temos um exemplo, onde só está sendo usado o componente `Modal` e em development, o bundle gerado é o seguinte:

<img
  src="https://raw.githubusercontent.com/AlexcastroDev/dynamic-import-poc/main/.github//1.webp"
  width="800"
/>

O Dialog pesa 1mb, e o Modal uns 3kb, mas o bundle gerado tem 1.03mb, pois o webpack gera o bundle com todos os componentes exportados no index.

Imagina uma página com um Design System inteiro importado, vai ficar `super pesado e lento`.

## O Problema 2

Se você fizer o uso do Dialog, ao invés do Modal, no NextJS, o browser vai tentar renderizar os 1mb do Dialog via Server Side Render, e na hidratação, irá carregar de novo os 1mb do Dialog.

<img
  src="https://raw.githubusercontent.com/AlexcastroDev/dynamic-import-poc/main/.github//2.webp"
  width="800"
/>

# O Problema em produção

## Introdução

Em produção, quando se importa um componente de um index com outras exportações, o webpack gera o bundle apenas com o componente importado.

Porém o `Problema 2` do ambiente de desenvolvimento, continua em produção.

# A Solução do Problema 1

Este problema vai te atrapalhar mais em desenvolvimento, pois em produção, o webpack gera o bundle apenas com o componente importado.

Então, se você importar apenas o componente que você vai usar, o bundle gerado será apenas com o componente que você importou.

por exemplo, ao invés de importar:

```javacript
import { Modal } from '@/components'
```

Seria melhor importar:

```javacript
import { Modal } from '@/components/Modal'
```

Porém, se você está criando package local, ou alguma pasta global, onde você não quer ficar importando todos os componentes, você pode usar o import dynamic do NextJS, citado na solução do `Problema 2`.

ou você pode utilizar o React Lazy, que também vai resolver o problema.

O Resultado vai ser esse:

<img
  src="https://raw.githubusercontent.com/AlexcastroDev/dynamic-import-poc/main/.github//x2.webp"
  width="800"
/>

Repara também que o App foi carregado mais rápido e depois foi feito o carregamento do Dialog, que é o componente que foi importado.

<img
  src="https://raw.githubusercontent.com/AlexcastroDev/dynamic-import-poc/main/.github//x3.webp"
  width="800"
/>

# A Solução do Problema 2

Existe uma solução bem simples que resolve o problema 2, que é o uso do `dynamic import` do NextJS.

O dynamic import, faz com que o componente seja carregado apenas no client side, e não no server side.

Isso então vai evitar que o Dialog seja renderizado no server side, e na hidratação, o Dialog não será carregado de novo.

você pode encontrar a implementação no arquivo `screens/Home_1.tsx`

O Resultado vai ser esse:

<img
  src="https://raw.githubusercontent.com/AlexcastroDev/dynamic-import-poc/main/.github//x1.webp"
  width="800"
/>

# Fallback

O fallback é uma propriedade do dynamic import, que pode ser usada para renderizar um componente de loading enquanto o componente é carregado.

Já que o dynamic não usa mais o você pode usar a propriedade loading, e renderizar via server side render, um componente de `loading` ou um `skeleton`.

Exemplo:

```javacript
import dynamic from 'next/dynamic'

const Modal = dynamic(() => import('@/components/Dialog'), {
  loading: () => <div>Carregando...</div>
})
```

# Disclaimer

O `then` usado no dynamic em `screens/Home_1.tsx` é apenas por que:

1 - Todos imports de arquivos são assincronos
2 - O `@/components` exporta componentes individuais, ao invés de `export default { ... }`

Como está sendo usado:

```javacript
const Dialog = dynamic(() => import('@/components').then((components) => components.Dialog()), {
  ssr: false,
  loading: () => <div>loading...</div>
})
```

<img
  src="https://raw.githubusercontent.com/AlexcastroDev/dynamic-import-poc/main/.github//fallback.webp"
  width="800"
/>

Se por acaso você usar com `export default { ... }`

```javacript
export default {
    Modal: () => import('./Modal'),
    Dialog: () => import('./Dialog'),
}
```

Exemplo em `components/index3.ts`

Você pode usar o dynamic assim:

```javacript
const Dialog = dynamic(() => import('@/components').then((components) => components.default.Dialog()), {
  ssr: false,
  loading: () => <div>loading...</div>
})
```

---

Observação: Mudou de 1mb para 500kb por que? Após passar o minified code, o Dialog ficou com 500kb.

<img
  src="https://raw.githubusercontent.com/AlexcastroDev/dynamic-import-poc/main/.github//minified.webp"
  width="800"
/>

---

Por que? Todo export default é retornado como `default`, então você precisa acessar o default para acessar o componente.

Se você fizer um console, vai ver algo assim:

```javacript
{
    __esModule: true,
    default: {
        Modal: () => import('./Modal'),
        Dialog: () => import('./Dialog'),
    }
}
```

e caso você manter os `export const`, você terá:

```javacript
{
    __esModule: true,
    default: {
        Modal: () => import('./Modal'),
        Dialog: () => import('./Dialog'),
    },
    Modal: () => import('./Modal'),
    Dialog: () => import('./Dialog'),
}
```

# Conclusão

O problema 1, pode ser resolvido apenas importando o componente que você vai usar, ou usando o dynamic import.

O problema 2, pode ser resolvido apenas usando o dynamic import.

Sugiro também que veja uma solução melhor que vá ter menos problemas, que é o uso do babel-plugin-transform-imports, que vai fazer o uso do dynamic import automaticamente.

https://www.npmjs.com/package/babel-plugin-transform-imports

# Referências

https://nextjs.org/docs/advanced-features/dynamic-import

https://www.freecodecamp.org/news/code-splitting-in-react-loadable-components/

https://webpack.js.org/guides/code-splitting/

https://developer.mozilla.org/en-US/docs/Glossary/Code_splitting

https://nextjs.org/learn/foundations/how-nextjs-works/code-splitting

https://nextjs.org/learn/foundations/how-nextjs-works/client-and-server
