

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
      credentials: 'AveOyi7oVuY5IQ3tIs_9ow7f0MePq1XgB3hXC84OAJ9dCxZ3H9dcDq4VdkAJyIie',
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

