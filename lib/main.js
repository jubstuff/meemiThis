const widgets = require("widget");
const tabs = require("tabs");
const contextMenu = require("context-menu");
const panel = require("panel");
const self = require("self");
const pref = require("preferences-service");
const meemiThis = require("meemi-this");
const encrypter = require("encrypter");

exports.main = function(options, callbacks) {
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

    var meemiWidget = widgets.Widget({
        label : "MeemiThis! Preferences",
        contentURL : self.data.url("img/favicon.png"),
        onClick : function() {
            console.log("Widget clicked");
            preferences.show();
        }
    });

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
};//end exports.main
