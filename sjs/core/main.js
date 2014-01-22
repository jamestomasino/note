$(document).ready( function(){

	$('#redactor_content').redactor({
        focus: true,
        buttonsAdd: ['|', 'fork'],
        buttonsCustom: {
            fork: {
                title: 'Fork Note on GitHub',
                callback: function() {
					window.open( 'https://github.com/jamestomasino/note', '_blank' );
                }
            }
        }
    });

	$('#redactor_content').redactor({
		focus: true,
		keyupCallback: saveData,
		execCommandCallback: saveData
	});


	var html = store.get( 'localnote' );
	if (html) $('#redactor_content').setCode(html);

	window.onbeforeunload = function (evt) { saveData(); };
});

function saveData () {
	var html = $('#redactor_content').getCode();
	store.set ( 'localnote', html );
}
