( function( $ ) {

	document.addEventListener("deviceready", onDeviceReady, false);

  function onDeviceReady() {

  	// Get device info
    var deviceInfo = 	'Device Name: '     + device.name     + '<br />' +
									    'Device Cordova: '  + device.cordova  + '<br />' +
									    'Device Platform: ' + device.platform + '<br />' +
									    'Device UUID: '     + device.uuid     + '<br />' +
									    'Device Version: '  + device.version  + '<br />';

  	$('#deviceProperties').html(deviceInfo)

  	// Connect
     var pusher = new Pusher('519b9f47571c5d74bf82');

    pusher.connection.bind('state_change', connectionStateChange);
    var channel = pusher.subscribe(device.uuid);
    channel.bind('pusher:subscription_succeeded', subscriptionSucceeded);
    channel.bind('send_sms', handleMyEvent);

    window.sms = new SmsPlugin();

  	function connectionStateChange(state) {
  		$('#connectionStatus').html(state.current);
  	}

  	function subscriptionSucceeded() {
  		$('#subscriptionStatus').html('succeeded');
  	}

  	function handleMyEvent( data ) {
      window.sms.send(data.phone, data.message);
  		$('#myEventData').append('<tr><td>'+data.phone+'</td><td>'+data.message+'</td></tr>');
  	}

  }

} )( jQuery );

Pusher.log = function( msg ) {
	if( window.console && window.console.log ) {
		window.console.log( msg );
	}
};
