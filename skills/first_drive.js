
//
// misty.DriveTime(linear_velocity, angular velocity, milliseconds)
//
// Angular velocity determines the speed and direction of Misty's rotation.
// between [-100, 100]: -100 full speed rotation clockwise (right)
//                       100 full speed rotation counter-clockwise (left)
//
//


// Returns a random integer between min and max
function rand_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Returns n seconds in milliseconds.
function seconds(n) {
		return n * 1000;
}

// Simple right turn.
function turn_right() {
		misty.DriveTime(0, -50, seconds(3));		
}

// Simple left turn.
function turn_left() {
		misty.DriveTime(0, 50, seconds(3));
}

// Simple drive forward for n seconds.
function drive_forward(n) {
		misty.DriveTime(10, 0, seconds(n));
}

function drive_reverse(n) {
		misty.DriveTime(-10, 0, seconds(n));
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
				75); // Head movement velocity. Can increase up to 100.
}

function random_arms() {
		misty.MoveArmDegrees("right", rand_int(-25, 25), 50);
		misty.MoveArmDegrees("left", rand_int(-25, 25), 50);
}

function random_happy_sound() {
		
		// define some happy sounds to play while driving around.
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

function drive_normal(n) {
		
		// restore expression and LED.
		green_led();
		misty.DisplayImage("e_DefaultContent.jpg");
		
		pause();
		// drive forward.
		drive_forward(n);
		pause();
		
}

function back_up() {

		// define some bad sounds to play before backing up.
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
		pause();
				
		// Change expression and LED.
		red_led();
		misty.DisplayImage("e_Amazement.jpg");
		
		// back up.
		misty.Debug("Attempting to back up!");
		pause();
		drive_reverse(2);

		pause();
		// turn either left or right.
		let random_dir = rand_int(0, 2);
		if (random_dir == 0)
				turn_left();
		else
				turn_right();
}

function _detected_obstacle() {
		misty.PlayAudio("s_Disapproval.wav");
		misty.
		register_TOF_detect();
}

function register_TOF() {
		misty.Debug("registering TOF...");
		// Register for TimeOfFlight data and add property tests
		misty.AddPropertyTest("front_TOF", "SensorPosition", "==", "Center", "string");
		misty.AddPropertyTest("front_TOF", "DistanceInMeters", "<=", 0.1, "double");
		misty.RegisterEvent("detected_obstacle", "TimeOfFlight", 250);
		register_TOF();
}



// Main starts here.

misty.Debug("starting skill first drive!");
register_TOF();

// misty.Debug("starting drive!");
// for(i = 0; i < 8; i++) {
//		drive_normal(1);
//		pause(2);
// }


// Registers for a timer event called do_action, and invokes the
// _do_action() callback after a specified number of seconds.
// misty.RegisterTimerEvent("do_action", seconds(3), true); // set keep alive to true.




