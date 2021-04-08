# Subtitles Translator Stremio Addon

Extensão de legendas feita para o aplicativo de filmes [Stremio](https://www.stremio.com/) com o intuito de auxiliar o aprendizado de inglês assistindo filmes.

Foi utilizado o [stremio-addon-sdk](https://github.com/Stremio/stremio-addon-sdk) para o desenvolvimento dessa aplicação. Para quem quiser conhecer mais é só entrar no github do [Stremio](https://github.com/Stremio).

Para gerar a legenda traduzida eu utilizei um microsserviço que criei: [translate-ms](https://github.com/vmotta8/translate-ms)

### :bookmark: Como funciona
Com a extensão instalada, é só abrir qualquer filme do **Stremio** e ir nas opções de legenda, lá terá uma opção chamada "Translated".

Na legenda haverá algumas palavras traduzidas para facilitar o entendimento de algumas frases. Por exemplo: "The blight(praga) came and we had to burn it."

Além dessa opção, também terá outros idiomas, assim não há necessidade de instalar mais de uma extensão de legenda para utilizar o **Stremio**.

### :clapper: Exemplo
<img src="public/stremiophoto.png">

### :low_brightness: Como utilizar
  - Acesse: https://subtitles-stremio-addon.herokuapp.com/
  - Instale a extensão
  - Aproveite!!


### :wrench: Mecanismo de funcionamento
  - Quando um filme é aberto o programa coleta o Id.
  - Com esse Id o programa busca legendas para o filme usando a api do [Opensubtitles](https://www.opensubtitles.org/).
  - A url da legenda em inglês é enviada pra o serviço de tradução e é gerada a legenda traduzida.

### Autor
---

<a href="https://blog.rocketseat.com.br/author/thiago/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/60989975?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Vinicius Motta</b></sub></a> <a href="https://blog.rocketseat.com.br/author/thiago//" title="Rocketseat">🤘</a>

Feito por Vinicius Motta 👋 Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-Vinicius-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/vmotta8/)](https://www.linkedin.com/in/vmotta8/)
[![Gmail Badge](https://img.shields.io/badge/-viniciusmotta8@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:viniciusmotta8@gmail.com)](mailto:viniciusmotta8@gmail.com)
