//= require lib/jquery-1.8.2
//= require lib/redactor.min
//= require lib/store

$(document).ready( function(){
	$('#redactor_content').redactor({
		focus: true,
		keyupCallback: saveData,
		execCommandCallback: saveData
	});

	var html = store.get( 'localnote' );
	if (html) $('#redactor_content').setCode(html);

	window.onbeforeunload = function (evt) { saveData(); }
});

function saveData () {
	var html = $('#redactor_content').getCode();
	store.set ( 'localnote', html );
}
