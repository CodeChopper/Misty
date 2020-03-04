
// Returns a random integer between min and max
function rand_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Returns n seconds in milliseconds.
function seconds(n) {
		return n * 1000;
}

function pause(n) {
		misty.Pause(n*1000);
}

// Commands to change LED colors.

function red_led() {
		misty.ChangeLED(255, 0, 0); //red
}

function green_led() {
		misty.ChangeLED(0, 255, 0); // green
}

function blue_led() {
		misty.ChangeLED(0, 0, 255); // blue
}

function random_led() {
		misty.ChangeLED(rand_int(0, 255),
										rand_int(0, 255),
										rand_int(0, 255));
}

function random_head() {

		// Moves Misty's head to a random position. Adjust the min/max
    // values passed into rand_int() to change Misty's range of
    // motion when she calls this method.
		
    misty.MoveHeadDegrees(
				rand_int(-20, 20), // Random pitch position between -40 and 20
				rand_int(-20, 20), // Random roll position between -30 and 30
				rand_int(-20, 20), // Random yaw position between -40 and 40
				90); // Head movement velocity. Can increase up to 100.
}

function random_arms() {
		misty.MoveArmDegrees("right", rand_int(-25, 25), 70);
		pause(1);
		misty.MoveArmDegrees("left", rand_int(-25, 25), 70);
}

function random_happy_sound() {

		// define some happy sounds.
		let sounds = ["s_Acceptance.wav",
									"s_Awe.wav",
									"s_Ecstacy2.wav",
									"s_Joy.wav",
									"s_Joy2.wav",
									"s_Joy3.wav",
									"s_Joy4.wav",
									"s_Love.wav"];
				
		// get random sound.
		let i = rand_int(0, sounds.length);
		misty.Debug(sounds[i]);
		misty.PlayAudio(sounds[i]);
		
}

function random_bad_sound() {

		// define some bad/angry sounds.		
		let sounds = ["s_PhraseOopsy.wav",
									"s_DisorientedConfused.wav",
									"s_DisorientedConfused4.wav",
									"s_Disapproval.wav",
									"s_Anger.wav",
									"s_Fear.wav"];

		// get random sound.
		let i = rand_int(0, sounds.length);
		misty.Debug(sounds[i]);
		misty.PlayAudio(sounds[i]);
		
}

function _Chin(data) {
    // Store the name of the touched sensor
    let sensorName = data.AdditionalResults[0];

    // Check for first bumper press before starting real skill.
    switch (sensorName) {
    case "CapTouch_Chin":
        misty.Debug("Starting roam algorithm!");
				main_loop();
        break
    }		
}

function register_chin() {

		// Return data when a bump sensor is pressed
   misty.AddPropertyTest("Chin", "isContacted", "==", true, "boolean");
   // Return the sensorName property of BumpSensor events.
   misty.AddReturnProperty("Chin", "sensorName");
   // Register for BumpSensor events
   misty.RegisterEvent("Chin", "TouchSensor", 200, false);
}		

function main_loop() {
		while(1) {
				pause(1);
		}
}

function _TakePicture() {
		random_happy_sound();
		misty.DisplayImage("phototest.jpg");
}

// Main

misty.Debug("Starting Photo One Skill...");
blue_led();
// register_chin();
// Plays Misty's her camera shutter sound at 100% of max volume. This
// sound is one of Misty's default system audio files.
misty.PlayAudio("s_SystemCameraShutter.wav", 100);

// Takes a picture and saves it to filename.
// Sets the width of the picture to 375 and the height to 812. The
// first boolean argument tells Misty to save the picture, and the
// second tells Misty to show the picture on her display as soon as
// it's been saved to her local storage.
misty.TakePicture(false, "phototest.jpg", 4160, 3120, true, true);







