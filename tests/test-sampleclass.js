module ("SampleClass", { setup: SampleClass_setup, teardown: SampleClass_teardown });
test( "SampleClass.method", SampleClass_method );

// Setup something before all tests run
function SampleClass_setup () { }

// Teardown things after each test
function SampleClass_teardown () { }

function SampleClass_method () {
	equal ( true, true );
}
