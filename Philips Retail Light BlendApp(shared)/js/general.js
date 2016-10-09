var overview_image_url='';

var shopStyleSel = '';
var areaSel = '';
var luminaireSel = '';
var colorTemperatureSel = '';
var beamAngleSel = '';
var accentLightSel = '';

var lightSel = lightDefault;

var colorinforgb = new Array();

var lightIntensities = [];

function changeMainImage() {
	overview_image_url = imageMap+shopStyleSel+'_'+areaSel+'_'+luminaireSel+'_'+beamAngleSel+'_'+colorTemperatureSel+'_'+accentLightSel+'.png';
	console.log('url='+overview_image_url);
	$('#mainimage').attr('src', overview_image_url);
}
changeMainImage();


function clamp( x, min, max ) {
	if(x<min){ return min; }
	if(x>max){ return max; }
	return x;
}
function colorTemperatureToRGB(kelvin){
	// Calcultate ColorTemperature.. (from: https://gist.github.com/paulkaplan/5184275)
	var temp = kelvin / 100;
	var red, green, blue;
	if( temp <= 66 ){
		red = 255;
		green = temp;
		green = 99.4708025861 * Math.log(green) - 161.1195681661;
 
		if( temp <= 19){
			blue = 0;
		} else {
			blue = temp-10;
			blue = 138.5177312231 * Math.log(blue) - 305.0447927307; 
		}
	} else {
		red = temp - 60;
		red = 329.698727446 * Math.pow(red, -0.1332047592);
		green = temp - 60;
		green = 288.1221695283 * Math.pow(green, -0.0755148492 );
		blue = 255;
	}
	return {
		r : clamp(red, 0, 255) / 255,
		g : clamp(green, 0, 255) / 255,
		b : clamp(blue, 0, 255) / 255
	};
}

function getColor2Image(Id, dragX, dragY) {
   	if ($('#setting_light_select').val()==Id) {
    	if (dragX>0 && dragY>0) {
			$('#img_colorpicker'+$('#setting_light_select').val() ).offset({left:dragX-10, top:dragY-27});
    	}
    	
		canvas = $('#canvas_colorpicker');
		cp = $('#img_colorpicker'+Id);
		x = cp.offset().left - canvas.offset().left+17;
		y = cp.offset().top - canvas.offset().top+47;
    	
		c = document.getElementById('canvas_colorpicker').getContext('2d');
		p = c.getImageData(x, y, 1, 1).data;
		hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
		var pf=[]; for(i=0;i<3;i++) pf[i]=p[i]/256 * (lightIntensities[Id]/100);
		colorinforgb[Id] = {'red':pf[0], 'green':pf[1], 'blue':pf[2]};
		
		$('#info'+Id+'-r').val(pf[0]);
		$('#info'+Id+'-g').val(pf[1]);
		$('#info'+Id+'-b').val(pf[2]); 
		console.log('getColor2Image: id='+Id+': int='+lightIntensities[Id]+' hex='+hex+' r='+colorinforgb[Id].red+' g='+colorinforgb[Id].green+' b='+colorinforgb[Id].blue);
	}
}

function createSelectionOptions( domid, jsonList){
	$.each(jsonList, function(key, value){
		$('#'+domid).append($('<option>',{value:key}).text(value));
		//$('#'+domid).append($('<li>',{value:key}).text(value));
	});
}

function getFirstKey( jsonList, domId ){
	for(var key in jsonList){
		$(domId).val(key);
		$(domId).next(".holder").text( jsonList[key] );
		//$(domId).click();
		return key;  // return at first one in list
	}
}

function resetSelection( jsonList, domId, sel) {
	for(var key in jsonList){
		if (key==sel) {
			$(domId).val(key);
			$(domId).next(".holder").text( jsonList[key] ); console.log('resetSelection: key='+key+' val='+jsonList[key]);
			//$(domId).click();
			return key;  // return at found selection
		}
	}
	//getFirstKey( jsonList, domId ); // else select first one
}

 function reset_all_category_buttons(){
	$("#player_button").attr('src','img/player_button_inactive.png');
	$("#presets_button").attr('src','img/presets_button_inactive.png');
	$("#settings_button").attr('src','img/settings_button_inactive.png');
 	
	$("#player_category_content").css("visibility", 'hidden');
	$("#presets_category_content").css("visibility", 'hidden');
	$("#settings_category_content").css("visibility", 'hidden');
}

$(document).ready(function() {
	$('#home_button').on('click', function(){
		window.location.href = 'index.html';
	});

/* Presets selects */
	createSelectionOptions('preset_shopstyle_select', shopStyles);
	createSelectionOptions('preset_luminaire_select', luminaires);
	createSelectionOptions('preset_colortemperature_select', colorTemperatures);
	createSelectionOptions('preset_beamangle_select', beamAngles);
	createSelectionOptions('preset_accentlight_select', accentLights);

/* Settings select */
	createSelectionOptions('setting_light_select', lights, lightDefault);

/* select layout */
	$(".custom-select1").each(function(){
		$(this).wrap("<span class='select-wrapper1'></span>");
		$(this).after("<span class='holder'></span>");
	});
	$(".custom-select1").change(function(){
		var selectedOption = $(this).find(":selected").text();
		$(this).next(".holder").text(selectedOption);
	}).trigger('change');

	$(".custom-select2").each(function(){
		$(this).wrap("<span class='select-wrapper2'></span>");
		$(this).after("<span class='holder'></span>");
	});
	$(".custom-select2").change(function(){
		var selectedOption = $(this).find(":selected").text();
		$(this).next(".holder").text(selectedOption);
	}).trigger('change');

	$("#preset_shopstyle_select").on('click', function(){
		shopStyleSel = $('#preset_shopstyle_select').val();
		//$('#preset_reset_button').click();
		//areaSel = overview_areaDefault;

		// limit Accent Light selection for Classic or Raw is selected
		if (areaSel == 'fitting') {
			$('#preset_accentlight_select').attr('disabled', false);		
		} else {
			if (shopStyleSel == 'ClassicX' || shopStyleSel == 'RawX') {
				accentLightSel = resetSelection(accentLights, '#preset_accentlight_select', '00');
				$('#preset_accentlight_select').attr('disabled','disabled');			
			} else {
				$('#preset_accentlight_select').attr('disabled', false);
			}
		}
		changeMainImage();
	});

	$("#preset_luminaire_select").on('click', function(){
		luminaireSel = $('#preset_luminaire_select').val();
		changeMainImage();
	});

	$("#preset_beamangle_select").on('click', function(){
		beamAngleSel = $('#preset_beamangle_select').val();
		changeMainImage();
	});

	$("#preset_colortemperature_select").on('click', function(){
		colorTemperatureSel = $('#preset_colortemperature_select').val();
		changeMainImage();
	});

	$("#preset_accentlight_select").on('click', function(){
		accentLightSel = $('#preset_accentlight_select').val();
		changeMainImage();
	});

	// reset click: moved to overview.js and fittingroom.js
});

