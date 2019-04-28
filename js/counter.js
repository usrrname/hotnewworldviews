var timerFont = "sans-serif";
var fontSize = "150";
var fontUnit = "%";
var normalBackColor = "palegreen";
var normalForeColor = "navy";

var warnBackColor = "yellow";
var warnForeColor = "navy";

var alarmBackColor = "red";
var alarmForeColor = "white";

var doneBlink = false;
var blinkSwapped = false;       

var timeLeft = 540;
var warnTime = 60;
var alarmTime = 20;

var roundTo = 1;
var warnRoundTo = 1;
var alarmRoundTo = 1;

var now = new Date().getTime();
var target = now + (timeLeft * 1000);

function SessionExpireEvent()
{   
alert("Session expired");
window.location.assign("http://linkedin.com");
}


function display()
{
    var now = new Date().getTime();
    var left = target - now;
    // Round to nearest second
    if (left % 1000 < 500){
    left = Math.floor(left / 1000);}
    else{
    left = Math.ceil(left / 1000);}
    if (left < 0){
       left = 0;}
    // Round up to multiple of n
    var round = roundTo;
    if (left <= alarmTime){
    round = alarmRoundTo;}
    else if (left <= warnTime){
    round = warnRoundTo;}
    var rounded = Math.floor((left + round - 1) / round) * round;
    var minutes = Math.floor(rounded / 60);
    var seconds = rounded % 60;
    var sec = seconds;
    if (seconds < 10){
   sec = "0" + seconds;}
   document.getElementById("countdown").innerHTML = minutes + ":" + sec;

    if (left <= 0  &&  doneBlink) blinkSwapped = !blinkSwapped;

    if (blinkSwapped)
    {
    document.getElementById("countdown").style.color = alarmForeColor;
    document.getElementById("countdown").style.backgroundColor = alarmBackColor;
    } else {
    document.getElementById("countdown").style.color = alarmBackColor;
    document.getElementById("countdown").style.backgroundColor = alarmForeColor;
    }

    if (left <= alarmTime){
       document.getElementById("countdown").style.color = alarmForeColor;
       document.getElementById("countdown").style.backgroundColor = alarmBackColor;
    } else if (left <= warnTime) {
       document.getElementById("countdown").style.color = warnForeColor
       document.getElementById("countdown").style.backgroundColor = warnBackColor
    } else {
      // nothing 
    }
}



function update() {
    display();
    var now = new Date().getTime();
    var left = target - now;
    
    if(left <= 0) { 
        location.assign("http://linkedin.com");
        // NO UPDATES AFTER THIS
    } else { 
        setTimeout("update()", 1000);
    }
}

//
// Set up a dictionary that has all our default variables
//

var dictionary = [];

window.onload = function(){

    dictionary['timerFont'] = timerFont;
    dictionary['fontSize'] = fontSize;
    dictionary['fontUnit'] = fontUnit;
    dictionary['normalBackColor'] = normalBackColor;
    dictionary['normalForeColor'] = normalForeColor;
    dictionary['warnBackColor'] = warnBackColor;
    dictionary['warnForeColor'] = warnForeColor;
    dictionary['alarmBackColor'] = alarmBackColor;
    dictionary['alarmForeColor'] = alarmForeColor;
    if (doneBlink){
        dictionary['doneBlink'] = "true";
    } else {
            dictionary['doneBlink'] = "false";
            dictionary['timeLeftMinutes'] = Math.floor(timeLeft / 60);
            dictionary['timeLeftSeconds'] = timeLeft % 60;
            dictionary['warnTime'] = warnTime;
            dictionary['alarmTime'] = alarmTime;
            dictionary['roundTo'] = roundTo;
            dictionary['warnRoundTo'] = warnRoundTo;
            dictionary['alarmRoundTo'] = alarmRoundTo;
    }
    
//
// Parse name/value pairs from the URL.
//
// First, strip off the leading '?'
var searchString = document.location.search;
searchString = searchString.substring(1);

var nvPairs = searchString.split("&");
// Now loop through the pairs, and extract what we want
for (i = 0; i < nvPairs.length; i++){
    var nvPair = nvPairs[i].split("=");
    var name = nvPair[0];
    var value = nvPair[1];
    dictionary[name] = value;
}

//
// Pick out all variable values that we allow to be controlled from
// the URL
//
timerFont = dictionary['timerFont'];
fontSize = dictionary['fontSize'];
fontUnit = dictionary['fontUnit'];

if (fontUnit == "pct"){
    fontUnit = "%";}
    normalBackColor = dictionary['normalBackColor'];
    normalForeColor = dictionary['normalForeColor'];
    warnBackColor = dictionary['warnBackColor'];
    warnForeColor = dictionary['warnForeColor'];
    alarmBackColor = dictionary['alarmBackColor'];
    alarmForeColor = dictionary['alarmForeColor'];

    if (dictionary['doneBlink'] == "true"){ 
        doneBlink = true;
        SessionExpireEvent();
    } else {
        doneBlink = false;
    }
timeLeft = +dictionary['timeLeftMinutes'] * 60 + (+dictionary['timeLeftSeconds']);
warnTime = +dictionary['warnTime'];
alarmTime = +dictionary['alarmTime'];
roundTo = +dictionary['roundTo'];
warnRoundTo = +dictionary['warnRoundTo'];
alarmRoundTo = +dictionary['alarmRoundTo'];

}

setTimeout("update()", 1000);



