  var annotGlobalString;
  var lineGlobalString;
  var handLinesGlobalString;


  function Save() {



    this.saveAnnot = function(annotArray) {

      var newStringAnnotArray=[{"lat" : annotArray[0][1].lat().toString(), "lng" : annotArray[0][1].lng().toString()}] ;

      for(var i=1; i<annotArray.length; i++) {

        var stringLat = annotArray[i][1].lat().toString();
        var stringLng = annotArray[i][1].lng().toString();

        newStringAnnotArray = newStringAnnotArray.concat([{"lat": stringLat, "lng": stringLng}]);
      } 

      var finalArray = {"annot":newStringAnnotArray};

      var myJsonString = JSON.stringify(finalArray);

      annotGlobalString = myJsonString;
    }


    this.getAnnot = function(inputAnnot) {

     if(inputAnnot !== 'undefined') {

      var myJsonString = inputAnnot;//localStorage.annot;

      this.obj = JSON.parse(myJsonString);

      if(typeof this.obj.annot !== 'undefined') {
      
      for(var i=0; i<this.obj.annot.length; i++) {

       var curLatLng = new google.maps.LatLng(this.obj.annot[i].lat, this.obj.annot[i].lng);
       // parseFloat( parseFloat(

       var actualpixelMouse = mapLayer.fromLatLngToPoint(curLatLng, globalMap); 
       var newLayerPixel = new google.maps.Point(actualpixelMouse.x + mapLayerState.getDiffX(), 
                                                  actualpixelMouse.y + mapLayerState.getDiffY());

       toolTips.addToolTip(newLayerPixel.x+60, newLayerPixel.y); //+60,

       overlay.uploadNextObject();
     }

   }

   }
   
  }




  this.saveLines = function(inputLinesArray) {


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

    //localStorage.linesArraySaved = myJsonString; 
    lineGlobalString = myJsonString;

  }
      // { "linesArray" : { "line" : { "point" : {"lat", "lng"}  }   } }




      this.getLines = function(inputLines) {

       if(inputLines !== 'undefined') {


        var myJsonString = inputLines;//localStorage.linesArraySaved;

        this.obj = JSON.parse(myJsonString);


        if(typeof this.obj.linesArray !== 'undefined') {

       // loop through lines
       for (var i=0; i<this.obj.linesArray.length; i++) {

        var curLine = this.obj.linesArray[i].line;

        lines.newRedLine();

        // parse through points
        for (var ii=0; ii<curLine.length; ii++) {

          var curLat = curLine[ii].point.lat; //parseFloat()
          var cutLng = curLine[ii].point.lng; // parseFloat()

          var latLng = new google.maps.LatLng(curLat, cutLng);

          var curPoint = mapLayer.fromLatLngToPoint(latLng, globalMap); 

          lines.getLastLineContainer().addNewPoint(curPoint.x, curPoint.y);
          overlay.uploadLastLine(); 
        }

      }

    }

  }

  }



  this.saveHandLines = function(inputLinesArray) {


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

           //localStorage.handLinesArraySaved = myJsonString; 
           handLinesGlobalString = myJsonString;

    }
      // { "linesArray" : { "line" : { "point" : {"lat", "lng"}  }   } }




      this.getHandLines = function(inputHandLines) {

       // window.alert(inputHandLines);

        if(inputHandLines !== 'undefined') {

         // window.alert(inputHandLines);

          var myJsonString = inputHandLines; //localStorage.handLinesArraySaved;

          //window.alert(myJsonString);
          
          this.obj = JSON.parse(myJsonString);

         if(typeof this.obj.linesArray !== 'undefined') {
          
       // loop through lines
       for (var i=0; i<this.obj.linesArray.length; i++) {

        var curLine = this.obj.linesArray[i].line;

        handLines.newRedLine();

        // parse through points
        for (var ii=0; ii<curLine.length; ii++) {

          var curLat = curLine[ii].point.lat; // parseFloat()
          var cutLng = curLine[ii].point.lng; // parseFloat()

          var latLng = new google.maps.LatLng(curLat, cutLng);

          var curPoint = mapLayer.fromLatLngToPoint(latLng, globalMap); 

          handLines.getLastLineContainer().addNewPoint(curPoint.x + 60, curPoint.y);

          overlay.uploadLastLineHand(); 
          //uploadLastHandLine
        }
      }
      }

    }
  }











  }