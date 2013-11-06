exports.action = function (data, callback, config, SARAH) {
  config = config.modules.maviequotidienne;
  
  //***************************** Réveil automatique **************************//
  if (data.mavie =='reveil'){
    
    									//***** Démarrage du module 4 : HOME CINEMA    
    
  var url = config.raspberry + '/action.php?engine='+config.idmodule4+'&code='+config.module4+'&state=on&action=CHANGE_STATE';
  var request = require('request');
    request({ 'uri' : url }, function (err, response, body){
    if (err || response.statusCode != 200) {
      callback({'tts': "L'action a échoué"});
 	console.log("Erreur "+response.statusCode);
      return;
    } 
          });
    
    										//**** Démarrage de la radio pour le réveil : idradioreveil
  var ura = config.sarah + '/sarah/xbmc?xbmc=music&action=radio&radioid='+config.idradioreveil;
  var request = require('request');
  request({ 'uri' : ura }, function (err, response, body){
    if (err || response.statusCode != 200) {
      callback({'tts': "L'action a échoué"});
 	console.log("Erreur "+response.statusCode);
      return;
    } 
          });
    
    										//***** Démarrage du module 5 : la cafetière
    
  var urt = config.raspberry + '/action.php?engine=id-29&code=3&state=on&action=CHANGE_STATE';
  var request = require('request');
  request({ 'uri' : urt }, function (err, response, body){
    if (err || response.statusCode != 200) {
      callback({'tts': "L'action a échoué"});
 	console.log("Erreur "+response.statusCode);
      return;
    } 
          }); 
    
    
  callback({'tts' : "Bonjour Vincent ! J'allume la caftière et je mets de la musique" });
  }
  
  
  
  
  
  
  
  
  
 //************************** Annonce départ au travail ******************************//
 if (data.mavie =='travail'){ 
     
 													//******** Arret de tous les modules par raspberry 
 var url = config.raspberry + '/action.php?engine=id-all&action=CHANGE_STATE&code=-1&state=off';
 var request = require('request');
  request({ 'uri' : url }, function (err, response, body){  
    if (err || response.statusCode != 200) {
      callback({'tts': "L'action a échoué"});
 	console.log("Erreur "+response.statusCode);
      return;
    }
              });
   
   												//******* Arret de la lecture en cours par RASPBMC    
  var ura = config.sarah + '/sarah/xbmc?xbmc=video&action=ExecuteAction&value=stop';
  console.log("Sending request to: " + ura);
  var request = require('request');
  request({ 'uri' : ura }, function (err, response, body){
   if (err || response.statusCode != 200) {
      callback({'tts': "L'action a échoué"});
 	console.log("Erreur "+response.statusCode);
      return;
    } 
              });
   
  											//******** Message d'annonce de départ au travail
 var urp = config.tts +'/tts='+config.nom+' , il est leure de partir, jetin tout !';
 var request = require('request');
   request({ 'uri' : urp }, function (err, response, body){
    if (err || response.statusCode != 200) {
      callback({'tts': "L'action a échoué"});
 	console.log("Erreur "+response.statusCode);
      return;
    } 
              });
   
  											//******* Temperature extérieur, recommendation tenue vestimentaire 
  var temperature = function(){
  var urm = config.sarah + '/sarah/temperature?meteo=habillement';
  console.log("Sending request to: " + ura);
  var request = require('request');
  request({ 'uri' : urm }, function (err, response, body){
  if (err || response.statusCode != 200) {
      callback({'tts': "L'action a échoué"});
 	console.log("Erreur "+response.statusCode);
      return;
    } else {
     console.log("Retour: "+response.body);
     }
  var tta = parse(body);
   callback({'tts': tta});
    
          });
 var parse = function(body)
{
  var tta = "";
     tta += body;
     console.log(tta);
return tta;  
  }
 }
     

												//******Google Traffic  pour se rendre au travail 
 var travail = function(){ 
 var urm = config.sarah + '/sarah/googletraffic?locomotion=car';
  console.log("Sending request to: " + ura);
 var request = require('request');
  request({ 'uri' : urm }, function (err, response, body){
 if (err || response.statusCode != 200) {
      callback({'tts': "L'action a échoué"});
  console.log("Erreur "+response.statusCode);
      return;
    } else {
      console.log("Retour: "+response.body);
    }
    var ttb = parse(body);
    callback({'tts': ttb});
          });
 var parse = function(body)
{
  var ttb = "";
     ttb += "Pour te rendre au travail, il te faudra "+body + ". A toute a leure . ";
     console.log(ttb);
return ttb;  
  }
 }; 
   
   										///***** Appel fonction temperature
setTimeout(function() {temperature('')},6000); 
   										///***** Appel fonction Google Traffic
setTimeout(function() {travail('')},10000); 
callback({});
 }

 
  
  
  
  
  
  
  
  
  
  //**********Au dodo, arret des modules, de xbmc et mise en veille du PC Sarah***********//
  
  if (data.mavie =='dodo'){ 
  													
    												//**** Arret de tous les modules  
  var url = config.raspberry + '/action.php?engine=id-all&action=CHANGE_STATE&code=-1&state=off';
 var request = require('request');
  request({ 'uri' : url }, function (err, response, body){  
    if (err || response.statusCode != 200) {
      callback({'tts': "L'action a échoué"});
 	console.log("Erreur "+response.statusCode);
      return;
    }
              });
    
    												//**** Arret de la lecture en cours RASPBMC
  var ura = config.sarah+'/sarah/xbmc?xbmc=video&action=ExecuteAction&value=stop';
  console.log("Sending request to: " + ura);
  var request = require('request');
  request({ 'uri' : ura }, function (err, response, body){
    if (err || response.statusCode != 200) {
      callback({'tts': "L'action a échoué"});
 	console.log("Erreur "+response.statusCode);
      return;
    } else {
        console.log("Retour: "+response.body);
    }
          });
    
  													//***** Mise en veille prolongé du PC Sarah
  var arret = function(){  SARAH.call('arret', {'_key':'arretOrdiImmediat'});};
setTimeout(function() {arret('')},6000); 
    
    											 //****** Message 
  callback({'tts' : "Trés bien. jétin tout,  et je vais aussi me coucher. A demain!" });
  }

  
  
  
  
  
  
  
  
  //************* Départ de la maison, arret des modules et de la lecture Raspbmc ********///
  
  if (data.mavie =='depart'){
    
    													//**** Arret de tous les modules  
  var url = config.raspberry+'action.php?engine=id-all&action=CHANGE_STATE&code=-1&state=off';
  console.log("Sending request to: " + url);
  var request = require('request');
  request({ 'uri' : url }, function (err, response, body){
  if (err || response.statusCode != 200) {
  callback({'tts': "L'action a échoué"});
 	console.log("Erreur "+response.statusCode);
      return;
    } else {
      console.log("Retour: "+response.body);
    }
          });
    
    													//*****Arret de la lecture en cours RASPBMC
    var ura = config.sarah+'/sarah/xbmc?xbmc=video&action=ExecuteAction&value=stop';
  console.log("Sending request to: " + ura);
  var request = require('request');
  request({ 'uri' : ura }, function (err, response, body){
    if (err || response.statusCode != 200) {
      callback({'tts': "L'action a échoué"});
 	console.log("Erreur "+response.statusCode);
      return;
    } else {
      console.log("Retour: "+response.body);
    }
          });
    
    										//***** Message
  callback({'tts' : "Trés bien. jétin tout,  et a toute a leure !" });
  }

  
  
  
  
  
  
  
  
  
  
  //******************** Je me lève, proposition éclairage, café, musique *********///
  
  if (data.mavie == 'debout') {
    
    											//***** Proposition d'allumage d'un module (eclairage par exemple ou rien)
    	var lum={"request":{}};
			lum.request.question="Bonjour "+config.nom1+" . Veux tu que j'allume "+config.nommodule1+" , "+config.nommodule2+" , "+config.nommodule3+" , ou "+config.nommoduletout+" ! ";
			lum.request.answer=[""+config.nommodule1,""+config.nommodule2,""+config.module2,""+config.moduletout];
			lum.request.answervalue=[config.raspberry+"/action.php?state=on&engine="+config.idmodule1+"&code="+config.module1+"&action=CHANGE_STATE",config.raspberry+"/action.php?state=on&engine="+config.idmodule2+"&code="+config.module2+"&action=CHANGE_STATE",config.raspberry+"/action.php?state=on&engine="+config.idmodule3+"&code="+config.module3+"&action=CHANGE_STATE",config.raspberry+"/action.php?state=off&engine="+config.idmodule1+"&code="+config.module1+"&action=CHANGE_STATE"];
			lum.request.answercallback=[true,true,true,true];
			lum.request.TTSanswer=[config.nommodule1+" est allumé . ",config.nommodule2+" est allumé . ",config.nommodule3+" est allumé .","Je n'allume rien !"];
			lum.request.no_answervalue=config.tts +"/?tts=Je parle tout seul en faite !";
			lum.request.recall=false;
			lum.request.timeout=23; 
			var urz= config.sarah + '/sarah/askme';
			var request = require('request');
			request({ 
				'uri': urz,
				'method': 'POST',
				'json': lum,
				'timeout': 5000,
				},
           function (err, response, body){
					if (err || response.statusCode != 200) {
						callback({'tts':'error'});
						return;
          }   
					});	
    
    
    													//******* Proposition d'allumage de la cafetière

			var json={"request":{}};
			json.request.question="Veux tu un café ! ";
			json.request.answer=["non merci","oui daccor"];
			json.request.answervalue=[config.raspberry+"/action.php?state=off&engine="+config.idmodule4+"&code="+config.module4+"&action=CHANGE_STATE",config.raspberry+"/action.php?state=on&engine="+config.idmodule4+"&code="+config.module4+"&action=CHANGE_STATE"];
			json.request.answercallback=[true,true];
			json.request.TTSanswer=["Trés bien ! ","La caftière chauffe !"];
			json.request.no_answervalue=config.tts+"/?tts=Je parle tout seul en faite !";
			json.request.recall=false;
			json.request.timeout=20; 
			var url= config.sarah+'/sarah/askme';
			var request = require('request');
			request({ 
				'uri': url,
				'method': 'POST',
				'json': json,
				'timeout': 5000,
				},
           function (err, response, body){
					if (err || response.statusCode != 200) {
						callback({'tts':'error'});
						return;
					}   
					});	
    
    
    														//***** Proposition d'allumage du Home cinéma
    var cine={"request":{}};
			cine.request.question="Veux tu écouter de la musique ! ";
			cine.request.answer=["oui daccord","non merci"];
			cine.request.answervalue=[config.raspberry+"/action.php?state=on&engine="+config.idmodule5+"&code="+config.module5+"&action=CHANGE_STATE",""];
			cine.request.answercallback=[true,true];
			cine.request.TTSanswer=["Le Home cinéma est allumé ","un peu de calme"];
			cine.request.no_answervalue=config.tts+"/?tts=Je parle tout seul en faite !";
			cine.request.recall=false;
			cine.request.timeout=20;
			var uri=config.sarah+'/sarah/askme';
    
			var request = require('request');
			request({ 
				'uri': uri,
				'method': 'POST',
				'json': cine,
				'timeout': 5000,
      },
    function (err, response, body){
					if (err || response.statusCode != 200) {
						callback({'tts':'error'});
						return;
					}
					});	
    
    
    														//***** Proposition de trois radio favorite pour RASPBMC
   
     var radio={"request":{}};
			radio.request.question="Veux tu écouter la radio "+config.radio1+" , "+config.radio2+" , "+config.radio3+" ! ";
			radio.request.answer=[""+config.radio1,""+config.radio2,""+config.radio3];
			radio.request.answervalue=[config.sarah+"/sarah/xbmc?xbmc=music&action=radio&radioid="+config.idradio1,config.sarah+"/sarah/xbmc?xbmc=music&action=radio&radioid="+config.idradio2,config.sarah+"/sarah/xbmc?xbmc=music&action=radio&radioid="+config.idradio3];
			radio.request.answercallback=[true,true,true];
			radio.request.TTSanswer=["c'est parti pour "+config.radio1,"C'est parti pour"+config.radio2, "C'est parti pour"+config.radio3];
			radio.request.no_answervalue=config.tts+"/?tts=Je parle tout seul en faite !";
			radio.request.recall=false;
			radio.request.timeout=20;
			var ura=config.sarah+'/sarah/askme';
    
			var request = require('request');
			request({ 
				'uri': ura,
				'method': 'POST',
				'json': radio,
				'timeout': 5000,
				}, function (err, response, body){
					if (err || response.statusCode != 200) {
						callback({'tts':'error'});
						return;
					}
					});	
    
  }
  
  
  
  
  
  //****************NOM1 est de retour, proposition de module eclairage, appels manqués**********////
  
  if (data.mavie == 'retour1') {
    
    													//***** Proposition d'allumage d'un module (eclairage par exemple ou rien)
    	var lum={"request":{}};
			lum.request.question="Bonjour "+config.nom1+" . Veux tu que j'allume "+config.nommodule1+" , "+config.nommodule2+" , "+config.nommodule3+" , ou "+config.nommoduletout+" ! ";
			lum.request.answer=[""+config.nommodule1,""+config.nommodule2,""+config.module2,""+config.moduletout];
			lum.request.answervalue=[config.raspberry+"/action.php?state=on&engine="+config.idmodule1+"&code="+config.module1+"&action=CHANGE_STATE",config.raspberry+"/action.php?state=on&engine="+config.idmodule2+"&code="+config.module2+"&action=CHANGE_STATE",config.raspberry+"/action.php?state=on&engine="+config.idmodule3+"&code="+config.module3+"&action=CHANGE_STATE",config.raspberry+"/action.php?state=off&engine="+config.idmodule1+"&code="+config.module1+"&action=CHANGE_STATE"];
			lum.request.answercallback=[true,true,true,true];
			lum.request.TTSanswer=[config.nommodule1+" est allumé . ",config.nommodule2+" est allumé . ",config.nommodule3+" est allumé .","Je n'allume rien !"];
			lum.request.no_answervalue=config.tts +"/?tts=Je parle tout seul en faite !";
			lum.request.recall=false;
			lum.request.timeout=23;  
			var urz=config.sarah +'/sarah/askme';
			var request = require('request');
			request({ 
				'uri': urz,
				'method': 'POST',
				'json': lum,
				'timeout': 5000,
   
				},
           function (err, response, body){
					if (err || response.statusCode != 200) {
						callback({'tts':'error'});
						return;
					}
					});	


    
    												//****** Nombre d'appels manqués FREEBOX
    var free={"request":{}};
			free.request.question="Veux tu connaitre les appels manqué de la journée . ";
			free.request.answer=["oui daccord","non merci"];
			free.request.answervalue=[config.sarah+"/sarah/freeboxOS?actionToDo=missingCall&periodMissCall=0",config.tts+"/?tts=."];
			free.request.answercallback=[true,true];
			free.request.TTSanswer=[" ","Trés bien, je te le dirais plus tard . "];
			free.request.no_answervalue=config.tts+"/?tts=Je parle tout seul en faite !";
			free.request.recall=false;
			free.request.timeout=20; 
			var urk=config.sarah+'/sarah/askme';
			var request = require('request');
			request({ 
				'uri': urk,
				'method': 'POST',
				'json': free,
				'timeout': 5000,
				},
           function (err, response, body){
					if (err || response.statusCode != 200) {
						callback({'tts':'error'});
						return;
          }
					});	
  }
  
  
  										//****NOM2 est de retour, proposition eclairage, appels manqués
  if (data.mavie == 'retour2') {
    
    
    	var lum={"request":{}};
			lum.request.question="Bonjour "+config.nom2+" . Veux tu que j'allume "+config.nommodule1+" , "+config.nommodule2+" , "+config.nommodule3+" , ou "+config.nommoduletout+" ! ";
			lum.request.answer=[""+config.nommodule1,""+config.nommodule2,""+config.module2,""+config.moduletout];
			lum.request.answervalue=[config.raspberry+"/action.php?state=on&engine="+config.idmodule1+"&code="+config.module1+"&action=CHANGE_STATE",config.raspberry+"/action.php?state=on&engine="+config.idmodule2+"&code="+config.module2+"&action=CHANGE_STATE",config.raspberry+"/action.php?state=on&engine="+config.idmodule3+"&code="+config.module3+"&action=CHANGE_STATE",config.raspberry+"/action.php?state=off&engine="+config.idmodule1+"&code="+config.module1+"&action=CHANGE_STATE"];
			lum.request.answercallback=[true,true,true,true];
			lum.request.TTSanswer=[config.nommodule1+" est allumé . ",config.nommodule2+" est allumé . ",config.nommodule3+" est allumé .","Je n'allume rien !"];
			lum.request.no_answervalue=config.tts+"/?tts=Je parle tout seul en faite !";
			lum.request.recall=false;
			lum.request.timeout=23;  
			var urz=config.sarah + '/sarah/askme';
			var request = require('request');
			request({ 
				'uri': urz,
				'method': 'POST',
				'json': lum,
				'timeout': 5000,
				},
           function (err, response, body){
					if (err || response.statusCode != 200) {
						callback({'tts':'error'});
						return;
					}
					});	

  																//****** Nombre d'appels manqués FREEBOX
    var free={"request":{}};
			free.request.question="Veux tu connaitre les appels manqué de la journée . ";
			free.request.answer=["oui daccord","non merci"];
			free.request.answervalue=[config.sarah+"/sarah/freeboxOS?actionToDo=missingCall&periodMissCall=0",config.tts+"/?tts=."];
			free.request.answercallback=[true,true];
			free.request.TTSanswer=[" ","Trés bien, je te le dirais plus tard . "];
			free.request.no_answervalue=config.tts+"/?tts=Je parle tout seul en faite !";
			free.request.recall=false;
			free.request.timeout=20; 
			var urk=config.sarah + '/sarah/askme';
			var request = require('request');
			request({ 
				'uri': urk,
				'method': 'POST',
				'json': free,
				'timeout': 5000,
				},
           function (err, response, body){
					if (err || response.statusCode != 200) {
						callback({'tts':'error'});
						return;
          }
					});
  }
		callback({});
		return;
	}
