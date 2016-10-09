/* overview & fitting room */
var shopStyles			= { 'ClassicX':'Classic', 'WhiteX':'White', 'RawX':'Raw' };
var areas				= { 'overview':'Overview', 'fitting':'Fitting', 'window':'Window' };
var luminaires			= { 'L1':'StyliD Black','L7':'StyliD White','L8':'ProAir Black','L2':'ProAir White', 'L3':'ENBSpot', 'L4':'Adyar', 'L5':'Odeon', 'L6':'LuxSpace' }; 
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

var lightIntensitiesDefaults= { '0':60, '1':60, '2':60, '3':60, '4':80, '5':60, '6':60, '7':60, '8':60};

var exposureDefault		= 0.7;

var moviesDynamic		= { 'Dynamic Shopwindow'	: 'images/movies/playbackDynamic_storytelling.png',
					    'Beating Heart'		: 'images/movies/playbackDynamic_warmBeat.png',
					    'Changing Hues'		: 'images/movies/playbackDynamic_hueRot.png',
					    'Night Storm'	     : 'images/movies/playbackDynamic_rainbowFlicker.png',	
					    'Light Channels'		: 'images/movies/playbackDynamic_channelDemo.png'
					   };	

var moviesStatic		= { 'Warm White'	: 'images/movies/playbackStatic_warmWhite.png',	
						'Cool White'	: 'images/movies/playbackStatic_coolWhite.png',
						'Red Accent'	: 'images/movies/playbackStatic_redBackground.png',
						'Strong Outdoor'	: 'images/movies/playbackStatic_warmWhiteOutdoor.png',	
						'Colors'		: 'images/movies/playbackStatic_wildColors.png',
						'All Off'		: 'images/movies/playbackStatic_allOff.png'
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
