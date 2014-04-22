  var initialZoom = 0;

  var mapLayerState = new MapLayerState();

  var line = 0;
  var annot = 0;
  var hand = 0;
  var deleteMode = 0;

  var isMouseHandDraw = false;
  var newline;
  var handpoints = [];
  var currentHandLine;

  var prevDisabledButton="";




  function Events(inputMap, inputOverlay) {

      this.googleMap = inputMap;
      this.overlay = inputOverlay;


      window.addEventListener("keypress", function (e) {

          var charCode = String.fromCharCode(e.charCode);

          var curPoint = globalMap.getProjection().fromLatLngToPoint(globalMap.getCenter());
          var pixelDiff = 0.0005;


          if (charCode == 'w') {

              curPoint.y -= pixelDiff;
              e.preventDefault();
          } else if (charCode == 's') {

              curPoint.y += pixelDiff;
              e.preventDefault();
          } else if (charCode == 'a') {

              curPoint.x -= pixelDiff;
              e.preventDefault();
          } else if (charCode == 'd') {

              curPoint.x += pixelDiff;
              e.preventDefault();
          }

          staticLayer.clear();

          var newCenter = globalMap.getProjection().fromPointToLatLng(curPoint);
          globalMap.setCenter(newCenter);

          overlay.draw("lines");
          overlay.draw("handLines");
          overlay.drawAnnot();

      });



      var disableButton = function (buttonString) {

          document.getElementById(buttonString).disabled = true;
          if (prevDisabledButton !== "")
              document.getElementById(prevDisabledButton).disabled = false;
          prevDisabledButton = buttonString;

          console.log(buttonString);
      }



      $("#prev-tool").click(function () {

          uploadState(curViewQueue.getPrevView());
      });


      $("#next-tool").click(function () {

          uploadState(curViewQueue.getNextView());
      });


      function uploadState(inputState) {

          if (inputState !== undefined) {

              var saveDrawings = new Save();
              staticLayer.clear();


              overlay.hideAll();

              var res = inputState.split("+");

              saveDrawings.getLines("lines", res[1]);
              saveDrawings.getLines("handLines", res[2]);
              saveDrawings.getAnnot(res[0]);
          }
      }



      $("#cancel-tool").click(function () {
          var cancel_tool = this;
          annot = 0;
          line = 0;
          hand = 0;
          deleteMode = 0;
          disableButton("cancel-tool");

      });




      $("#line-tool").click(function () {
          annot = 0;
          line = 1;
          hand = 0;
          deleteMode = 0;
          disableButton("line-tool");
      });



      $("#annotation-tool").click(function () {
          annot = 1;
          line = 0;
          hand = 0;
          deleteMode = 0;
          disableButton("annotation-tool");

      });


      $("#hand-tool").click(function () {
          annot = 0;
          line = 0;
          hand = 1;
          deleteMode = 0;
          disableButton("hand-tool");

      });

      $("#delete-tool").click(function () {

          deleteMode = 1;
          annot = 0;
          line = 0;
          hand = 0;
          disableButton("delete-tool");

          /*overlay.deleteLast(currentToolType[currentToolTypePos - 1]);
          currentToolTypePos--;

          if (currentToolTypePos === 0) {
              document.getElementById("#delete-tool").disabled = true;
          } else {
              currentToolType.pop();
              document.getElementById("#delete-tool").disabled = false;
          }*/

      });


      $("#save-tool").click(function () {
          
           document.getElementById("save-tool").disabled = true;

          var arrayToolTip = toolTips.returnArray();
          var lineArray = lines.returnArray();
          var handlineArray = handLines.returnArray();

          var saveDrawings = new Save();

          if (arrayToolTip.length > 0) saveDrawings.saveAnnot(arrayToolTip);

          if (lineArray.length > 0) saveDrawings.saveLines(lineArray);

          if (handlineArray.length > 0) saveDrawings.saveHandLines(handlineArray);

          var jsonstr = ""
          if (typeof annotGlobalString != 'undefined') {
              jsonstr += annotGlobalString;
              jsonstr += "+";
          }
          if (typeof lineGlobalString != 'undefined') {
              jsonstr += lineGlobalString;
              jsonstr += "+";
          }
          if (typeof handLinesGlobalString != 'undefined') {
              jsonstr += handLinesGlobalString;
          }

          jQuery.post("{{ the_url }}", {
              json_annotation: JSON.stringify(jsonstr)
          }, function (a, b) {
              console.log(a, b)
          });
          

      });







      this.setListeners = function () {

          initialZoom = this.googleMap.getMap().getZoom();

          google.maps.event.addListenerOnce(globalMap, 'idle', function () {

              initialZoom = globalMap.getZoom();

          });



          google.maps.event.addListener(globalMap, 'zoom_changed', function (event) {

              staticLayer.clear();

              overlay.draw("lines");
              overlay.draw("handLines");
              overlay.drawAnnot();

              initialZoom = globalMap.getZoom();
          });




          this.overlay.getStage().getContent().addEventListener('mousedown', function (event) {

              mapLayerState.setInitialPosition(event.clientX, event.clientY);


              // annot tool trigger
              if (annot === 1) {

                  toolTips.addToolTip(event.clientX, event.clientY, document.getElementById("annotName").value.toString());
                  overlay.uploadNextObject();
                  isMouseHandDraw = false;
                  stage.draggable(true);

                  currentToolType.push("annot");
              }


              // line tool trigger
              else if (line > 0) {

                  stage.draggable(false);
                  isMouseHandDraw = true;

                  if (line === 1) {

                      lines.newRedLine();
                      line++;
                      currentToolType.push("line");
                  }

                  lines.getLastLineContainer().addNewPoint(event.clientX - 60, event.clientY);
                  overlay.uploadLastLine();
              }


              // hand tool trigger
              else if (hand === 1) {

                  stage.draggable(false);
                  isMouseHandDraw = true;

                  currentToolType.push("hand");

                  currentHandLine = handLines.newRedLine();

                  handpoints = [];
                  handpoints = handpoints.concat([event.clientX - 60 + mapLayerState.getDiffX(), event.clientY + mapLayerState.getDiffY()]);

                  overlay.uploadLastHandLine(currentHandLine, handpoints);

              } else {
                  stage.draggable(true);
                  isMouseHandDraw = false;
              }


          });


          this.overlay.getStage().getContent().addEventListener('mouseup', function (event) {

              mapLayerState.setInitialPosition(0, 0);

              isMouseHandDraw = false;
              document.getElementById("container").style["cursor"] = "default";

              //curViewQueue.newPrevView(curViewQueue.getCurrentView());

          });



          this.overlay.getStage().getContent().addEventListener('mousemove', function (event) {

              // if hand drawing tool draw, else probably move map
              if (isMouseHandDraw) {

                  if (hand === 1) {

                      stage.draggable(false);

                      handpoints = handpoints.concat([event.clientX - 60 + mapLayerState.getDiffX(), event.clientY + mapLayerState.getDiffY()]);

                      overlay.uploadLastHandLine(currentHandLine, handpoints);
                      stage.draggable(true);


                  }

              } else if ((mapLayerState.getInitPosX() !== 0) && (mapLayerState.getInitPosY() !== 0)) {


                  var finalPositionX = event.clientX;
                  var finalPositionY = event.clientY;


                  var initLatLong = globalMap.getCenter();
                  var pixelpoint = globalMap.getProjection().fromLatLngToPoint(initLatLong);
                  var zoom = globalMap.getZoom();


                  pixelpoint.x = pixelpoint.x + (mapLayerState.getInitPosX() - finalPositionX) / Math.pow(2, zoom);
                  pixelpoint.y = pixelpoint.y + (mapLayerState.getInitPosY() - finalPositionY) / Math.pow(2, zoom);

                  var newpoint = globalMap.getProjection().fromPointToLatLng(pixelpoint);

                  globalMap.setCenter(newpoint);

                  mapLayerState.setDiff(mapLayerState.getDiffX() + mapLayerState.getInitPosX() - finalPositionX,
                      mapLayerState.getDiffY() + mapLayerState.getInitPosY() - finalPositionY);

                  mapLayerState.setInitialPosition(finalPositionX, finalPositionY);
              }

          });

      }



  }