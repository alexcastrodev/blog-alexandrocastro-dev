---
title: 'Typescript — IOC vs Dependency Injection'
excerpt: 'Quando você conhece o termo convention over configuration, você entende o que é produtividade.'
coverImage: 'https://github.com/AlexcastroDev/blog-alexandrocastro-dev/assets/10711649/a4f8f585-8374-45f9-af3b-211c931aeb20'
date: '2024-01-22T22:00:00.322Z'
author:
  name: Alexandro castro
  picture: 'https://github.com/alexcastrodev.png'
ogImage:
  url: 'https://github.com/AlexcastroDev/blog-alexandrocastro-dev/assets/10711649/a4f8f585-8374-45f9-af3b-211c931aeb20'
---

Como usar e pra que serve ?

Há pouco tentei procurar um conteúdo sobre isso, mas não encontrei, então vou disponibilizar o conteúdo em texto e vídeo.

Flecto Educa é uma iniciativa entre os desenvolvedores da Flecto (https://flecto.io), onde compartilhamos conhecimento internamente, e decidi deixar esse conteúdo publico.

Então que problema resolvemos com Injeção de dependência ?

No exemplo abaixo, vemos que o SentryService e TwillioService está acoplado ao UserService.

![image](https://github.com/AlexcastroDev/blog-alexandrocastro-dev/assets/10711649/95e854f5-f055-4631-90ef-dc5bc18a0547)

Se quisermos trocar toda a aplicação de Twillio para Sendgrid, ou para qualquer outro serviço, vai ser um baita problema.

Então deixamos isso a cargo da injeção de dependência, que faz parte do “L” do S.O.L.I.D.

L — Liskov Substitution Principle (Princípio da substituição de Liskov)

“Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it”

Então criamos interfaces que sastifaz as implementações que precisamos

![image](https://github.com/AlexcastroDev/blog-alexandrocastro-dev/assets/10711649/c728ae2a-4658-4942-b6b6-3830f9a0d4aa)

Ficou complexo ? vamos imagina que eu só precise de enviar um email para um cliente após cadastrar com sucesso.

Serviço1 ( um twillio, sendgrid, mailAlgumaCoisa ) implementa com NomeDaClasseS1.send()

Agora o Serviço2 implementa com NomeDaClasseS2.sendEmailTo()

Então você cria uma interface que tenha um “send”. Dentro do send, você escolhe se vai usar NomeDaClasseS1.send() ou NomeDaClasseS2.sendEmailTo().

O UserService pouco se importa quem ta realizando o funcionamento.

Alem disso, para fazer testes unitários, você não vai precisar de ter que depender que a classe de serviços de email e logger estejam funcionando junto. Só precisará fazer mock, e esperar que a função .send() seja chamada, respeitando o S do S.O.L.I.D.

Mas e o tal de IoC ?

![image](https://github.com/AlexcastroDev/blog-alexandrocastro-dev/assets/10711649/4b98eae2-dbba-4031-81f8-98254cfb2c76)

Quem vai se preocupar em registrar os serviços e resolver para enviar ao UserService é ele.

```javascript
IocContainer.register(EContainerKeys.mailerService, new MailerService());
IocContainer.register(EContainerKeys.loggerService, new LoggerService());

const userService = new UserService(
    IocContainer.resolve<IMailerService>(EContainerKeys.mailerService),
    IocContainer.resolve<ILoggerService>(EContainerKeys.loggerService),
);

userService.register('John Doe');
```

Teorias é ok, mas como já sabem…

![image](https://github.com/AlexcastroDev/blog-alexandrocastro-dev/assets/10711649/b581b8c3-b869-4e4b-95f9-fc2888318b47)


[![Typescript — IOC vs Dependency Injection](https://github.com/AlexcastroDev/blog-alexandrocastro-dev/assets/10711649/bb9e045d-fd92-4845-b243-96337d929267)](https://www.youtube.com/watch?v=sbv5M0tK_V0&t=137s "Typescript — IOC vs Dependency Injection")


# References

https://github.com/AlexcastroDev/advance-javascript/blob/main/ioc_di/index.ts