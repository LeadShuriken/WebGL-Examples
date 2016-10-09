/* overview & fitting room */
var shopStyles			= { 'ClassicX':'Classic', 'WhiteX':'White', 'RawX':'Raw' };
var areas				= { 'overview':'Overview', 'fitting':'Fitting', 'window':'Window' };
var luminaires			= { 'L1':'StyliD','L2':'ProAir', 'L3':'ENBSpot', 'L4':'Adyar', 'L5':'Odeon', 'L6':'LuxSpace' }; 
var beamAngles			= { 'NB':'Narrow beam', 'MB':'Medium beam' };
var colorTemperatures	= { '2700':'2700', '3000':'3000', '4000':'4000', 'Crisp':'Crisp White' };
var accentLights 		= { '00':'Off', '01':'White', '02':'Pink', '03':'Blue' };

/* shop window */
var lights				= { '0':'Face Left', 
							'1':'Face Middle', 
							'2':'Face Right',
							'3':'Body Left', 
							'4':'Body Middle', 
							'5':'Body Right',
							'6':'Accent Background', 
							'7':'Shop Background', 
							'8':'Outside' };
var NrOfLights 			= 9; // Nr of lamps in shopwindow.html settings tab (colorpicker)
var lightDefault 		= '0';

//var setting_colortemp_val = 0;

var lightIntensitiesDefaults= { '0':80, '1':80, '2':80, '3':80, '4':80, '5':80, '6':80, '7':80, '8':80};

var exposureDefault		= 0.7;

var moviesDynamic		= { 'warm beat'			: 'images/movies/playbackDynamic_warmBeat.png',
							'rainbow flicker'	: 'images/movies/playbackDynamic_rainbowFlicker.png',	
							'Test colors'		: 'images/movies/playbackDynamic_testColors.png'
						  };	

var moviesStatic		= { 'Static greenish'	: 'images/movies/playbackStatic_greenish.png',	
							'Static red bg'		: 'images/movies/playbackStatic_redBackground.png'
						  };	

/* OVERVIEW default (reset) values */
var overview_shopStyleDefault = 'WhiteX';
var overview_areaDefault = 'overview'; // not selectable
var overview_classic_luminaireDefault = 'L2';
var overview_classic_beamAngleDefault = 'MB';
var overview_classic_colorTemperatureDefault = '3000';
var overview_classic_accentLightDefault = '00';
var overview_white_luminaireDefault = 'L6';
var overview_white_beamAngleDefault = 'MB';
var overview_white_colorTemperatureDefault = 'Crisp';
var overview_white_accentLightDefault = '01';
var overview_raw_luminaireDefault = 'L1';
var overview_raw_beamAngleDefault = 'NB';
var overview_raw_colorTemperatureDefault = '4000';
var overview_raw_accentLightDefault = '00';

/* FITTING default (reset) values */
var fitting_shopStyleDefault = 'WhiteX';
var fitting_areaDefault = 'fitting'; // not selectable
var fitting_luminaireDefault = 'L'; //  not selectable
var fitting_beamAngleDefault = 'A'; // not selectable
var fitting_classic_colorTemperatureDefault = '3000';
var fitting_classic_accentLightDefault = '01';
var fitting_white_colorTemperatureDefault = 'Crisp';
var fitting_white_accentLightDefault = '02';
var fitting_raw_colorTemperatureDefault = 'Crisp';
var fitting_raw_accentLightDefault = '03';


/* map location of all shop images (end with / and relative to js scripts location) */
var	imageMap = "../www/shop_images/";
