var form = document.getElementById('preferences');
form.onsubmit = function(event) {
    var username = form.elements["username"];
    var password = form.elements["password"];
    console.log(username.value);
    console.log(password.value); 
};

self.on('message', function(){
    console.log("Panel started");  
    var form = document.getElementById('preferences');
    var username = form.elements["username"];
    var password = form.elements["password"];
    username.value = "username";
    password.value = "password";
});




