$(document).ready(function() {
	$("#preset_reset_button").on('click', function(){
		areaSel = fitting_areaDefault;
		luminaireSel = fitting_luminaireDefault; //resetSelection(luminaires, '#preset_luminaire_select', fitting_luminaireDefault); 
		beamAngleSel = fitting_beamAngleDefault; //resetSelection(beamAngles, '#preset_beamangle_select', fitting_beamAngleDefault);
		switch (shopStyleSel) {
			case 'ClassicX':	//luminaireSel = resetSelection(luminaires, '#preset_luminaire_select', fitting_classic_luminaireDefault); 
								//beamAngleSel = resetSelection(beamAngles, '#preset_beamangle_select', fitting_classic_beamAngleDefault);
								colorTemperatureSel = resetSelection(colorTemperatures, '#preset_colortemperature_select', fitting_classic_colorTemperatureDefault);
								accentLightSel = resetSelection(accentLights, '#preset_accentlight_select', fitting_classic_accentLightDefault);
								break;
			case 'WhiteX':		//luminaireSel = resetSelection(luminaires, '#preset_luminaire_select', fitting_white_luminaireDefault); 
								//beamAngleSel = resetSelection(beamAngles, '#preset_beamangle_select', fitting_white_beamAngleDefault);
								colorTemperatureSel = resetSelection(colorTemperatures, '#preset_colortemperature_select', fitting_white_colorTemperatureDefault);
								accentLightSel = resetSelection(accentLights, '#preset_accentlight_select', fitting_white_accentLightDefault);
								break;
			case 'RawX':		//luminaireSel = resetSelection(luminaires, '#preset_luminaire_select', fitting_raw_luminaireDefault); 
								//beamAngleSel = resetSelection(beamAngles, '#preset_beamangle_select', fitting_raw_beamAngleDefault);
								colorTemperatureSel = resetSelection(colorTemperatures, '#preset_colortemperature_select', fitting_raw_colorTemperatureDefault);
								accentLightSel = resetSelection(accentLights, '#preset_accentlight_select', fitting_raw_accentLightDefault);
								break;
		}								
		
		changeMainImage();	
	});

	// Initial click the Reset button
	shopStyleSel = resetSelection(shopStyles, '#preset_shopstyle_select', fitting_shopStyleDefault);
	$('#preset_reset_button').click();
	
});
