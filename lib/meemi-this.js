const request = require("request");
const pref = require("preferences-service");
const notifications = require("notifications");

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
         notifications.notify({
            title : "MeemiThis!",
            text : "Image Meme Posted",
            iconURL : self.data.url("img/favicon.png")
         });
      }
   });
   req.post();
}

function image(imgsrc) {
   if(!pref.isSet("meemi-user") && !pref.isSet("meemi-pwd")) {
      throw("You should set username and password before posting.");
   }

   var userId = pref.get("meemi-user");
   var userPassword = pref.get("meemi-pwd");

   //fare la richiesta al server di meemi inviando i dati necessari
   var req = request.Request({
      url: "http://meemi.com/api3/p/save/json",
      content: {
         app_key: "cf5557e9e1ed41683e1408aefaeeb4c6ee23096b",
         meemi_id : userId,
         pwd : userPassword,
         meme_type : "image",
         img_url : imgsrc
      },
      onComplete: function (response) {
         var str = JSON.stringify(response.json);
         console.log("Richiesta inviata: " + str);
      }
   });
   req.post();
}

exports.quote = quote;
exports.image = image;
