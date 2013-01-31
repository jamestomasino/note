//= require lib/jquery-1.8.2
//= require lib/redactor.min
//= require lib/store

$(document).ready( function(){
	$('#redactor_content').redactor({focus: true, keyupCallback: keyUpHandler});
	var html = store.get( 'localnote' );
	if (html) {
		$('#redactor_content').setCode(html);
	}
});

function keyUpHandler ( obj, evt ) {
	var html = $('#redactor_content').getCode();
	store.set ( 'localnote', html );
}
