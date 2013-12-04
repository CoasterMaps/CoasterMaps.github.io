function BingListeners(inputBMap) {

	this.bmap = inputBMap;

  this.point1Lat=0;
  this.point1Long=0;

  this.point2Lat=0;
  this.point2Long=0;


  this.initListeners = function() {
     
     var bmap = this.bmap;

     var viewchange = Microsoft.Maps.Events.addHandler(bmap, 'viewchange',
      function(e) {
        var centerCoord = bmap.getCenter();
        var zoom = bmap.getZoom();        

        myLocalStorage.saveBMapToLocalStorage(centerCoord.latitude, centerCoord.longitude, zoom);             
      }); 
  }


  this.setTagListener = function() {

         //window.alert("set tag listener");

        var bmap = this.bmap;

        Microsoft.Maps.Events.removeHandler(this.tagClick);
        Microsoft.Maps.Events.removeHandler(this.lineClick);
        this.tagClick = Microsoft.Maps.Events.addHandler(bmap, 'click', 
  
      function(e){
        
        var point = new Microsoft.Maps.Point(e.getX(), e.getY());
        var loc = e.target.tryPixelToLocation(point);
        
        var drawTag = new DrawTag(bmap);
        drawTag.onBMap(loc);       
      });

  }


 

this.setLineListener = function() {
        this.point1Lat=0;
        this.point1Long=0;
        this.point2Lat=0;
        this.point2Long=0;
       
        var bmap = this.bmap;
        Microsoft.Maps.Events.removeHandler(this.tagClick);
        Microsoft.Maps.Events.removeHandler(this.lineClick);

        this.lineClick = Microsoft.Maps.Events.addHandler(bmap, 'click', function(e){

          var point = new Microsoft.Maps.Point(e.getX(), e.getY());
          var loc = e.target.tryPixelToLocation(point);

          if ((this.point1Lat!==0)&&(this.point1Long!==0)) {
            this.point2Lat=loc.latitude;
            this.point2Long=loc.longitude;
          } else {
            this.point2Lat=loc.latitude;
            this.point2Long=loc.longitude; 
          }

          if ((this.point1Lat!==0)&&(this.point1Long!==0)&&(this.point2Lat!==0)&&(this.point2Long!==0)){

            var drawLine = new DrawLine(bmap);

            drawLine.onBMap(new Microsoft.Maps.Location(this.point1Lat, this.point1Long), new Microsoft.Maps.Location(this.point2Lat, this.point2Long));
      
          this.point1Lat=this.point2Lat;
          this.point1Long=this.point2Long;
          this.point2Lat=0;
          this.point2Long=0;
        }
        
      }); 
}


}
