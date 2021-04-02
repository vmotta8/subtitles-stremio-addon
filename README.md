# Subtitles Translator Stremio Addon

Extensão de legendas feita para o aplicativo de filmes [Stremio](https://www.stremio.com/) com o intuito de auxiliar o aprendizado de inglês assistindo filmes.

Foi utilizado o [stremio-addon-sdk](https://github.com/Stremio/stremio-addon-sdk) para o desenvolvimento dessa aplicação. Para quem quiser conhecer mais é só entrar no github do [Stremio](https://github.com/Stremio).

### :bookmark: Como funciona
Com a extensão instalada, é só abrir qualquer filme do **Stremio** e ir nas opções de legenda, lá terá uma opção chamada "Eng PtBr".

Na legenda haverá algumas palavras traduzidas para facilitar o entendimento de algumas frases. Por exemplo: "The blight(praga) came and we had to burn it."

Além dessa opção, também terá a opção da legenda apenas em inglês ou português, assim não há necessidade de instalar mais de uma extensão de legenda para utilizar o **Stremio**.

### :clapper: Exemplo
<img src="public/stremiophoto.png">

### :low_brightness: Como utilizar:
Por enquanto a extensão não está hospedada, mas é possível testá-la localmente.

```
% git clone https://github.com/vmotta8/subtitles-stremio-addon.git

% cd subtitles-stremio-addon

% yarn

% node addon.js
```
Após ter feito isso o programa estará rodando localmente e terá que instalar a extensão no **Stremio**.

Para instalar basta seguir os passos do [tutorial de instalação que há na documentação do sdk.](https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/testing.md#how-to-install-add-on-in-stremio) (É bem simples, só copiar a url do log e colar na busca de extensões do Stremio)

### :wrench: Mecanismo de funcionamento
  - Quando um filme é aberto o programa coleta o Id.
  - Com esse Id o programa busca legendas para o filme usando a api do [Opensubtitles](https://www.opensubtitles.org/).
  - O programa usa a legenda inglês coletada para gerar uma nova que será exibida com algumas palavras traduzidas.

### Autor
---

<a href="https://blog.rocketseat.com.br/author/thiago/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/60989975?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Vinicius Motta</b></sub></a> <a href="https://blog.rocketseat.com.br/author/thiago//" title="Rocketseat">🤘</a>

Feito por Vinicius Motta 👋 Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-Vinicius-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/vmotta8/)](https://www.linkedin.com/in/vmotta8/)
[![Gmail Badge](https://img.shields.io/badge/-viniciusmotta8@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:viniciusmotta8@gmail.com)](mailto:viniciusmotta8@gmail.com)
