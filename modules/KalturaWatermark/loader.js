// Scope everything in "mw" ( keeps the global namespace clean ) 
( function( mw ) {
	
	mw.addResourcePaths({
		"mw.KalturaWatermark" : "mw.KalturaWatermark.js" 
	});
	
	// Bind the KalturaWatermark where the uiconf includes the Kaltura Watermark 
	$j( mw ).bind( 'newEmbedPlayerEvent', function( event, embedPlayer ){
		$j( embedPlayer ).bind( 'KalturaSupport.checkUiConf', function( event, $uiConf, callback ){
		
			// Check if the ui conf includes watermark
			if( $j( $uiConf ).find( 'watermark' ).length ){
				// Wait for the player to be ready 
				$j( embedPlayer ).bind( 'playerReady', function(){
					// Load the watermark plugin code
					mw.load( 'mw.KalturaWatermark', function(){
						// Draw the watermark to the player 
						mw.KalturaWatermark.draw( $uiConf.find( 'watermark' ), embedPlayer );
					})
				})
			}
			// Continue trigger event regardless of if ui-conf is found or not
			callback();
		});
	});
	
} )( window.mw );