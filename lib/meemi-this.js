const encrypter = require("encrypter");
const request = require("request");

function quote(text) {
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

exports.quote = quote;
