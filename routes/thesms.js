'use strict';

//instantiate variables
var options = require('../config/config');
var Africastalking = require('africastalking')(options.AT)

var voice   = Africastalking.VOICE;
var sms = Africastalking.SMS;

var db = require('./../models');

var textMessage = "Thank you for contacting Biz Africa. ";
textMessage += "We will call you shortly. ";
textMessage += "Our customer care number is +254711082799.";

exports.wiredSMS = function(req, res) {
    var isReceived = req.body.from;

    if(typeof isReceived !== "undefined" && isReceived !== null){
     console.log(req.body);

 	//create a message alerting the user of the call center number
	var opts = { 'to': isReceived, 'message': textMessage };

    sms.send(opts)
    .then(function(s) { 
    	console.log(s); 
    })
    .catch(function (error) {
      console.log(error);
    });

	//Dial out to the user
    voice.call({
      'callFrom': '+254711082799',
      'callTo': isReceived
    })
    .then(function(s) {
      console.log(s);
    })
    .catch(function(error) {
      console.log(error);
    });

    }else{

    db.SMS.create({
      'from': req.body.from,
      'to': req.body.to,
      'text': req.body.text,
      'date': req.body.date,
      'smsid': req.body.linkId

    }).then(function(sms) {
      console.log('SMS data added', sms);
    });

    }

    //Alert the gateway that the POST is received.
    res.sendStatus(200);

};
