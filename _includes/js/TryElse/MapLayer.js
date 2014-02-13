function MapLayer()
{


 this.fromLatLngToPoint = function(latLng, map) {
    
      var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
      var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
      var scale = Math.pow(2, map.getZoom());
      var worldPoint = map.getProjection().fromLatLngToPoint(latLng);

      return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale-60, (worldPoint.y - topRight.y) * scale);
    }

   this.fromPointToLatLng = function(point, map) {

      point.x = point.x + 60;
      //window.alert(point.x);

      var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());

      var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
      var scale = Math.pow(2, map.getZoom());
      
      var worldPoint = map.getProjection().fromPointToLatLng(
        new google.maps.Point(Math.floor(point.x/scale+bottomLeft.x), Math.floor(point.y/scale+topRight.y)));
//Math.floor(

      return worldPoint;
    }





}