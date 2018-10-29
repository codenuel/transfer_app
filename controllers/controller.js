var Ravepay = require('ravenodejs');

require('dotenv').config();


module.exports = {

    TransferService: function(data){

        var rave = new Ravepay(process.env.PUBLIC_KEY, process.env.SECRET_KEY, process.env.PRODUCTION_FLAG)

        rave.Card.charge(
            {
                "cardno": data.cardno,
                "cvv": data.cvv,
                "expirymonth": data.expirymonth,
                "expiryyear": data.expiryyear,
                "currency": data.currency,
                "country": data.country,
                "amount": data.amount,
                "pin": data.pin,
                "suggested_auth": data.suggested_auth,
                "email": data.email,
                "phonenumber": data.phonenumber,
                "firstname": data.firstname,
                "lastname": data.lastname,
                "IP": data.IP,
                "txRef": "MC-" + Date.now(),// your unique merchant reference
                "meta": [{metaname: "flightID", metavalue: "123949494DC"}],
                "redirect_url": "https://webhook.site/9ef5dbeb-eabc-4571-8644-5bd58c8d22d0",
                "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
              }
        ).then(resp => {
            console.log(resp.body);
         
            rave.Card.validate({
                "transaction_reference":resp.body.data.flwRef,
                "otp":12345
            }).then(response => {
                console.log(response.body.data.tx);
    
                return response;
        // transfer function here
                
            })
            
        }).catch(err => {

        return err;
        })

        rave.Transfer.initiate()
        
    }
}



