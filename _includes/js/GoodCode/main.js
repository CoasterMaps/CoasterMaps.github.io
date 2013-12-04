 var myLocalStorage = new LocalStorage();

var bingListen;  
var googleListen;

 
 var googleMap = new GoogleMap();
 var bingMap = new BingMap();



function initializeGoogle() {

 //window.alert("hi");
 //window.alert("isBMapExist"+myLocalStorage.isBMapExist());

    var gmap;

    var savedMapLat = myLocalStorage.getMapLat();
    var savedMapLong = myLocalStorage.getMapLong();
    var savedMapZoom = myLocalStorage.getMapZoom();
  
    gmap = googleMap.getMap(savedMapLat, savedMapLong, savedMapZoom);

    googleListen = new GoogleListeners(gmap);
    googleListen.initListeners();

    var drawOnGMap = new DrawOnGoogleMap();
    drawOnGMap.drawAllAnnotationsOnGMap(gmap);
}

  
function initializeBing() {

    initializeButtons();

    var bmap;

    var savedMapLat = myLocalStorage.getMapLat();
    var savedMapLong = myLocalStorage.getMapLong();
    var savedMapZoom = myLocalStorage.getMapZoom();

    bmap = bingMap.getMap(savedMapLat, savedMapLong, savedMapZoom);

    bingListen = new BingListeners(bmap);
    bingListen.initListeners();

    var drawOnBMap = new DrawOnBingMap();

    drawOnBMap.drawAllAnnotationsOnBMap(bmap);
}


 function initializeButtons() {

   document.getElementById("clickToDraw").onclick = function () { 

     bingListen.setLineListener();
     highLight("clickToDraw");
    };
    
    document.getElementById("clickToTag1").onclick = function () { 
      
     bingListen.setTagListener();
     highLight("clickToTag1");
      
    };
    document.getElementById("clickToTag2").onclick = function () { 
      
     bingListen.setTagListener();
     highLight("clickToTag2");
    };
 }

function highLight(highlightButton) {

    var buttons = new Array();
    buttons[0]="clickToDraw";
    buttons[1]="clickToTag1";
    buttons[2]="clickToTag2";

    for (var counter = 0; counter<buttons.length; counter++) {

       if (buttons[counter]===highlightButton) document.getElementById(highlightButton).style.background='#000000';
       else
      document.getElementById(buttons[counter]).style.background='#707070';

    }}



function tagListenerOnGMap() {

  googleListen.tagListener();
}


function lineListenerOnGMap(){

  googleListen.lineListener();
}        




  