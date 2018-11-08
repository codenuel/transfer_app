var express = require('express');
var router = express.Router();
var request = require('request');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.post('/transfer', function(req, res, next) {
//   var reference = req.query.flwref;
//   var seckey  = "FLWSECK-6577e947f692e979e2d306ab4ce0a282-X";
//   var account_bank = req.query.bankcode;
//   var account_number = req.query.accountno;
//   var amount = req.query.amount;

//   console.log(reference)
//   // console.log(SECRET_KEY)
//   var options = { 
//                   method: 'POST', 
//                   url: 'https://ravesandboxapi.flutterwave.com/v2/gpx/transfers/create',
//                   form: { account_bank:account_bank, account_number:account_number, amount:amount, seckey:seckey, reference:reference },
//                   headers: { 'content-type': 'application/json' }
//                 };
//   request(options, function (error, response, body) {
//       if (error) throw new Error(error);

//       var resp = JSON.parse(body);
//       console.log(resp);

//       // res.status(200).json(respp);
//       res.render('success', {title: 'Your transfer to ' + account_number + ' was successful. Thank you for banking with us!'});

//   }); 
// });

// router.post('/transfer', function(req, res, next) {

//   // res.send(req.query.flwref); 

//   var reference = req.query.flwref;
//   // var seckey = process.env.SECRET_KEY;
//   var seckey  = "FLWSECK-6577e947f692e979e2d306ab4ce0a282-X";
//   var account_bank = req.query.bankcode;
//   var account_number = req.query.accountno;
//   var amount = req.query.amount;

  
//   var options = {
//     method: 'POST', 
//     url: 'https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/v2/verify',
//     form: { txref: reference, SECKEY: seckey},
//     headers: { 'content-type': 'application/json' }

//   };
  
//   request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   var respp = JSON.parse(body);
//   console.log(respp)
//   if(respp["data"]["status"] === "successful" && respp["data"]["chargecode"] === "00"){
//       var options = {
//         method: 'POST', 
//         url: 'https://ravesandboxapi.flutterwave.com/v2/gpx/transfers/create',
//         form: { account_bank:account_bank, account_number:account_number, amount:amount, seckey:seckey, reference:reference },
//         headers: { 'content-type': 'application/json' }

//       };
//     request(options, function (error, response, body) {
//     if (error) throw new Error(error);

//     var resp = JSON.parse(body);
//     console.log(resp);

//     // res.status(200).json(respp);
//     res.render('success', {title: 'Your transfer to ' + account_number + ' was successful. Thank you for banking with us!'});

//     }); 

//   }else{
//     res.render('err', {message: 'Your transfer was not successful. Try Again!'})
//   }

//   });

  
// });


module.exports = router;
