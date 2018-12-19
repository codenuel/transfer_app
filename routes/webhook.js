// This example uses Express to receive webhooks
const app = require("express")();
const express = require('express');
const router = express.Router();
const request = require('request');

router.post('/hooks', function(req, res, next) {

    var options = { method: 'GET', url: '',
                    headers: { 'content-type': 'application/json' }
                  };
    
    /* It is a good idea to log all events received. Add code *
    * here to log the signature and body to db or file       */
  
  // retrieve the signature from the header
  var hash = req.headers["verif-hash"];
  
  if(!hash) {
  	// discard the request,only a post with rave signature header gets our attention 
  }
  
  // Get signature stored as env variable on your server
  const secret_hash = process.env.MY_HASH;
  
  // check if signatures match
  
  if(hash !== secret_hash) {
   // silently exit, or check that you are passing the write hash on your server.
  }
  
  // Retrieve the request's body
  var request_json = JSON.parse(request.body);

  // Give value to your customer but don't give any output
// Remember that this is a call from rave's servers and 
// Your customer is not seeing the response here at all

  response.send(200);
    
 
  });
