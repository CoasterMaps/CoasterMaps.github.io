function DrawTag(inputMap) {

	this.map=inputMap;

    this.onGMap = function(latlng) {
   
      var map = this.map;
    	var marker = new google.maps.Marker({
           position: latlng,
           title:"Hello World!"
           });

      marker.setMap(map);

      myLocalStorage.addGTagToAnnotations(latlng);
    }

    this.onBMap = function(latlng) {
     
      var map = this.map;
      var content = "";
      content = "<div style='font-size:12px;font-weight:bold;border:solid 2px;background-color:LightBlue;width:50px;'>Custom Pushpin 2</div>"; 
      
      var pushpinOptions = {width: null, height: null, htmlContent: content}; 
      var pushpin = new Microsoft.Maps.Pushpin(latlng, pushpinOptions);
      map.entities.push(pushpin);
      
      myLocalStorage.addBTagToAnnotations(latlng);
    }


}


