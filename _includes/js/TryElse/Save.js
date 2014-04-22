  var annotGlobalString;
  var lineGlobalString;
  var handLinesGlobalString;


  function Save() {



      this.saveAnnot = function (annotArray) {

          var newStringAnnotArray = [{
              "lat": annotArray[0][1].lat().toString(),
              "lng": annotArray[0][1].lng().toString(),
              "name": annotArray[0][0].children[1].partialText
          }];

          for (var i = 1; i < annotArray.length; i++) {

              var stringLat = annotArray[i][1].lat().toString();
              var stringLng = annotArray[i][1].lng().toString();
              var annotName = annotArray[i][0].children[1].partialText;

              newStringAnnotArray = newStringAnnotArray.concat([{
                  "lat": stringLat,
                  "lng": stringLng,
                  "name": annotName
              }]);
          }

          var finalArray = {
              "annot": newStringAnnotArray
          };

          var myJsonString = JSON.stringify(finalArray);

          annotGlobalString = myJsonString;
      }


      this.getAnnot = function (inputAnnot) {

          if (inputAnnot !== 'undefined') {

              var myJsonString = inputAnnot;

              this.obj = JSON.parse(myJsonString);

              if (typeof this.obj.annot !== 'undefined') {

                  for (var i = 0; i < this.obj.annot.length; i++) {

                      var curLatLng = new google.maps.LatLng(this.obj.annot[i].lat, this.obj.annot[i].lng);

                      var actualpixelMouse = mapLayer.fromLatLngToPoint(curLatLng, globalMap);
                      var newLayerPixel = new google.maps.Point(actualpixelMouse.x + 60, actualpixelMouse.y);


                      toolTips.addToolTip(newLayerPixel.x, newLayerPixel.y, this.obj.annot[i].name);

                      overlay.uploadNextObject();
                  }

              }

          }

      }




      this.saveLines = function (type, inputLinesArray) {

          var newLine = [];
          var lineGeoPoints = [];

          if (inputLinesArray !== 'undefined') {

              for (var i = 0; i < inputLinesArray.length; i++) {

                  var geoPointsArray = inputLinesArray[i].getGeoArray();

                  for (var ii = 0; ii < geoPointsArray.length; ii++) {

                      var stringLat = geoPointsArray[ii].lat().toString();
                      var stringLng = geoPointsArray[ii].lng().toString();

                      lineGeoPoints = lineGeoPoints.concat([{
                          "point": {
                              "lat": stringLat,
                              "lng": stringLng
                          }
                  }]);
                  }

                  newLine = newLine.concat([{
                      "line": lineGeoPoints
              }]);

                  lineGeoPoints = [];
              }

              var finalArray = {
                  "linesArray": newLine
              };

              var myJsonString = JSON.stringify(finalArray);

              if (type === "handLines") {
                  handLinesGlobalString = myJsonString;
              } else if (type === "lines") {
                  lineGlobalString = myJsonString;
              }
          }
      }





      this.getLines = function (type, inputLines) {

          if ((inputLines !== 'undefined') && (inputLines !== "")) {

              this.obj = JSON.parse(inputLines);

              if (typeof this.obj.linesArray !== 'undefined') {

                  // loop through lines
                  for (var i = 0; i < this.obj.linesArray.length; i++) {

                      var curLine = this.obj.linesArray[i].line;

                      if (type === "handLines") {
                          handLines.newRedLine();
                      } else {
                          lines.newRedLine();
                      }

                      // parse through points
                      for (var ii = 0; ii < curLine.length; ii++) {

                          var curLat = parseFloat(curLine[ii].point.lat); // parseFloat()
                          var cutLng = parseFloat(curLine[ii].point.lng); // parseFloat()

                          var latLng = new google.maps.LatLng(curLat, cutLng);

                          var curPoint = mapLayer.fromLatLngToPoint(latLng, globalMap);


                          if (type === "handLines") {
                              handLines.getLastLineContainer().addNewPoint(curPoint.x, curPoint.y);
                          } else {
                              lines.getLastLineContainer().addNewPoint(curPoint.x, curPoint.y);
                          }
                      }
                  }

                  overlay.draw(type);
              }
          }

      }




  }