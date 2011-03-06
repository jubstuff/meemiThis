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
        contentURL : self.data.url("preferences/preferences.html"),
        contentScriptWhen : 'ready',
        contentScriptFile : self.data.url("preferences/save-preferences.js"),
        onMessage: function(text) {
            if(text) {
                console.log(text);
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
    //menu contestuale con testo selezionato
    var meemiTextItem = contextMenu.Item({
        label : "Meemi this text!",
        context : contextMenu.SelectionContext(),
        contentScript: 'on("click", function (node, data) {' +
                'var text = window.getSelection().toString();' +
                'postMessage(text);' +
               '});',
        onMessage : function(text){
            try {
                meemiThis.quote(text);
                notifications.notify({
                    title : "MeemiThis!",
                    text : "Meme Posted",
                    iconURL : self.data.url("img/favicon.png")                    
                });
            } catch (error) {
                console.log(error);
                notifications.notify({
                    title : "MeemiThis!",
                    text : error,
                    iconURL : self.data.url("img/favicon.png")
                });
            }
        }
    });

    var meemiImageItem = contextMenu.Item({
        label : "Meemi this image!",
        context : contextMenu.SelectorContext('img'),
        contentScript: 'on("click", function (node, data) {' +
                'postMessage(node.src)' +
               '});',
        onMessage : function(imgsrc) {
           try {
                meemiThis.image(imgsrc);
            } catch (error) {
                console.log(error);
                notifications.notify({
                    title : "MeemiThis!",
                    text : error,
                    iconURL : self.data.url("img/favicon.png")
                });
            }
        }
    });
};//end exports.main
