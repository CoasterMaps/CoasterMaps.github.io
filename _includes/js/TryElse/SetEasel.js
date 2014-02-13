
var overlay; 
var toolTips;
 var lines;

function SetEasel() {
	

  var googleMap = new GoogleMap();
  googleMap.initialize();

	overlay = new Overlay();



  toolTips = new ToolTips();
  toolTips.initArray();

  lines = new Lines();
  lines.initArray();

  //toolTips.addToolTip(170,75);
  

	overlay.setStage();


	overlay.uploadOverlay();
	

	var eventListener = new Events(googleMap,overlay);
    eventListener.setListeners();
}