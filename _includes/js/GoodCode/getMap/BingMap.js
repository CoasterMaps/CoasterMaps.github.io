
function BingMap()
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

      var mapOptions = {
      credentials: 'AvO9xIw_2cNwan6bWuRDDjX1wTVLoXOXcVLTglL-ZrvRWN9KTqYynA6fsBcpvqOw',
      center: new Microsoft.Maps.Location(savedLat,savedLong),
      mapTypeId: Microsoft.Maps.MapTypeId.birdseye,
      zoom: savedZoom,
      labelOverlay: Microsoft.Maps.LabelOverlay.hidden 
     }

      var getmap = new Microsoft.Maps.Map(document.getElementById("bingMap"), mapOptions);

      myLocalStorage.saveBMapToLocalStorage(savedLat, savedLong, savedZoom);     
      
      return getmap;
    }
}

