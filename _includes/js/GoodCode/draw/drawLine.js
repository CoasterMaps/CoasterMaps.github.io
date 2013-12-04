function DrawLine(inputMap) {

	this.map=inputMap;

    this.onBMap = function(latlng1, latlng2) {
    	var map = this.map;
    	var polyline = new Microsoft.Maps.Polyline([latlng1, latlng2], null); 
        map.entities.push(polyline);
    }

    this.onGMap = function(latlng, poly) {
    	
        var path = poly.getPath();
        path.push(latlng); 
    }

}
   
