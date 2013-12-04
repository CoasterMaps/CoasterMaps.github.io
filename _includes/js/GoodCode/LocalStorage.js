function LocalStorage() {

   //localStorage.clear();

	var initLat = 50.616578;
    var initLong = -1.932278;
    var initZoom = 12;

   
    this.getMapLat = function() {
//window.alert("hi");
    	if(typeof localStorage.mapLat !== 'undefined')
    		return parseFloat(localStorage.mapLat);
    	
        else return initLat;
    }

    this.getMapLong = function() {

        if(typeof localStorage.mapLong !== 'undefined')
    		return parseFloat(localStorage.mapLong);
    	
        else return initLong;
    }

    this.getMapZoom = function() {

        if(typeof localStorage.mapZoom !== 'undefined')
    		return parseFloat(localStorage.mapZoom);

      	else return initZoom;
    }


    this.getAnnotationsLat = function() {

    	if(typeof localStorage.annotationsLat !== 'undefined')
    		return localStorage.annotationsLat;
    	else return "";
    }

    this.setAnnotationsLat = function(inputAnnotation) {

    	localStorage.annotationsLat = inputAnnotation;
    	
    }


    this.getAnnotationsLong = function() {

    	if(typeof localStorage.annotationsLong !== 'undefined')
    		return localStorage.annotationsLong;
    	else return "";
    }


    this.setAnnotationsLong = function(inputAnnotation) {

    	 localStorage.annotationsLong = inputAnnotation;
    }

    this.saveBMapToLocalStorage = function(saveLat, saveLong, saveZoom) {
        localStorage.mapLat = saveLat;
        localStorage.mapLong = saveLong;
        localStorage.mapZoom = saveZoom;
    }

    this.saveGMapToLocalStorage = function(saveLat, saveLong, saveZoom) {
    	localStorage.mapLat = saveLat;
        localStorage.mapLong = saveLong;
        localStorage.mapZoom = saveZoom;
    }

    this.addGTagToAnnotations = function(latlng) {
    	if(typeof localStorage.annotationsLat === 'undefined')
    		localStorage.annotationsLat = String(latlng.lat());
    	
    	else localStorage.annotationsLat += String(latlng.lat());
    	
    	localStorage.annotationsLat += "#";
       // window.alert("localStorage.annotationsLat: " + localStorage.annotationsLat);

    	if(typeof localStorage.annotationsLong === 'undefined')
    		localStorage.annotationsLong = String(latlng.lng());
    	
    	else localStorage.annotationsLong += String(latlng.lng());

    	localStorage.annotationsLong += "#";

       // window.alert("localStorage.annotationsLong: " + localStorage.annotationsLong);
    }

    this.addBTagToAnnotations = function(latlng) {
   
        if(typeof localStorage.annotationsLat === 'undefined')
            localStorage.annotationsLat = String(latlng.latitude);
        else localStorage.annotationsLat += String(latlng.latitude);

        localStorage.annotationsLat += "#";

        if(typeof localStorage.annotationsLong === 'undefined')
            localStorage.annotationsLong = String(latlng.longitude);
        else localStorage.annotationsLong += String(latlng.longitude);

        localStorage.annotationsLong += "#";
    }

}




