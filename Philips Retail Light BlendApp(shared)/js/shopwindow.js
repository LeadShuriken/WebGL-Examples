function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

function makeColorPickerActive(nr){
	console.log('nr='+nr);
	resetSelection(lights, '#setting_light_select', nr);
	$('#setting_light_select').click();
}

// ==== Movie =======================
var movie_isrunning = -1;	// -1=none; 0.. a movie is running
var movie_timer;			// reference to timer to be able to stop it
var movie_time = 0;			// time in movie
var movie_pattern_image = new Image();
movie_pattern_image.src = '';
var movie_canvas;
var movie_canvas_context;

function run_movie_updateLights()
{
	// make time loop around the image width
	var movie_position = movie_time % movie_canvas.width; 
	document.getElementById("movie_time").value = movie_position;
		
	// get one rgb pixel at position on the first line for the first channel update
	for(i=0; i<NrOfLights; i++) {
		var movie_pixel = movie_canvas_context.getImageData(movie_position,i,1,1).data; 
		colorinforgb[i] = {'red':movie_pixel[0]/255, 'green':movie_pixel[1]/255, 'blue':movie_pixel[2]/255};
		
		document.getElementById("info"+i+"-r").value = movie_pixel[0]/255; // red
		document.getElementById("info"+i+"-g").value = movie_pixel[1]/255; // green
		document.getElementById("info"+i+"-b").value = movie_pixel[2]/255; // blue
	}
	movie_time = movie_time + 1;
}

function run_movie( moviekind, nr ){
	if (movie_isrunning != nr ) {
		i=0; movies=[];
		if (moviekind=='dynamic') movies=moviesDynamic;
		else if (moviekind=='static') movies=moviesStatic;
		for(movie in movies) {
			if (i==nr) {
				movie_pattern_image.src = movies[movie];
				$('#movie_button_'+moviekind+'_'+i).removeClass('movie_button_inactive').addClass('movie_button_active');
			} else {
				$('#movie_button_'+moviekind+'_'+i).removeClass('movie_button_active').addClass('movie_button_inactive');
			}
			i++;
		}
		console.log('run_movie '+nr+': '+movie_pattern_image.src);
		// make sure canvas is updated only once the image is actually loaded, otherwise this might fail
		movie_pattern_image.onload = function() { 
			console.log('onload: '+movie_pattern_image.src);
			movie_canvas.width = movie_pattern_image.width; movie_canvas.height = movie_pattern_image.height; movie_canvas_context.drawImage(movie_pattern_image,0,0);
		};
		movie_time = 0;
		clearInterval( movie_timer );
		movie_timer = setInterval(function () { run_movie_updateLights(); }, 100); // set update every 100ms
		movie_isrunning = nr;
	} else if (nr>-1) {
		clearInterval( movie_timer );
		$('#movie_button_dynamic_'+nr).removeClass('movie_button_active').addClass('movie_button_inactive');
		$('#movie_button_static_'+nr).removeClass('movie_button_active').addClass('movie_button_inactive');
		movie_isrunning = -1;
		console.log('run_movie '+nr+': stopped');
	}
}
// ==== End of Movie =================================================

function settings_reset_button(){
	resetSelection( lights, setting_light_select, lightSel);	
	lightIntensities = JSON.parse(JSON.stringify(lightIntensitiesDefaults));
	for (var i=0; i<NrOfLights; i++){
		makeColorPickerActive( i );
		getColor2Image(i, 1500+i*25, 820);
	}
	makeColorPickerActive( 0 );
	console.log("resetpicker");
}

// ==== GL ===========================================================
var value_exposure = exposureDefault;

function highlightSelected(channel) {
   	if ($('#setting_light_select').val()-1==channel) {
//   		gl.uniform1f(shaderProgram.selection, channel);
   	}
}

