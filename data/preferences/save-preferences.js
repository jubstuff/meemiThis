var form = document.getElementById('preferences');

self.on('message', function(){
    console.log("Panel started");  
    var form = document.getElementById('preferences');
    var username = form.elements["username"];
    var password = form.elements["password"];
    username.value = "username";
    password.value = "password";
    
    form.onsubmit = function(event) {
        var username = form.elements["username"];
        var password = form.elements["password"];
        var msg = username.value + ':' + password.value;
        postMessage(msg);
    };    
});




