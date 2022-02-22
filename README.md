<p align="center">
  <img src="https://user-images.githubusercontent.com/6599252/154813112-d055ce6e-d896-44b2-b45b-b91e12ca36b7.svg" alt="Checkforce logo" width="350" height="180">
</p>

<h3 align="center">Checkforce.js</h3>
<br/>

<!-- [![BCH compliance](https://bettercodehub.com/edge/badge/dejaneves/checkforce.js)](https://bettercodehub.com)
[![Build Status](https://travis-ci.org/dejaneves/checkforce.js.svg?branch=master)](https://travis-ci.org/dejaneves/checkforce.js) -->

> Uma biblioteca para verificar a força da senha

A versão 3 do *checkforce.js*, vem com novidades. Ele depende de 2 bibliotecas externas, são elas: o [Popper](https://popper.js.org/) para renderizar a caixa do conteúdo, e o [Zxcvbn](https://github.com/dropbox/zxcvbn) para analisar a força da senha.

<p align="center">
  <img  src="https://user-images.githubusercontent.com/6599252/155199700-b14e751e-5248-48bd-ab33-5cf6397eed94.png">
</p>

## Bundle

Você tem a opção de usar o **checkforce** com todas as library incluídas, usando o arquivo `checkforce.bundle.js` ou `checkforce.bundle.min.js`. Ou você pode usar a versão standalone que está no arquivo `checkforce.js` ou `checkforce.min.js` e adicionar as dependências manualmente no seu arquivo HTML.

### Usando arquivo único

Incluindo um único arquivo com todas as dependências.

```html
  <script src="dist/checkforce.bundle.js" ></script>
```

versão minificada.

```html
  <script src="dist/checkforce.bundle.min.js" ></script>
```

Tanto o `checkforce.bundle.js` quanto o `checkforce.bundle.min.js` incluem o Popper e o Zxcvbn. 

### Usando arquivo separado

Usando a solução com scripts separados.

```html
  <script src="path/to/popper.min.js" ></script>
  
  <script src="path/to/zxcvbn.min.js" ></script>

  <script src="dist/checkforce.min.js" ></script>
```

## Arquivos JS

| Arquivo JS      | Popper | Zxcvbn
| ----------- | ----------- | ----------- |
| <span style="color: #d63384;">checkforce.bundle.js <br/> checkforce.bundle.min.js</span>      | Incluído       | Incluído
| <span style="color: #d63384;">checkforce.js <br/> checkforce.min.js</span>     | --       | --           


## Instalação

```sh
npm install checkforce.js --save
```

## Usando

```html
<body>
  <form>
    ...

    <label for="input-password">Senha</label>
    <input type="password" id="input-password" placeholder="Senha">
    
    ...

    <button type="submit">Criar</button>
  </form>

  <!-- Incluindo a biblioteca -->
  <script src="dist/checkforce.bundle.js"></script>
  <script>
    const checkForce = new CheckForce('#input-password');
  </script>

</body>
```

Por padrão a caixa de conteúdo que mostra o *nível/força* da senha aparece na parte *superior* do campo input.

![checkforce-top](https://user-images.githubusercontent.com/6599252/155201501-bb6cebf1-1e83-47ac-8ef2-6f39e5050872.png)

Você pode modificar a posição da caixa de conteúdo, da seguinte forma:

Para deixar a caixa na posição inferior: `bottom`.

```html
...

<script>
  const checkForce = new CheckForce('#input-password', {
    placement: 'bottom'
  });
</script>
```

![checkforce-bottom](https://user-images.githubusercontent.com/6599252/155201842-118cf077-8dce-42d7-9da2-3f425a2e6142.png)

Para deixar a caixa na posição lateral esquerdo: `left`.

```html
...

<script>
  const checkForce = new CheckForce('#input-password', {
    placement: 'left'
  });
</script>
```

![checkforce-left](https://user-images.githubusercontent.com/6599252/155205135-be64ba1d-2305-4ebe-8f26-f39ef4edee56.png)

Para deixar a caixa na posição lateral direito: `right`.


```html
...

<script>
  const checkForce = new CheckForce('#input-password', {
    placement: 'right'
  });
</script>
```

![checkforce-right](https://user-images.githubusercontent.com/6599252/155205524-1e50c328-6ad1-47f5-9321-a06344f59cfd.png)

Para deixar a caixa no modo responsivo. Ou seja para ela ajustar-se de acordo com o tamanho da tela, você pode usar o valor: `auto`.

![checkforce-auto](https://user-images.githubusercontent.com/6599252/155208790-cfecd856-f4e9-4488-a11c-8ac9420ac1f0.gif)



## Versioning
For transparency into our release cycle and in striving to maintain backward compatibility, CheckForce.js is maintained under the Semantic Versioning guidelines. Sometimes we screw up, but we'll adhere to these rules whenever possible.

For more information on SemVer, please visit <http://semver.org/>

## License
MIT
