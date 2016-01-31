var SessionTime = 540000;
var Seconds = SessionTime/1000;
var tickDuration = 1000;

text = "Your session will expire in " + SessionTime/60000 + " minutes or " + Seconds + " seconds";

var myInterval = setInterval(function(){
    SessionTime = SessionTime - tickDuration;
$("label").text(text);
},1000);


function printTime(){
    document.getElementById("label").innerHTML = text;
}

var myTimeOut = setTimeout(SessionExpireEvent,SessionTime);


function SessionExpireEvent()
{ clearInterval(myInterval);
    
    alert("Session expired");
    window.location.assign("http://boingboing.net");
}

