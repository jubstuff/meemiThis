const widgets = require("widget");
const tabs = require("tabs");
const contextMenu = require("context-menu");
const panel = require("panel");
const self = require("self");
const request = require("request");
const encrypter = require("encrypter");





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
        onMessage : function(text) {
            if(text.length == 0) {
                throw("Text must not be empty");
            }
            console.log(text);
            var userId = "JustB";
            var userPassword = "Mp0q1o9w2I";
            //fare la richiesta al server di meemi inviando i dati necessari
            var req = request.Request({
                url: "http://meemi.com/api3/p/save",
                content: {
                  app_key: "cf5557e9e1ed41683e1408aefaeeb4c6ee23096b",
                  meemi_id : userId,
                  pwd : encrypter.sha256(userPassword),
                  meme_type: "quote",
                  text_content : text
                },
                onComplete: function (response) {
                  console.log("Richiesta inviata");
                }
            });
            req.post();
        }
    });
    
    

};




console.log("The add-on is running.");
