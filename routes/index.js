var express = require('express');
var router = express.Router();
var request = require('request');
var raveCtrl = require('../controllers/controller');
var dotenv = require('dotenv').config();


/* GET home page. */
router.get('/', function(req, res, next) {

/* List banks in select dropdown */
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


// Account resolve
router.post('/account-verify', function(req, res, next){
  req.body.PBFPubKey = process.env.PUBLIC_KEY
  var options = { method: 'POST', 
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


//Verify transaction
router.get('/verify-tx', function(req, res, next){

  var reference = res.query.ref;
  var SECRET_KEY  = process.env.SECRET_KEY;
  console.log(reference)
  console.log(SECRET_KEY)

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


//Transfer
router.post('/transfer', function(req, res, next) {
  var reference = req.query.flwref;
  var seckey = process.env.SECRET_KEY;
  var account_bank = req.query.bankcode;
  var account_number = req.query.accountno;
  var amount = req.query.amount;

  console.log(reference);
  var options = { 
                  method: 'POST', 
                  url: 'https://ravesandboxapi.flutterwave.com/v2/gpx/transfers/create',
                  form: { account_bank:account_bank, account_number:account_number, amount:amount, seckey:seckey, reference:reference },
                  headers: { 'content-type': 'application/json' }
                };
  request(options, function (error, response, body) {
      if (error) throw new Error(error);

      var resp = JSON.parse(body);
      console.log(resp);

      // res.status(200).json(respp);
      res.render('success', {title: 'Your transfer to ' + account_number + ' was successful. Thank you for using Rave!'});

  }); 
});

module.exports = router;
