
// Returns a random integer between min and max
function rand_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Returns n seconds in milliseconds.
function seconds(n) {
    return n * 1000;
}

// Simple right turn.
function turn_right(n) {
    misty.DriveTime(0, -50, seconds(n));    
}

// Simple left turn.
function turn_left(n) {
    misty.DriveTime(0, 50, seconds(n));
}

// Simple drive forward for n seconds.
function drive_forward(n) {
    misty.DriveTime(20, 0, seconds(n));
}

function drive_reverse(n) {
    misty.DriveTime(-20, 0, seconds(n));
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

function drive_normal(n) {
    
    // restore expression and LED.
    green_led();
    misty.DisplayImage("e_DefaultContent.jpg");
    
    pause(1);
    // drive forward.
    drive_forward(n);
    pause(1);
    
}

function back_up() {
        
    // Change expression and LED.
    red_led();
    misty.DisplayImage("e_Amazement.jpg");
    
    // back up.
    drive_reverse(3);
    pause(2);
    turn_right(2);

    // turn either left or right.
    // let random_dir = rand_int(0, 2);
    // if (random_dir == 0)
    //    turn_left();
    // else
    //    turn_right();
}

// The do_action function performs a random personality event.
function do_action() {

    misty.Debug("Inside do_action()...");
    
    // I don't know how to use hash tables or maps in Javascript yet, so do it a crude way!
    let events = ["arms", "head", "sound"];
    let rand_event = events[rand_int(0, events.length)];
    
    switch(rand_event) {

    case "sound":
        random_happy_sound();
        break;
    case "arms":
        random_arms();
        break;
    case "head":
        random_head();
        break;
    case "led":
        random_led();
        break;
    case "nothing":
        break;
    default:
        break;
    }

    pause(1);

}

function register_bumps() {

    // Return data when a bump sensor is pressed
   misty.AddPropertyTest("Bumper", "isContacted", "==", true, "boolean");
   // Return the sensorName property of BumpSensor events.
   misty.AddReturnProperty("Bumper", "sensorName");
   // Register for BumpSensor events
   misty.RegisterEvent("Bumper", "BumpSensor", 200, true);
    
}

function _Bumper(data) {
    // Store the name of the touched sensor
    let sensorName = data.AdditionalResults[0];

    // Play a different audio clip when
    // each sensor is pressed
    switch (sensorName) {

        case "Bump_FrontRight":
            misty.Debug("front right bump sensor pressed")
            random_bad_sound();
            back_up();
            break

        case "Bump_FrontLeft":
            misty.Debug("front left bump sensor pressed")
            random_bad_sound();
            back_up();
            break

        case "Bump_RearRight":
            misty.Debug("rear right bump sensor pressed")
            misty.PlayAudio("ls_danger.wav", 75);
            drive_forward(2);
            break

        case "Bump_RearLeft":
            misty.Debug("rear left bump sensor pressed")
            misty.PlayAudio("ls_danger.wav", 75);
            drive_forward(2);
            break
    }   
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

// pitch: up/down
function move_head_pitch(angle, velocity) {
		misty.MoveHeadDegrees(angle, 0, 0, velocity);
}

// yaw: left/right
function move_head_yaw(angle, velocity) {
		misty.MoveHeadDegrees(0, 0, angle, velocity);
}

// roll: tilt left, tilt right
function move_head_roll(angle, velocity) {
		misty.MoveHeadDegrees(0, angle, 0, velocity);
}

function pan_head_left(velocity) {
		move_head_yaw(30, velocity); 
}

function pan_head_right(velocity) {
		move_head_yaw(-30, velocity); 
}

function pan_head_up(velocity) {
		move_head_pitch(-10, 80);
}

var pan_head = function(current_state) {
		var new_state = "";
		
		switch(current_state) {

    case "forward":
				pan_head_left(75);
				new_state = "left";
        break;

    case "left":
				pan_head_up(80);
				pan_head_right(75);
				new_state = "right";
        break;

    case "right":
				pan_head_up(80);
				pan_head_left(75);
				new_state = "left";
        break;

    default:
				random_bad_sound();
        break;
    }

		return new_state;
}

// Main
misty.Debug("Starting Head pan skill...");

pan_head_up(80);
current_dir = "forward"
while(1) {
		random_happy_sound();
		random_arms();
		pause(10);
		current_dir = pan_head(current_dir)
}




