var express = require('express');
var router = express.Router();
var formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', function(req, res, next){

  let form = new formidable.IncomingForm({
    uploadDir: './upload',
    keepExtensions: true // informa que precia da extensão do arquivo .
  });
// erro /campos  / arquivos
  form.parse(req, (err, fields, files)=>{

    res.json({
      files
    });
  })


})

module.exports = router;
