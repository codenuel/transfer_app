var express = require('express');
var router = express.Router();
var request = require('request');
var raveCtrl = require('../controllers/controller');


/* GET home page. */
router.get('/', function(req, res, next) {

  var options = { method: 'GET', url: 'https://ravesandboxapi.flutterwave.com/banks?country=NG', headers: { 'content-type': 'application/json' } };

  var banks = false;
  request(options, function (error, response, body) {
      if (error) throw new Error(error);

      banks = JSON.parse(body);
      console.log(banks)
      res.render('index', { title: '', banks : banks.data });

  });  

  
});

router.post('/account-verify', function(req, res, next){

  var bankcode = req.body.recipient_account;
  let banktxt  = req.body.recipient_bank;

  var options = { method: 'POST', url: 'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/resolve_account', 
                  headers: { 'content-type': 'application/json' },  
                  data: { recipient_bank: bankcode, recipient_account: banktxt}
                };
  var banks = false;
  request(options, function (error, response, body) {
      if (error) throw new Error(error);

      // banks = JSON.parse(body);
      // console.log(banks)
      // res.render('index', { title: '', banks : banks.data });

  });  

})


module.exports = router;
