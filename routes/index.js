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

  // var bankcode = req.body.recipient_account;
  // var recipientacct  = req.body.recipient_bank;

  // console.log(bankcode)
  // console.log(recipientacct)
  req.body.PBFPubKey = process.env.PUBLIC_KEY

  var options = { method: 'POST', 
                // url: 'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/resolve_account',
                url: 'https://ravesandbox.azurewebsites.net/flwv3-pug/getpaidx/api/resolve_account',
                form: req.body,
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

  var reference = res.query.ref;
  var SECRET_KEY  = process.env.PUBLIC_KEY;
  
  console.log(reference);
  console.log(SECRET_KEY);

  var options = { 
                  method: 'POST', 
                  url: 'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/v2/verify',
                  form: { txref: reference, SECKEY: SECRET_KEY},
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
