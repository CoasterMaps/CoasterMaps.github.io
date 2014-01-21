
//google.maps.event.addDomListener(window, 'load', initialize);

function SetEasel() {
	

    var googleMap = new GoogleMap();
    googleMap.initialize();

	var overlay = new Overlay();



	overlay.setStage();

	overlay.uploadOverlay();
	
	//google.maps.event.addListenerOnce(googleMap.getMap(), 'idle', function(){
    //loaded fully
    var eventListener = new Events(googleMap,overlay);
    eventListener.setListeners();
	//window.alert("hi2");
//});

	
    

}