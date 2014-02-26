function LineContainer(inputLine) {


	this.line = inputLine;

  //this.newGeoArray = new Array();
  //this.index = 0;
    
    

    this.getGeoPoints = function(points) {
       
        var mapLayer = new MapLayer();

        var newGeoArray = new Array();
        var index = 0;

        for (var i = 0; i<points.length; i+=2) {
         
    		var currentLayerPoint = new google.maps.Point(points[i], points[i+1]); //-60
    		newGeoArray[index] = mapLayer.fromPointToLatLng(currentLayerPoint, globalMap);
            index++;
        }

        this.geoPoints = newGeoArray;
        this.points = points; 
        return this.geoPoints;

    }


    this.getLine = function() {

    	return this.line;
    }


    this.getGeoArray = function() {

    	return this.geoPoints;
    }


    this.addNewPoint = function(x,y) {
     
      var mapLayer = new MapLayer();

      //window.alert("diff x:"+mapLayerState.getDiffX()+" y:"+mapLayerState.getDiffY());

      this.line.points(this.line.points().concat([x+mapLayerState.getDiffX(), y+mapLayerState.getDiffY()]));

      //var currentLayerPoint = new google.maps.Point(x, y);//-60
      //this.geoPoints[this.geoPoints.length] = mapLayer.fromPointToLatLng(currentLayerPoint, globalMap);
      

  }


  this.getLayerPoints = function() {

   return this.points;
}

}