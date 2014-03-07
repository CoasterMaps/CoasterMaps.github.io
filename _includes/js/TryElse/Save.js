function Save() {

  //localStorage.clear();

  

  this.saveAnnot = function(annotArray) {

    var newStringAnnotArray=[{"lat" : annotArray[0][1].lat().toString(), "lng" : annotArray[0][1].lng().toString()}] ;

    for(var i=1; i<annotArray.length; i++) {

      var stringLat = annotArray[i][1].lat().toString();
      var stringLng = annotArray[i][1].lng().toString();

      newStringAnnotArray = newStringAnnotArray.concat([{"lat": stringLat, "lng": stringLng}]);
    } 

    var finalArray = {"annot":newStringAnnotArray};

    var myJsonString = JSON.stringify(finalArray);

    localStorage.annot = myJsonString; 
        //window.alert(obj.annot.lat);
  }


 this.getAnnot = function() {

   if(typeof localStorage.annot !== 'undefined') {

      var myJsonString = localStorage.annot;

      this.obj = JSON.parse(myJsonString);

      var mapLayer = new MapLayer();
             

      for(var i=0; i<this.obj.annot.length; i++) {

       var curLatLng = new google.maps.LatLng(parseFloat(this.obj.annot[i].lat), parseFloat(this.obj.annot[i].lng));

       var actualpixelMouse = mapLayer.fromLatLngToPoint(curLatLng, globalMap); 
       var newLayerPixel = new google.maps.Point(actualpixelMouse.x, actualpixelMouse.y);

       toolTips.addToolTip(actualpixelMouse.x+60, actualpixelMouse.y);

       //var annotArray = toolTips.returnArray();

       overlay.uploadNextObject();
     }

   }
   
}




      this.saveLines = function(inputLinesArray) {

        //window.alert(inputLinesArray.length);
        
        var newLine=[];
        var lineGeoPoints=[];

        for(var i=0; i<inputLinesArray.length; i++) {

          var geoPointsArray = inputLinesArray[i].getGeoArray();
     
          for(var ii=0; ii<geoPointsArray.length; ii++) {

            var stringLat = geoPointsArray[ii].lat().toString();
            var stringLng = geoPointsArray[ii].lng().toString();

            lineGeoPoints = lineGeoPoints.concat( [{ "point" : {"lat" : stringLat, "lng" : stringLng } }] );
          }

          newLine = newLine.concat([ {"line": lineGeoPoints} ]);

     
          lineGeoPoints = [];
        }

        var finalArray = {"linesArray" : newLine};

        var myJsonString = JSON.stringify(finalArray);

        localStorage.linesArraySaved = myJsonString; 

     }
    // { "linesArray" : { "line" : { "point" : {"lat", "lng"}  }   } }




  this.getLines = function() {

     if(typeof localStorage.linesArraySaved !== 'undefined') {
   
    
    var myJsonString = localStorage.linesArraySaved;

    this.obj = JSON.parse(myJsonString);

    var mapLayer = new MapLayer();

     // loop through lines
     for (var i=0; i<this.obj.linesArray.length; i++) {

      var curLine = this.obj.linesArray[i].line;

      lines.newRedLine();

      // parse through points
      for (var ii=0; ii<curLine.length; ii++) {

        var curLat = parseFloat(curLine[ii].point.lat);
        var cutLng = parseFloat(curLine[ii].point.lng);

        var latLng = new google.maps.LatLng(curLat, cutLng);

        var curPoint = mapLayer.fromLatLngToPoint(latLng, globalMap); 

        lines.getLastLineContainer().addNewPoint(curPoint.x, curPoint.y);
        overlay.uploadLastLine(); 
      }

    }

  }

  }







 this.saveHandLines = function(inputLinesArray) {

        //window.alert(inputLinesArray.length);

        
        var newLine=[];
        var lineGeoPoints=[];

        for(var i=0; i<inputLinesArray.length; i++) {

          var geoPointsArray = inputLinesArray[i].getGeoArray();
     
          for(var ii=0; ii<geoPointsArray.length; ii++) {

            var stringLat = geoPointsArray[ii].lat().toString();
            var stringLng = geoPointsArray[ii].lng().toString();

            lineGeoPoints = lineGeoPoints.concat( [{ "point" : {"lat" : stringLat, "lng" : stringLng } }] );
          }

          newLine = newLine.concat([ {"line": lineGeoPoints} ]);

     
          lineGeoPoints = [];
        }

        var finalArray = {"linesArray" : newLine};

        var myJsonString = JSON.stringify(finalArray);

         //window.alert(myJsonString);

        localStorage.handLinesArraySaved = myJsonString; 

     }
    // { "linesArray" : { "line" : { "point" : {"lat", "lng"}  }   } }




  this.getHandLines = function() {

    //window.alert(localStorage.handLinesArraySaved);

    if(typeof localStorage.handLinesArraySaved !== 'undefined') {
      

    var myJsonString = localStorage.handLinesArraySaved;

    //window.alert(myJsonString);


    this.obj = JSON.parse(myJsonString);

    var mapLayer = new MapLayer();

     // loop through lines
     for (var i=0; i<this.obj.linesArray.length; i++) {

      var curLine = this.obj.linesArray[i].line;

      handLines.newRedLine();

      // parse through points
      for (var ii=0; ii<curLine.length; ii++) {

        var curLat = parseFloat(curLine[ii].point.lat);
        var cutLng = parseFloat(curLine[ii].point.lng);

        var latLng = new google.maps.LatLng(curLat, cutLng);

        var curPoint = mapLayer.fromLatLngToPoint(latLng, globalMap); 

        handLines.getLastLineContainer().addNewPoint(curPoint.x, curPoint.y);

        overlay.uploadLastLineHand(); 
        //uploadLastHandLine
      }
    }

  }
}


 


   


  


}