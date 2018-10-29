var express = require('express');
var router = express.Router();
var request = require('request');
var raveCtrl = require('../controllers/controller');
require('dotenv').config();



/* GET home page. */
router.get('/', function(req, res, next) {

  var options = { method: 'GET', url: 'https://ravesandboxapi.flutterwave.com/banks?country=NG', 
                  headers: { 'content-type': 'application/json' } 
                };

  var banks = false;
  request(options, function (error, response, body) {
      if (error) throw new Error(error);

      banks = JSON.parse(body);
      // console.log(banks)
      res.render('index', { title: '', banks : banks.data });

  });  

  
});

router.post('/account-verify', function(req, res, next){

  var bankcode = req.body.recipient_account;
  var recipientacct  = req.body.recipient_bank;

  console.log(bankcode)
  console.log(recipientacct)

  var options = { method: 'POST', url: 'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/resolve_account',
                form: { 
                  destbankcode: bankcode, 
                  recipientaccount: recipientacct,
                  PBFPubKey: "FLWPUBK-a5715a67d24e61ce3e7bf79ae22ef524-X"
                },
                headers: { 'content-type': 'application/json' }

                  
                };
  request(options, function (error, response, body) {
      if (error) throw new Error(error);

      var respp = JSON.parse(body);
      console.log(respp);

      res.status(200).json(respp);

  });


});


router.get('/verify-tx', function(req, res, next){

  var reference = res.querry.ref;
  var SECRET_KEY  = "FLWSECK-6577e947f692e979e2d306ab4ce0a282-X";
  console.log(reference)

  var options = { method: 'POST', url: 'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/v2/verify',
                form: { 
                  txref: reference,
                  SECKEY: SECRET_KEY
                },
                headers: { 'content-type': 'application/json' }

                  
                };
  request(options, function (error, response, body) {
      if (error) throw new Error(error);

      var respp = JSON.parse(body);
      console.log(respp);

      res.status(200).json(respp);

  });
  

});


module.exports = router;
