const widgets = require("widget");
const tabs = require("tabs");
const contextMenu = require("context-menu");
const panel = require("panel");
const self = require("self");
const request = require("request");
const meemiThis = require("meemi-this");


exports.main = function(options, callbacks) {
//    var p = panel.Panel({
//        contentURL : self.data.url("form.html")
//    });

//    var meemiPageItem = contextMenu.Item({
//        label : "Meemi this Page!",
//        contentScript: 'on("click", function (node, data) {' +
//                'postMessage("meemi Page clicked");' +
//               '});',
//        onMessage : function(text) {
//            console.log(text);
//        }
//    });
//    
//    var meemiImgItem = contextMenu.Item({
//        label : "Meemi this image!",
//        context : contextMenu.SelectorContext("img"),
//        contentScript: 'on("click", function (node, data) {' +
//        'postMessage("meemi image clicked");' +
//       '});',
//        onMessage : function(text) {
//            console.log(text);
//        }
//    });
//    var widget = widgets.Widget({
//      label: "Mozilla website",
//      contentURL: "http://www.mozilla.org/favicon.ico",
//      onClick: function() {
//            p.show();
//      }
//    });
    var meemiTextItem = contextMenu.Item({
        label : "Meemi this text!",
        context : contextMenu.SelectionContext(),
        contentScript: 'on("click", function (node, data) {' +
                'var text = window.getSelection().toString();' +
                'postMessage(text);' +
               '});',
        onMessage : meemiThis.quote(text)
    }); 
};//end exports.main




console.log("The add-on is running.");
