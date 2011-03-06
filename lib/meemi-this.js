const request = require("request");
const pref = require("preferences-service");
const notifications = require("notifications");
const self = require("self");

function quote(text) {
   if(text.length == 0) {
      throw("Text must not be empty");
   }
    
   if(!pref.isSet("meemi-user") && !pref.isSet("meemi-pwd")) {
      throw("You should set username and password before posting.");
   }

   console.log(text);
   var userId = pref.get("meemi-user");
   var userPassword = pref.get("meemi-pwd");
    
   //fare la richiesta al server di meemi inviando i dati necessari
   var req = request.Request({
      url: "http://meemi.com/api3/p/save",
      content: {
         app_key: "cf5557e9e1ed41683e1408aefaeeb4c6ee23096b",
         meemi_id : userId,
         pwd : userPassword,
         meme_type: "quote",
         text_content : text
      },
      onComplete: function (response) {
         console.log("Richiesta inviata");
      }
   });
   req.post();
}

function image(imgsrc) {
   var requestContent = {
      app_key: "cf5557e9e1ed41683e1408aefaeeb4c6ee23096b",
      meme_type : "image",
      img_url : imgsrc
   }
   saveMeme(requestContent, "Image meme posted!");
}


function getCredentials() {
   if(!pref.isSet("meemi-user") && !pref.isSet("meemi-pwd")) {
      throw("You should set username and password before posting.");
   }
   var user = [];
   user["userId"] = pref.get("meemi-user");
   user["password"] = pref.get("meemi-pwd");
   return user;
}

function saveMeme(requestContent, okMessage) {

   var user = getCredentials();
   requestContent.meemi_id = user["userId"];
   requestContent.pwd = user["password"];
   //fare la richiesta al server di meemi inviando i dati necessari
   var req = request.Request({
      url: "http://meemi.com/api3/p/save/json",
      content: requestContent,
      onComplete: function (response) {
         var str = JSON.stringify(response.json);
         console.log("Richiesta inviata: " + str);
         var msg = '';
         if(response.json.error){
            console.log("C'è stato un errore");
            var error = response.json.error;
            switch(error.code){
               case 6:
                  msg = "Your username or password is not correct.";
                  break;
               default:
                  msg = "There was an error in your request.";
                  break;
            }
         } else {
            //meme postato
            msg = okMessage ? okMessage : "Meme posted!";
         }
         notifications.notify({
            title : "MeemiThis!",
            text : msg,
            iconURL : self.data.url("img/favicon.png")
         });
      }
   });
   req.post();
}



exports.quote = quote;
exports.image = image;
