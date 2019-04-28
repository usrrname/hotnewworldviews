
var items = [
"Rich", "Strong", "Precious", "Risk", "Limp", "White", "Entitled", "Care", "History", "Lucky", "Precious", "Pale"];

function randomize(){
    var randomItem = items[Math.floor(Math.random() * items.length)];
    return randomItem;
}

function rich(){ 
    var randomItem = randomize();
    document.getElementById("kimmo").value = randomItem;
    var i; 
    text = ""; 
    text += "" + randomItem;
    document.getElementById('kimmo').innerHTML = text;
          }
