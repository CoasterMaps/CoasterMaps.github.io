
var overlay; 
var toolTips;
var lines;
var handLines;


function SetEasel() {
	

  var googleMap = new GoogleMap();
  googleMap.initialize();

  document.getElementById("cancel-tool").disabled = false; 
  document.getElementById("line-tool").disabled = false; 
  document.getElementById("annotation-tool").disabled = false; 
  document.getElementById("hand-tool").disabled = false; 
  document.getElementById("delete-tool").disabled = false;
  document.getElementById("get-tool").disabled = false;

  document.getElementById("save-tool").disabled = true;
  

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