function resetSelected() {
//	gl.uniform1f(shaderProgram.selection, -1.0);
}
// ==== End of GL =====================================================
$(document).ready(function() {
	movie_canvas = document.getElementById("movie_pattern");
	movie_canvas_context = movie_canvas.getContext("2d");
	
	$('#setting_save_button').on('click', function(){
		// Make sure the GL context is created as follows: gl=canvas.getContext("experimental-webgl",{preserverDrawingBuffer:true});
		// If preserverDrawingBuffer is not enabled it will return an empty image
		data = document.getElementById('HDRviewer_canvas').toDataURL('image/png');
		document.location.href = data.replace('image/png', 'image/octet-stream');
	});	

	/* Upper 3 buttons: */
	$("#player_button").on('click', function(){
		reset_all_category_buttons();
		$("#player_button").attr('src','img/player_button_active.png');
	 	$("#player_category_content").css("visibility", 'visible');
	 	$('#mainimage_div').css("visibility", 'hidden');
	 	$('#HDRviewer_div').css("visibility", 'visible');
	 	run_movie( '', movie_isrunning ); // stops a running movie
	});
	$("#presets_button").on('click', function(){
		reset_all_category_buttons();
		$("#presets_button").attr('src','img/presets_button_active.png');
	 	$("#presets_category_content").css("visibility", 'visible');
	 	$('#mainimage_div').css("visibility", 'hidden');
	 	$('#HDRviewer_div').css("visibility", 'visible');
	 	run_movie( '', movie_isrunning ); // stops a running movie
	});
	$("#settings_button").on('click', function(){
		reset_all_category_buttons();
		$("#settings_button").attr('src','img/settings_button_active.png');
	 	$("#settings_category_content").css("visibility", 'visible');
	 	$('#mainimage_div').css("visibility", 'hidden');
	 	$('#HDRviewer_div').css("visibility", 'visible');
	 	run_movie( '', movie_isrunning ); // stops a running movie
		settings_reset_button(); // reset picker, added by chris		
	 	$('#setting_light_select').click();
	});

	$("#player_button").click(); // Make default button active after loading page.. 

	/* Settings buttons */
	$('#setting_light_select').on('click', function(){
		for(i=0; i<NrOfLights; i++) {
			if ( i==$('#setting_light_select').val() ) { // the selected item
				pos = $('#setting_intensity_slider').offset().left + lightIntensities[i]/100 * $('#setting_intensity_slider').width();
				//console.log('pos='+pos+' l='+lightIntensities[i]);
				$('#setting_intensity_sliderpicker').offset({left:pos});
				
				$('#img_colorpicker'+i)
					.attr('src', 'images/PickerActiveM.png')
					.css('z-index', '1000')
					.draggable('enable');
			} else {
				$('#img_colorpicker'+i)
					.attr('src', 'images/PickerNotActiveM.png')
					.css('z-index', '900')
					.draggable('disable');
				//if ($('#img_colorpicker'+i).draggable('instance')!= 'undefined') $('#img_colorpicker'+i).draggable('destroy');
			}
		}
	});

	// The dot of the slider..
	$('#setting_intensity_sliderpicker').draggable({axis: "x", containment: "#setting_intensity_slider", drag: function(event, ui){
		max    = $('#setting_intensity_slider').width()-8; // max value for 'left' as 100%
		channel= $('#setting_light_select').val();
		lightIntensities[ channel ] = ui.position.left / max * 100; // calc global var (0..100%)
		getColor2Image( channel, 0,0 ); // apply to the selected lamp..

		// Uses function of https://gist.github.com/paulkaplan/5184275 (general.js)
 		//t_min=1000;
		//t_max=40000;
		//kelvin = t_min + (lightIntensities[ $('#setting_light_select').val() ]/100 * (t_max - t_min));
		//ct = colorTemperatureToRGB( kelvin );
		//console.log('x='+ui.position.left+' max='+max+' kelvin='+kelvin+' colortemp: r='+ct.r+' g='+ct.g+' b='+ct.b);
	} } );

	$('#setting_intensity_select').on('click', function(event) { // click somewhere in at the slider bar..
		maxX = $('#setting_intensity_slider').width();
		barX = $('#setting_intensity_slider').offset().left;
		channel= $('#setting_light_select').val();
		if (event.pageX>=barX && event.pageX<=(barX+maxX)) {
			$('#setting_intensity_sliderpicker').offset({left:event.pageX-17});
			//max=$('#setting_intensity_slider').width()-8; // max value for 'left' as 100%
			lightIntensities[ channel ] = $('#setting_intensity_sliderpicker').position().left / maxX * 100; // calc global var (0..100%)
			getColor2Image( channel, 0,0 ); // apply to the selected lamp..
		}
	});

	$('#canvas_colorpicker').on('click', function(event) { // click somewhere in the colorpicker canvas..
		getColor2Image( $('#setting_light_select').val(), event.pageX, event.pageY ); // drag picker to clicked pos and apply color
	});

	/* colorpicker code start */
    var d_canvas = document.getElementById('canvas_colorpicker');
   	var context = d_canvas.getContext('2d');
   	var img_colorpickerBG = document.getElementById('img_colorpickerBG');
   	context.drawImage(img_colorpickerBG, 0, 0);
	/* colorpicker code end */

	//$('#setting_reset_button').on('click', function(){
		settings_reset_button();	
	//});
	//$('#setting_reset_button').click();

});



