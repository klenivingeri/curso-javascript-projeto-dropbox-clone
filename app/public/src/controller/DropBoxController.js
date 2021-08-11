class DropBoxController{
  constructor(){
    
    this.btnSendFileEl = document.querySelector('#btn-send-file'); //1
    this.inputFilesEl = document.querySelector('#files'); //2
    this.snackModalEl = document.querySelector('#react-snackbar-root');//3 
    this.initEvents(); //4
  }

  initEvents() {
    this.btnSendFileEl.addEventListener('click', e => {
      this.inputFilesEl.click();
    })

    this.inputFilesEl.addEventListener('change', e => {
      console.log(e.target.files);

      this.snackModalEl.style.display = 'block';
    })

  }

}



/**
 *  1 - Pegando o elemento botão 
 *  2 - Pegando o elemento input
 *  3 - Iniciando a função
 */