  //localStorage.clear();

  var savedGMapLat=0;
  var savedGMapLong=0;
  var savedGMapZoom=0;
  var savedBMapLat=0;
  var savedBMapLong=0;
  var savedBMapZoom=0;

  var gmap;

  
  var initLat = 50.616578;
  var initLong = -1.932278;
  var initZoom = 12;

  var tagBMaps1=0;
  var tagBMaps2=0;
  var drawBMaps=0;

  var tagGMaps1=0;
  var tagGMaps2=0;
  var drawGMaps=0;


  var BMapLinePoint1X=0;
  var BMapLinePoint1Y=0;
  var BMapLinePoint2X=0;
  var BMapLinePoint2Y=0;


  var shapes = new Array();
  var shapeCoord = new Array();

  var annotations = new Array();


  var poly;
  var path;
  var polyOptions = {
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 3
  };
  var polyOptions2 = {
          strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 3,
    fillColor: 'FF0000',
    fillOpacity: 0.35        
  };        



  
  function initializeGoogle() {

    initializeVariables();

    // If Bing Map exist
    if(typeof localStorage.bmapZoom !== 'undefined') getGMap(savedBMapLat, savedBMapLong, savedBMapZoom);
    // If Bing Map not exist
    else getGMap(savedGMapLat, savedGMapLong, savedGMapZoom);
  }

  

  function initializeBing() {

    initializeButtons();

    initializeVariables();


    // If Google Map exist
    if(typeof localStorage.gmapZoom !== 'undefined') getBMap(savedGMapLat, savedGMapLong, savedGMapZoom);
    // If Google Map not exist
    else getBMap(savedBMapLat, savedBMapLong, savedBMapZoom);
  }


  


  function googleMapsEventListener(gmap) {
        
    var center_changed = google.maps.event.addListener(gmap, 'center_changed', function(e) {
      var centerCoord = gmap.getCenter();
      var zoom = gmap.getZoom();
      saveGMapToLocalStorage(centerCoord.lat(), centerCoord.lng(), zoom);
    });

    var zoom_changed = google.maps.event.addListener(gmap, 'zoom_changed', function(e) {
      var centerCoord = gmap.getCenter();
      var zoom = gmap.getZoom();
      saveGMapToLocalStorage(centerCoord.lat(), centerCoord.lng(), zoom);
    });

  }



  function bingMapsEventListener(bmap) {


    var viewchange = Microsoft.Maps.Events.addHandler(bmap, 'viewchange',
      function(e) {
        var centerCoord = bmap.getCenter();
        var zoom = bmap.getZoom();        
        saveBMapToLocalStorage(centerCoord.latitude, centerCoord.longitude, zoom);             
      });

     var click=Microsoft.Maps.Events.addHandler(bmap, 'click', 
      function(e){
        var point = new Microsoft.Maps.Point(e.getX(), e.getY());
        var loc = e.target.tryPixelToLocation(point);
        drawBMap(bmap,loc);  
       
      }); 
   

    
  }



  function drawBMap(bmap,clickLocation) {


if (drawBMaps===1) {

    if ((BMapLinePoint1X!==0)&&(BMapLinePoint1Y!==0)) {
      BMapLinePoint2X=clickLocation.latitude;
      BMapLinePoint2Y=clickLocation.longitude;
    }
    else {
     BMapLinePoint1X=clickLocation.latitude;
     BMapLinePoint1Y=clickLocation.longitude; 
    }

    if ((BMapLinePoint1X!==0)&&(BMapLinePoint1Y!==0)&&(BMapLinePoint2X!==0)&&(BMapLinePoint2Y!==0)){
      drawLineOnBMap(bmap, BMapLinePoint1X, BMapLinePoint1Y, BMapLinePoint2X, BMapLinePoint2Y);

      BMapLinePoint1X=BMapLinePoint2X;
      BMapLinePoint1Y=BMapLinePoint2Y;
      BMapLinePoint2X=0;
      BMapLinePoint2Y=0;
    }
  }



if ((tagBMaps1===1)||(tagBMaps2===1)) {

drawTagOnBMap(bmap,clickLocation);
 

}


  }

  function tagListenerOnGMap(){
      
            tagGMaps1 = 1;
  
    google.maps.event.addListener(gmap,'click', drawShapeOnGMap);
          
  }


  function lineListenerOnGMap(){

          poly = new google.maps.Polygon(polyOptions2);
          poly.setMap(gmap);          
          google.maps.event.addListener(gmap,'click', drawShapeOnGMap);
          tagGMaps1 = 0;

  }        

