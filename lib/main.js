/**
 * MeemiThis!
 * Main file - Version 0.2
 */
//import required modules
const widgets = require("widget");
const contextMenu = require("context-menu");
const panel = require("panel");
const self = require("self");
const pref = require("preferences-service");
const notifications = require("notifications");
//~local modules
const meemiThis = require("meemi-this");
const encrypter = require("encrypter");


exports.main = function(options, callbacks) {

   //set up the preferences panel with username and password
   var preferences = panel.Panel({
      width : 500,
      heigth: 500,
      contentURL : self.data.url("preferences/preferences.html"),
      contentScriptWhen : 'ready',
      contentScriptFile : self.data.url("preferences/save-preferences.js"),
      onMessage: function(text) {
         if(text) {
            //text è la coppia "username:password" inviata dal pannello
            var credenziali = text.split(':');
            pref.set("meemi-user", credenziali[0]);
            pref.set("meemi-pwd", encrypter.sha256(credenziali[1]));
         }
         preferences.hide();
      },
      onShow : function() {
         this.postMessage('focus');
      }
   });
   //Widget in the status bar, to access preferences
   var meemiWidget = widgets.Widget({
      label : "MeemiThis! Preferences",
      contentURL : self.data.url("img/favicon.png"),
      onClick : function() {
         console.log("Widget clicked");
         preferences.show();
      }
   });
   //Contextual menu, text selected
   var meemiTextItem = contextMenu.Item({
      label : "Meemi this text!",
      context : contextMenu.SelectionContext(),
      contentScript: 'on("click", function (node, data) {' +
      'var text = window.getSelection().toString();' +
      'postMessage(text);' +
      '});',
      onMessage : function(text){
         meemiThis.quote(text);
      }
   });
   //Contextual menu, image selected
   var meemiImageItem = contextMenu.Item({
      label : "Meemi this image!",
      context : contextMenu.SelectorContext('img'),
      contentScript: 'on("click", function (node, data) {' +
      'postMessage(node.src)' +
      '});',
      onMessage : function(imgsrc) {
         meemiThis.image(imgsrc);
      }
   });
};//end exports.main
