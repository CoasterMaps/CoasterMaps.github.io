	var redHand = 0;
	var greenHand = 0;
	var blueHand = 0;
    var globalLineStroke = 0;
    var globalHandLineStroke = 0;

    var r;
    var g;
    var b;

	$(function(){
		window.prettyPrint && prettyPrint();

		$('#sl1').slider({
			formater: function(value) {
				globalLineStroke = document.getElementById("sl1").value;
				return 'Current value: '+value;
			}
		});

		function getStrokeWidth() {
			globalLineStroke = document.getElementById("sl1").value;
			return globalLineStroke;
		}

		$('#spanHandLine').slider({
			formater: function(value) {
				globalHandLineStroke = document.getElementById("spanHandLine").value;
				return 'Current value: '+value;
			}
		});



		function getR() {
			var red = r.getValue();
			return red;
		}

		function getG() {
			var green = g.getValue();
			return green;
		}

		function getB() {
			var blue = b.getValue();
			return blue;
		}

		var RGBChange = function() {
			redHand = r.getValue();			
			greenHand = g.getValue();
			blueHand = b.getValue();
                          $('#RGB').css('background', 'rgb('+r.getValue()+','+g.getValue()+','+b.getValue()+')') //Overall rgb value defined here
                      };


                      r = $('#R').slider()
                      .on('slide', RGBChange)
                      .data('slider');
                      g = $('#G').slider()
                      .on('slide', RGBChange)
                      .data('slider');
                      b = $('#B').slider()
                      .on('slide', RGBChange)
                      .data('slider');

                      $('#eg input').slider();
                  });

$('#sl1').slider()
.on('slide', function(ev){
	$('#bar').val(ev.value);
});
</script>

<script type="text/javascript">

$(document).ready(function() {
	$(document).on('click', '.dropdown-menu', function (e) {
            $(this).hasClass('keep_open') && e.stopPropagation(); // This replace if conditional.
        }); 
});

function get_value(callback){
         jQuery.getJSON("{{ the_url }}", function(a,b){
           
            d = JSON.stringify(a)
            callback(a)
        })
        }

       function get_annotation_from_database(){
              console.log("helo")
             $(document).ready(function(){
                get_value( function(value){
                   
                    console.log(value)
                    veraString = value;

                    var saveDrawings = new Save();
                    staticLayer.clear();

                    var res = veraString.split("+");                    

                    saveDrawings.getLines(res[0]);
                    saveDrawings.getHandLines(res[1]);
                    saveDrawings.getAnnot(res[2]);
                    
                    return value;
                });
              });
          }

          function deleteAllAnnotations(){
            jQuery.post("{{ delete_url }}", function(a,b){
              console.log(a,b)
            })
          }