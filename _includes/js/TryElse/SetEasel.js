
var overlay; 
var toolTips;
var lines;
var handLines;


function SetEasel() {
	

  var googleMap = new GoogleMap();
  googleMap.initialize();

  

	overlay = new Overlay();



  toolTips = new ToolTips();
  toolTips.initArray();

  lines = new Lines();
  lines.initArray();


  handLines = new HandLines();
  handLines.initArray();
  
  
	overlay.setStage();


	overlay.uploadOverlay();
	

	var eventListener = new Events(googleMap,overlay);
    eventListener.setListeners();
}