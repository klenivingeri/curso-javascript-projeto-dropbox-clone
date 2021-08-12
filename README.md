# Projeto DropBox Clone

[![Hcode Treinamentos](https://www.hcode.com.br/res/img/hcode-200x100.png)](https://www.hcode.com.br)

Projeto desenvolvido como exemplo do Curso Completo de JavaScript na Udemy.com.

### Projeto
![DropBox Clone](https://firebasestorage.googleapis.com/v0/b/hcode-com-br.appspot.com/o/DropBoxClone.jpg?alt=media&token=d59cad0c-440d-4516-88f2-da904b9bb443)

## Iniciando projeto

- `npm install bower -g` instalar o pacote na maquina.
- `bower install` Baixar as dependencias do projeto.
- `npm install express-generator` instalar o pacote na maquina.
- `express --ejs app` Criando arquitetura do projeto.
- `npm install` dentro da pasta app baixar as dependencias do express.
- `npm start` dentro da pasta do app

Dentro da pasta public criei src/index.js e dentro da pasta /src criei uma outra pasta /controller/DropBoxController.js
~~~Javascript
// public/src/controller/DropBoxController.js
class DropBoxController{
  constructor(){
    
  }
}
~~~ 
~~~Javascript
// public/src/index.js
window.app = new DropBoxController();
//Estanciando dessa forma, toda as vezes que utilizarmos a palavra app, vamos ter acesso ao nosso object
~~~ 

#### Colocando evento no botão
~~~Javascript
// public/src/controller/DropBoxController.js
class DropBoxController{
  constructor(){
    
    this.btnSendFileEl = document.querySelector('#btn-send-file'); //1
    this.inputFilesEl = document.querySelector('#files'); //2
    this.snackModalEl = document.querySelector('#react-snackbar-root');//3 
    this.initEvents(); //4
  }

  initEvents() {
    this.btnSendFileEl.addEventListener('click', e => { //1.1
      this.inputFilesEl.click(); //2.1
    })

    this.inputFilesEl.addEventListener('change', e => { //2.2
      console.log(e.target.files);
      this.snackModalEl.style.display = 'block'; //3.1
    })

  }

}

/**
 *  1 - Pegando o elemento html botão
 *  1.1 - Adiciona um evento de click no elemento
 * 
 *  2 - Pegando o elemento html input
 *  2.1 - Força um evento de click no input
 *  2.2 - Adiciona um evento de change, toda vez que o valor mudar
 * 
 *  3 - Pegando o elemento de progress do arquivo
 *  3.1 - Altera a propriedade do css para block
 * 
 *  4 - Inicia a função ao carregar o arquivo
 */

~~~ 
~~~Javascript
~~~ 


## Dicas 

~~~HTML
<!-- Informar para o input que ele vai receber multiplos arquivos -->
<input type="file" id="files" style="display:none;" multiple>
~~~
