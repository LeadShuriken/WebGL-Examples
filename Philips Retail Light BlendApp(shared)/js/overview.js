$(document).ready(function() {
	$("#preset_reset_button").on('click', function(){
		areaSel = overview_areaDefault;

		// limit Accent Light selection for Classic or Raw is selected
		if (shopStyleSel == 'ClassicX' || shopStyleSel == 'RawX') {
			accentLightSel = resetSelection(accentLights, '#preset_accentlight_select', '00');
			$('#preset_accentlight_select').attr('disabled','disabled');			
		} else {
			$('#preset_accentlight_select').attr('disabled', false);
		}

		switch (shopStyleSel) {
			case 'ClassicX':	luminaireSel = resetSelection(luminaires, '#preset_luminaire_select', overview_classic_luminaireDefault); 
								beamAngleSel = resetSelection(beamAngles, '#preset_beamangle_select', overview_classic_beamAngleDefault);
								colorTemperatureSel = resetSelection(colorTemperatures, '#preset_colortemperature_select', overview_classic_colorTemperatureDefault);
								accentLightSel = resetSelection(accentLights, '#preset_accentlight_select', overview_classic_accentLightDefault);
								break;
			case 'WhiteX':		luminaireSel = resetSelection(luminaires, '#preset_luminaire_select', overview_white_luminaireDefault); 
								beamAngleSel = resetSelection(beamAngles, '#preset_beamangle_select', overview_white_beamAngleDefault);
								colorTemperatureSel = resetSelection(colorTemperatures, '#preset_colortemperature_select', overview_white_colorTemperatureDefault);
								accentLightSel = resetSelection(accentLights, '#preset_accentlight_select', overview_white_accentLightDefault);
								break;
			case 'RawX':		luminaireSel = resetSelection(luminaires, '#preset_luminaire_select', overview_raw_luminaireDefault); 
								beamAngleSel = resetSelection(beamAngles, '#preset_beamangle_select', overview_raw_beamAngleDefault);
								colorTemperatureSel = resetSelection(colorTemperatures, '#preset_colortemperature_select', overview_raw_colorTemperatureDefault);
								accentLightSel = resetSelection(accentLights, '#preset_accentlight_select', overview_raw_accentLightDefault);
								break;
		}								
		
		changeMainImage();	
	});

	// Initial click the Reset button
	shopStyleSel = resetSelection(shopStyles, '#preset_shopstyle_select', overview_shopStyleDefault);
	$('#preset_reset_button').click();
});