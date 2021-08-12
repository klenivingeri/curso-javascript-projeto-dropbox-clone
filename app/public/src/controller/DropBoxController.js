class DropBoxController{
  constructor(){
    
    this.btnSendFileEl = document.querySelector('#btn-send-file'); //1
    this.inputFilesEl = document.querySelector('#files'); //2
    this.snackModalEl = document.querySelector('#react-snackbar-root');//3 
    this.progressBarEl = this.snackModalEl.querySelector('.mc-progress-bar-fg')
    this.namefileEl = this.snackModalEl.querySelector('.filename')
    this.timeleftEl = this.snackModalEl.querySelector('.timeleft')
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
   * 
   */
  updateTask(files){
    let promises = [];
  
    [...files].forEach(file => {
      promises.push(new Promise((resolve, reject) =>{
        let ajax = new XMLHttpRequest();

        ajax.open('POST','/upload');
        ajax.onload = event => { // dados recuperados
          try{
            resolve(JSON.parse(ajax.responseText))
          } catch(e){
            reject(e);
          }
        }
        ajax.onerror = event =>{ // ocorrer algum erro com ajax
          reject(event)
        }

        ajax.upload.onprogress = event =>{ // executa toda vez que envia um novo pedaço do pacote
          this.uploadProgress(event, file);
        }

        let formData = new FormData();

        formData.append('input-file', file);

        this.startUploadTime = Date.now();

        ajax.send(formData);
      }));
    });
    return Promise.all(promises);

  } // updateTask

  uploadProgress(event, file ){
    //timespent armazena quanto temos já se passou depois do inicio do upload 
    let timespent = Date.now() - this.startUploadTime;

    let loaded = event.loaded; // Quantidade de dados que já foi enviada
    let total = event.total;// Tamanho total doa arquivo
    let porcent =  parseInt((loaded / total ) * 100);
    // timeleft recebe a quantidade de tempo que se estima apra final do upload
    let timeleft = ((100 - porcent) * timespent) / porcent;

    this.progressBarEl.style.width = `${porcent}%`
    this.namefileEl.innerHTML = file.name;
    this.timeleftEl.innerHTML = this.formatTimeToHuman(timeleft)
   
  } //uploadProgress

  formatTimeToHuman(duration){

    let seconds = parseInt((duration / 1000) % 60); //Pegando o resto da divisao em seconds ,  modulo
    let minutes = parseInt((duration / (1000 * 60)) % 60); //Pegando o resto da divisao em minutos ,  modulo
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24); //Pegando o resto da divisao em horas ,  modulo

    if(hours > 0 ){
      return `${hours} horas, ${minutes} minutos e ${seconds} segundos`;
    } else if(minutes > 0){
      return `${minutes} minutos e ${seconds} segundos`;
    } else {
      return `${seconds} segundos`;
    }
    return '';
  }

}


 // 