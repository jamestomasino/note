var tinyMCE;

$(document).ready( function(){
	tinyMCE.baseURL = "assets/";
	tinymce.init({
		selector: "textarea#note_content",
		plugins: "fullscreen",
		menubar: false,
		statusbar: false,
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

	$(window).trigger('resize'); // Fix display bug in tinymce fullscreen
	var html = store.get( 'localnote' );
	if (html) inst.setContent(html);

}

function saveData () {
	var html = tinyMCE.get('note_content').getContent();
	if (html) {
		store.set ( 'localnote', html );
	}
}
