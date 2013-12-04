function GoogleMap()
{
    
    this.getLat = function() {

        return this.mapLat;
    }

    this.getLong = function() {

        return this.mapLong;
    }

    this.getZoom = function() {

        return this.mapZoom;
    }


    this.getMap = function(savedLat, savedLong, savedZoom) {

      this.mapLat = savedLat;
      this.mapLong = savedLong;
      this.mapZoom = savedZoom;

      //window.alert("savedLat " + savedLat + " savedLong " + savedLong + " savedZoom " + savedZoom);

      var mapOptions = {
        center: new google.maps.LatLng(savedLat,savedLong),
        zoom: savedZoom,
        mapTypeId: google.maps.MapTypeId.SATELLITE
      };

      var getMap = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
 
      myLocalStorage.saveGMapToLocalStorage(savedLat, savedLong, savedZoom);     
      
      return getMap;
    }
}


