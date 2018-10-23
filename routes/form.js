var express = require('express');
var router = express.Router();
var raveCtrl = require('../controllers/controller');
var request = require('request');

/* GET users listing. */
router.get('/', function(req, res, next) {

    let b_list = '';

    var options = { method: 'GET', url: 'https://ravesandboxapi.flutterwave.com/banks?country=NG', headers: { 'content-type': 'application/json' } };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        var banks = JSON.parse(body);

        // var b_code;
        var bank_list = banks.data;
        for (var i = 0; i < bank_list.length; i++){
            b_code = bank_list[i].code;
            b_name = bank_list[i].name;

            b_list += '<option selected' + b_code +'>'+ b_name + '</option>';
            
            // b_list.push(b_name)
            // return b_list
            
            // console.log(b_code);
            // console.log(b_name);
            // console.log("banks in array", b_list)
        }


    });

    document.getElementById('bankName').innerHTML = b_list;

    // console.log("this is bank list", b_list)

    // var select_bank = ('#bankName');

    //  getJSON('data.JSON', function(data){
    //     select.html('');
    //     for(var i = 0; i <= data['data'].length; i++){
    //         $select.append('<option id="' + data['people'][i]['code'] + '">' + data['data'][i]['name'] + '</option>');
    //     }
    // })
 
    res.render('form', {title: 'Single Transfer', bank_name: b_list});


});

router.post('/', function(req, res, next) {

    var transferObj = {
        bankName: req.body.bankName,
        accountNumber: req.body.account_number,
        amount: req.body.amount,
        description: req.body.description
    }

    console.log(transferObj);
    return transferObj;


    var response = raveCtrl.TransferService(transferObj);
 
 
    res.render('form', {title: 'Single Transfer'});


});


module.exports = router;