function drawAllAnnotationsOnBMap(bmap) {

//window.alert("hi1");


var lati = new Array();
var latiCount = 0;
var longi = new Array();
var longiCount = 0;

var string_annotationsLat="";
var string_annotationsLong="";


 if(typeof localStorage.annotationsLat !== 'undefined')
string_annotationsLat = localStorage.annotationsLat;

 if(typeof localStorage.annotationsLong !== 'undefined')
string_annotationsLong = localStorage.annotationsLong;

//window.alert("Lat:"+string_annotationsLat);
//window.alert("Longi:"+string_annotationsLong);


var string_annotation = "";
for (var counter=0; counter<string_annotationsLat.length; counter++) {

var currentCharLat =  string_annotationsLat.charAt(counter);


  if (currentCharLat!=='#')  {
     string_annotation += currentCharLat;
  }
  else {
   lati[latiCount] = parseFloat(string_annotation);
   latiCount++;
   string_annotation = "";
  }

 

}



string_annotation = "";
for (var counter=0; counter<string_annotationsLong.length; counter++) {

var currentCharLong =  string_annotationsLong.charAt(counter);

  if (currentCharLong!=='#')  {
     string_annotation += currentCharLong;
  }
  else {
   longi[longiCount] = parseFloat(string_annotation);
   longiCount++;
   string_annotation = "";
  }

}


 localStorage.annotationsLat = "";
 localStorage.annotationsLong = "";

  for (var counter=0; counter<longi.length; counter++) {
    drawTagOnBMap(bmap, new Microsoft.Maps.Location(lati[counter],longi[counter]));
  }


}



function drawAllAnnotationsOnGMap(gmap) {

var lati = new Array();
var latiCount = 0;
var longi = new Array();
var longiCount = 0;

var string_annotationsLat="";
var string_annotationsLong="";


 if(typeof localStorage.annotationsLat !== 'undefined')
string_annotationsLat = localStorage.annotationsLat;

 if(typeof localStorage.annotationsLong !== 'undefined')
string_annotationsLong = localStorage.annotationsLong;

//window.alert("Lat:"+string_annotationsLat);
//window.alert("Longi:"+string_annotationsLong);


var string_annotation = "";
for (var counter=0; counter<string_annotationsLat.length; counter++) {

var currentCharLat =  string_annotationsLat.charAt(counter);


  if (currentCharLat!=='#')  {
     string_annotation += currentCharLat;
  }
  else {
   lati[latiCount] = parseFloat(string_annotation);
   latiCount++;
   string_annotation = "";
  }

 

}



string_annotation = "";
for (var counter=0; counter<string_annotationsLong.length; counter++) {

var currentCharLong =  string_annotationsLong.charAt(counter);

  if (currentCharLong!=='#')  {
     string_annotation += currentCharLong;
  }
  else {
   longi[longiCount] = parseFloat(string_annotation);
   longiCount++;
   string_annotation = "";
  }

}


 localStorage.annotationsLat = "";
 localStorage.annotationsLong = "";

  for (var counter=0; counter<longi.length; counter++) {
    drawTagOnGMap(new google.maps.LatLng(lati[counter],longi[counter]));
  }



}






function addBTagsToAnnotations(latlng) {
   

 if(typeof localStorage.annotationsLat === 'undefined')
   localStorage.annotationsLat = String(latlng.latitude);
 else
   localStorage.annotationsLat += String(latlng.latitude);
 
   localStorage.annotationsLat += "#";

 if(typeof localStorage.annotationsLong === 'undefined')
   localStorage.annotationsLong = String(latlng.longitude);
 else
  localStorage.annotationsLong += String(latlng.longitude);
  
   localStorage.annotationsLong += "#";

}


function addGTagsToAnnotations(latlng) {
   

 if(typeof localStorage.annotationsLat === 'undefined')
   localStorage.annotationsLat = String(latlng.lat());
 else
   localStorage.annotationsLat += String(latlng.lat());
 
   localStorage.annotationsLat += "#";

 if(typeof localStorage.annotationsLong === 'undefined')
   localStorage.annotationsLong = String(latlng.lng());
 else
  localStorage.annotationsLong += String(latlng.lng());
  
   localStorage.annotationsLong += "#";

}


function drawTagOnGMap(latlng) {
   var marker = new google.maps.Marker({
           position: latlng,
           title:"Hello World!"
           });

           marker.setMap(gmap);
           addGTagsToAnnotations(latlng);
}

