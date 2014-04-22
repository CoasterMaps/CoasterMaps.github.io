  function HandLineContainer(inputLine) {

  	this.line = inputLine;
    

    this.getGeoPoints = function(points) {
       
      var newGeoArray = new Array();
      
      for (var i = 0; i<points.length; i+=2) {

        var currentLayerPoint = new google.maps.Point(points[i], points[i+1]); 
        newGeoArray.push(mapLayer.fromPointToLatLng(currentLayerPoint, globalMap));
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
     
      this.line.points(this.line.points().concat([x, y]));

      var currentLayerPoint = new google.maps.Point(x, y); //-60
      this.geoPoints[this.geoPoints.length] = mapLayer.fromPointToLatLng(currentLayerPoint, globalMap);
    }


    this.getLayerPoints = function() {

      return this.points;
    }

}