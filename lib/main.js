const widgets = require("widget");
const tabs = require("tabs");
const contextMenu = require("context-menu");
const panel = require("panel");
const self = require("self");

const meemiThis = require("meemi-this");


exports.main = function(options, callbacks) {

    var preferences = panel.Panel({
        contentURL : self.data.url("preferences/preferences.html")
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
