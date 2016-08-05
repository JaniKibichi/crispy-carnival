'use strict';

var options        = require('../config/config');
var AfricasTalking = require('africastalking')(options.AT);
var db = require('./../models');

exports.voiceMenus = function(req, res) {
  var isActive  = req.body.isActive;
  var callerNumber = request.body.callerNumber
  var dtmfDigits = request.body.dtmfDigits
  var sessionId = request.body.sessionId

  if (isActive === '1') {

    console.log(req.body);

	 switch (dtmfDigits) {
	  case "0":
	    //Talk to Sales. Compose the response
	          var response  = '<?xml version="1.0" encoding="UTF-8"?>'
	          response += '<Response>'
	          response += '<Say>Please hold while we connect you to Sales.</Say>';
	          response += '<Dial sequential="false" phoneNumbers="+254787235065,880.welovenerds@ke.sip.africastalking.com" ringbackTone="http://62.12.117.25:8010/media/SautiFinaleMoney.mp3"/>'
	          response += '</Response>';

		  res.setHeader('Content-Type', 'text/plain');
		  res.send( response );
	    [break;]

	  case "1":
	     //talk to support
	          var response  = '<?xml version="1.0" encoding="UTF-8"?>'
	          response += '<Response>'
	          response += '<Say>Please hold while we connect you to Support.</Say>';
	          response += '<Dial phoneNumbers="+254787235065" ringbackTone="http://62.12.117.25:8010/media/SautiFinaleMoney.mp3"/>'
	          response += '</Response>';

		  res.setHeader('Content-Type', 'text/plain');
		  res.send( response )
	    [break;]

	  case "2":
	      //redirect to main IVR
	          var response  = '<?xml version="1.0" encoding="UTF-8"?>'
	          response += '<Response>'
	          response += '<Redirect>http://62.12.117.25:8010/voice</Redirect>'
	          response += '</Response>';

		  res.setHeader('Content-Type', 'text/plain');
		  res.send( response );
	    [break;]

	  default:
	     //talk to support
	          var response  = '<?xml version="1.0" encoding="UTF-8"?>'
	          response += '<Response>'
	          response += '<Say>Please hold while we connect you to Support.</Say>';
	          response += '<Dial phoneNumbers="+254787235065" ringbackTone="http://62.12.117.25:8010/media/SautiFinaleMoney.mp3"/>'
	          response += '</Response>';

		  res.setHeader('Content-Type', 'text/plain');
		  res.send( response )
	    [break;]
	  }


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