function drawShapeOnGMap(event){

        if (tagGMaps1===1) {
          drawTagOnGMap(event.latLng);
        }

        else {
          path = poly.getPath();
        //path is a MVCArray, we can just add new coordinate and it appears automatically
          path.push(event.latLng); 
        }                    

  }





  function drawTagOnBMap(bmap,clickLocation){
    var content="";
    if (tagBMaps1===1) content = "<div style='font-size:12px;font-weight:bold;border:solid 2px;background-color:LightBlue;width:50px;'>Custom Pushpin 1</div>";
    else if (tagBMaps2===1) content = "<div style='font-size:12px;font-weight:bold;border:solid 2px;background-color:LightBlue;width:50px;'>Custom Pushpin 2</div>"; 
        var pushpinOptions = {width: null, height: null, htmlContent: content}; 
        var pushpin= new Microsoft.Maps.Pushpin(clickLocation, pushpinOptions);
        bmap.entities.push(pushpin);

        addBTagsToAnnotations(clickLocation);
  }

  function drawLineOnBMap(bmap, x1, y1, x2, y2){
    var polyline = new Microsoft.Maps.Polyline([new Microsoft.Maps.Location(x1, y1), new Microsoft.Maps.Location(x2, y2)], null); 
    bmap.entities.push(polyline);
  }



  function getGMap(savedLat, savedLong, savedZoom) {     

    var mapOptions = {
      center: new google.maps.LatLng(savedLat,savedLong),
      zoom: savedZoom,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    gmap = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
    saveGMapToLocalStorage(savedLat, savedLong, savedZoom);
    googleMapsEventListener(gmap);
    drawAllAnnotationsOnGMap(gmap);
  } 



  function getBMap(savedLat, savedLong, savedZoom) {

    var mapOptions = {
      credentials: 'AveOyi7oVuY5IQ3tIs_9ow7f0MePq1XgB3hXC84OAJ9dCxZ3H9dcDq4VdkAJyIie',
      center: new Microsoft.Maps.Location(savedLat,savedLong),
      mapTypeId: Microsoft.Maps.MapTypeId.birdseye,
      zoom: savedZoom,
      labelOverlay: Microsoft.Maps.LabelOverlay.hidden 
    }
    var bmap = new Microsoft.Maps.Map(document.getElementById("bingMap"), mapOptions);
    saveBMapToLocalStorage(savedLat, savedLong, savedZoom);     
    bingMapsEventListener(bmap);
    drawAllAnnotationsOnBMap(bmap);
  }

  


  function saveBMapToLocalStorage(saveLat, saveLong, saveZoom) {
    localStorage.bmapLat = saveLat;
    localStorage.bmapLong = saveLong;
    localStorage.bmapZoom = saveZoom;
  }

  function saveGMapToLocalStorage(saveLat, saveLong, saveZoom) {
    localStorage.gmapLat = saveLat;
    localStorage.gmapLong = saveLong;
    localStorage.gmapZoom = saveZoom;
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

    }


  }

 function initializeButtons() {

   document.getElementById("clickToDraw").onclick = function () { 
      drawBMaps=1; 
      tagBMaps1=0; 
      tagBMaps2=0; 
      
      highLight("clickToDraw");
    };
    
    document.getElementById("clickToTag1").onclick = function () { 
      drawBMaps=0; 
      tagBMaps1=1; 
      tagBMaps2=0; 

      highLight("clickToTag1");
      
    };
    document.getElementById("clickToTag2").onclick = function () { 
      drawBMaps=0; 
      tagBMaps1=0; 
      tagBMaps2=1; 

      highLight("clickToTag2");
      };
 }

 function initializeVariables() {

   if(typeof localStorage.gmapZoom !== 'undefined'){
    savedGMapLat = parseFloat(localStorage.gmapLat);
    savedGMapLong = parseFloat(localStorage.gmapLong);
    savedGMapZoom = parseFloat(localStorage.gmapZoom);
   }
   else {
      savedGMapZoom = initZoom;
      savedGMapLong = initLong;
      savedGMapLat = initLat;
   }
      

   if(typeof localStorage.bmapZoom !== 'undefined'){
    savedBMapLat = parseFloat(localStorage.bmapLat);
    savedBMapLong = parseFloat(localStorage.bmapLong);
    savedBMapZoom = parseFloat(localStorage.bmapZoom);
   }
   else {
    savedBMapZoom = initZoom;
    savedBMapLong = initLong;
    savedBMapLat = initLat;
   }

 }



      