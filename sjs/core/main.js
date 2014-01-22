var tinyMCE;

$(document).ready( function(){
	tinyMCE.baseURL = "assets/";
	tinymce.init({
		selector: "textarea#note_content",
		plugins: "fullscreen",
		init_instance_callback : "initInstance",
		setup : function(ed) {
			ed.on('change', function(e) {
				var html = ed.getContent();
				store.set ( 'localnote', html );
			});
		}
	});

	window.onbeforeunload = function (evt) { saveData(); };
});

function initInstance(inst) {
    if(inst.editorId != 'mce_fullscreen') inst.execCommand('mceFullScreen');

	var html = store.get( 'localnote' );
	if (html) inst.setContent(html);

}

function saveData () {
	var html = tinyMCE.get('note_content').getContent();
	if (html) {
		store.set ( 'localnote', html );
	}
}
