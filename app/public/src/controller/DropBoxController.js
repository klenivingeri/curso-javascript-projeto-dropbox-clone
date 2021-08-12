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
      // e.target.files recebe uma coleção com 1 ou mais itens
      this.updateTask(e.target.files)

      this.snackModalEl.style.display = 'block';
    })

  }

  /**
   *  updateTask(files)
   *  files: Recebe uma coleção do campo input-file com os itens selecionados
   */
  updateTask(files){
    let promises = [];
  
    [...files].forEach(file => {
      promises.push(new Promise((resolve, reject) =>{
        let ajax = new XMLHttpRequest();

        ajax.open('POST','/upload');
        ajax.onload = event => {
          try{
            resolve(JSON.parse(ajax.responseText))
          } catch(e){
            reject(e);
          }
        }
        ajax.onerror = event =>{
          reject(event)
        }

        let formData = new FormData();

        formData.append('input-file', file);

        ajax.send(formData);
      }));
    });
    return promises.all(promises);

  } // updateTask

}


 // 