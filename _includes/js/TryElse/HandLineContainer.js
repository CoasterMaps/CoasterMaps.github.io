  function HandLineContainer(inputLine) {

  	this.line = inputLine;
    

    this.getGeoPoints = function(points) {
       
      var newGeoArray = new Array();
      var index = 0;

      for (var i = 0; i<points.length; i+=2) {

        var currentLayerPoint = new google.maps.Point(points[i]-mapLayerState.getDiffX(), points[i+1]-mapLayerState.getDiffY()); 
    		newGeoArray[index] = mapLayer.fromPointToLatLng(currentLayerPoint, globalMap);
        index++;
      }

      this.geoPoints = newGeoArray;
      this.points = points;

    }


    this.getLine = function() {

    	return this.line;
    }


    this.getGeoArray = function() {

    	return this.geoPoints;
    }


    this.addNewPoint = function(x,y) {
     
    
      this.line.points(this.line.points().concat([x-60+mapLayerState.getDiffX(), y+mapLayerState.getDiffY()]));

      var currentLayerPoint = new google.maps.Point(x, y);//-60
      this.geoPoints[this.geoPoints.length] = mapLayer.fromPointToLatLng(currentLayerPoint, globalMap);
    }


    this.getLayerPoints = function() {

      return this.points;
    }

}