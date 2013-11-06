exports.action = function(data, callback, config, SARAH){

config = config.modules.temperature;
  
  if (!config.id)
  {
    console.log("Missing Meteo config in prop file");
    callback({'tts' : 'configuration invalide'});
    return;
  }
  

  
  var url = 'http://api.openweathermap.org/data/2.5/weather?units=metric&lang=fr';
  url += "&id=" + (data.id || config.id);
   
	  
  var request = require('request');
  request({ 'uri' : url , json : true }, function (err, response, body){
    if (err || response.statusCode != 200) {
      callback({'tts': "L'action a échoué"});
      return;
    }
    var tts = parse(body);
    callback({'tts' : tts});
  });
          


var parse = function(body)
{
 
  var tempString = "";
	var tem = parseInt(body.main.temp);
  var heu = parseInt(body.dt);
  var coucher =parseInt(body.sys.sunset);
  var lever = parseInt(body.sys.sunrise);
  
      tempString = "La température actuelle est de " + tem + " degrés .";
  
  if (data.meteo == 'bilan') {
    var tts = tempString;
  tts += " Les conditions météo actuellement sont les suivantes : " + body.weather[0].description + " . ";
  tts += " La vitesse du vant est de " + parseInt(body.wind.speed / 1000 * 3600) + " km/h.";
  tts += " La couverture nuageuse est de  " + parseInt(body.clouds.all) + " %.";
  tts += " La quantité de pluie dans les trois heures est de " + parseInt(body.rain['3h']) + " millimètres .";
  }
  if (data.meteo == 'temp')
  {
    if (tem <= 5){
    var tts = tempString;
    tts += " il fait trés froid dehors !";
      if (heu >= coucher+10800){
      tts += "";
    }
      else if (heu >= coucher){
      tts += " tu devrais fermer les volets pour garder la chaleur !";
    }
    }
    else if (tem <= 10){
    var tts = tempString;
    tts += " il fait froid dehors !";
        if (heu >= coucher+10800){
      tts += "";
    }
      else if (heu >= coucher){
      tts += " tu devrais fermer les volets pour garder la chaleur !";
    }
    }
    else if (tem <= 15){
    var tts = tempString;
    tts += " il fait un peu froid dehors !";
    }
    else if (tem <= 20){
    var tts = tempString;
    tts += " il fait bon dehors !";
    }
    else if (tem <= 25){
    var tts = tempString;
    tts += " il fait chaud dehors !";
    }
    else if (tem <= 30){
    var tts = tempString;
    tts += " il fait trés chaud dehors !";
    }
    else if (tem <= 40){
    var tts = tempString;
    tts += " c'est la canicule. N'ouvre pas les volets pour garder un peu de fraicheur !";
    }
    
  }
    
    if (data.meteo == 'habillement')
  {
    if (tem <= 5){
    var tts = tempString;
    tts += " il fait trés froid dehors ! Tu devrais mettre tes sous vêtements chauds .";
      if (body.rain['3h'] >= 5){
      tts += " et prévoir un vêtement de pluie .";
    }
    }
    
    else if (tem <= 10){
    var tts = tempString;
    tts += " il fait froid dehors ! Tu devrais mettre tes sous vêtements chauds .";
      if (body.rain['3h'] >= 10){
      tts += " et prévoir un vêtement de pluie .";
    }
    }
    else if (tem <= 15){
    var tts = tempString;
    tts += " il fait un peu froid dehors ! Tu devrais mettre des vêtements chauds .";
      if (body.rain['3h'] >= 5){
      tts += " et prévoir un vêtement de pluie .";
    }
    }
    else if (tem <= 20){
    var tts = tempString;
    tts += " il fait bon dehors ! ";
      if (body.rain['3h'] >= 10){
      tts += " Tu peux mettre un ti cheurte manche longue mais prévoit un vêtement en cas de pluie .";
      } 
    }  
    else if (tem <= 25){
    var tts = tempString;
    tts += " il fait chaud dehors !";
      if (body.rain['3h'] >= 5){
      tts += " Tu peux mettre un ti cheurte mais prévoit un vêtement en cas de pluie .";
      } 
    }
    else if (tem <= 30){
    var tts = tempString;
    tts += " il fait trés chaud dehors !";
      if (body.rain['3h'] >= 5){
      tts += "  mais prévoit un vêtement en cas de pluie .";
      } 
    }
    else if (tem <= 40){
    var tts = tempString;
    tts += " c'est la canicule.";
      if (body.rain['3h'] >= 5){
      tts += "  mais prévoit un vêtement en cas de pluie .";
      } 
    }
 
  }
return tts;
  
}
}
