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
	    		center: new google.maps.LatLng(50.582746,-2.464678),//64.555816,40.525793),//50.582746,-2.464678),//64.54785,40.561295
	    		mapTypeId: google.maps.MapTypeId.SATELLITE,
	    		zoom: 16,
	    		draggable: false
            };

            this.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
            globalMap = this.map;

            this.point = this.map.getCenter();
        }
        
}

