var globalMap;

function GoogleMap()
{

	    this.getMap = function() {

	    	return this.map;
	    }


	    this.getCenterPoint = function() {

	    	return this.point;
	    }
	  
    
	    this.initialize = function() {

	    	var mapOptions = {
	    		center: new google.maps.LatLng(-34.397, 150.644),
	    		zoom: 8
            };

            this.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
            globalMap = this.map;

            this.point = this.map.getCenter();
        }
        
}

//  bottom: -200px;