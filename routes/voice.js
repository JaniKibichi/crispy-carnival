'use strict';

var options        = require('../config/config');
var AfricasTalking = require('africastalking')(options.AT);
var db = require('./../models');

exports.voice = function(req, res) {
  var isActive  = req.body.isActive;

  if (isActive === '1') {

    console.log(req.body);

      var response += '<Response>';
      response += '<GetDigits timeout="30" finishOnKey="#" callbackUrl="http://62.12.117.25:8010/voiceMenus">';
      response += '<Say>Thank you for calling Biz Africa. Press 0 followed by the hash sign to talk to sales, 1 followed by the hash sign to talk to support or 2 followed by the hash sign to hear this message again.</Say>';
      response += '</GetDigits>';
      response += '<Say>Thank you for calling. Good bye!</Say>';
      response += '</Response>';

	  res.setHeader('Content-Type', 'text/plain');
	  res.send( response );
  } else {

    db.Voice.create({
      'durationInSeconds': req.body.durationInSeconds,
      'direction': req.body.direction,
      'amount': req.body.amount,
      'callerNumber': req.body.callerNumber,
      'destinationNumber': req.body.destinationNumber,
      'sessionId': req.body.sessionId,
      'callStartTime': req.body.callStartTime,
      'isActive': req.body.isActive,
      'currencyCode': req.body.currencyCode,
      'status': req.body.status

    }).then(function(voice) {
      console.log('client added', voice);
    });

  }
};
