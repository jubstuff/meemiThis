const request = require("request");
const pref = require("preferences-service");
const notifications = require("notifications");
const self = require("self");
//Meemi App Key
APP_KEY = "cf5557e9e1ed41683e1408aefaeeb4c6ee23096b";
/**
 * quote
 *
 * Sends a quote meme
 *
 * @param text Text content of the quote meme
 */
function quote(text) {
   if(text.length == 0) {
      throw("Text must not be empty");
   }
   var requestContent = {
      app_key: APP_KEY,
      meme_type: "quote",
      text_content : text
   };
   try {
      saveMeme(requestContent, "Quote meme posted");
   } catch (error) {
//      console.log("Eccezione catturata " + error);
      notifications.notify({
         title : "MeemiThis!",
         text : error,
         iconURL : self.data.url("img/favicon.png")
      });
   }
}
/**
 * image
 *
 * Sends an image meme
 *
 * @param imgsrc Image's URL
 */
function image(imgsrc) {
   var requestContent = {
      app_key: APP_KEY,
      meme_type : "image",
      img_url : imgsrc
   };
   try {
      saveMeme(requestContent, "Image meme posted!");
   } catch (error) {
//      console.log("Eccezione catturata " + error);
      notifications.notify({
         title : "MeemiThis!",
         text : error,
         iconURL : self.data.url("img/favicon.png")
      });
   }
}
/**
 * getCredentials
 *
 * Retrieves user id and password stored in preferences
 *
 * @return user array with userId and password
 * @throws exception - No username and password set
 */
function getCredentials() {
   if(!pref.isSet("meemi-user") && !pref.isSet("meemi-pwd")) {
      throw("You should set username and password before posting.");
   }
   var user = [];
   user["userId"] = pref.get("meemi-user");
   user["password"] = pref.get("meemi-pwd");
   return user;

}
/**
 * saveMeme
 *
 * Sends request to Meemi to post a meme
 *
 * @param requestContent request parameters, without userId and Password
 * @param okMessage      message to display on a successful request
 */
function saveMeme(requestContent, okMessage) {
   var user = getCredentials();
   requestContent.meemi_id = user["userId"];
   requestContent.pwd = user["password"];
   //fare la richiesta al server di meemi inviando i dati necessari
   var req = request.Request({
      url: "http://meemi.com/api3/p/save/json",
      content: requestContent,
      onComplete: function (response) {
//         var str = JSON.stringify(response.json);
//         console.log("Richiesta inviata: " + str);
         var msg = '';
         if(response.json.error){
//            console.log("C'è stato un errore");
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

//visible methods of this module
exports.quote = quote;
exports.image = image;
