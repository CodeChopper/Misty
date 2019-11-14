
// Print a debug message to indicate the skill has started
misty.Debug("starting skill Cute_Sounds");

// Other sounds.

// s_SystemWakeWord.wav
// s_DisorientedConfused4.wav
// s_Anger.wav
// s_Annoyance3.wav
// s_DisorientedConfused5.wav

// Returns a random integer between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// The look_around timer event invokes this callback function. Change
// the value of repeat to false if Misty should only move her head once.
function _look_around(repeat = true) {

		var sounds = ["s_Awe.wav",
									"s_PhraseUhOh.wav",
									"s_Sadness1.wav",
									"s_Sadness2.wav",
									"s_Sadness3.wav",
									"s_Sadness4.wav"]
				
		// get random cute sound.
		var i = getRandomInt(0, sounds.length);
		misty.Debug(sounds[i]);
		misty.PlayAudio(sounds[i]);
		
    // Moves Misty's head to a random position. Adjust the min/max
    // values passed into getRandomInt() to change Misty's range of
    // motion when she calls this method.
    misty.MoveHeadDegrees(
        getRandomInt(-40, 20), // Random pitch position between -40 and 20
        getRandomInt(-30, 30), // Random roll position between -30 and 30
        getRandomInt(-40, 40), // Random yaw position between -40 and 40
        30); // Head movement velocity. Can increase up to 100.

        // If repeat is set to true, re-registers for the look_around
        // timer event, and Misty moves her head until the skill ends.
        if (repeat) misty.RegisterTimerEvent(
        "look_around",
        getRandomInt(5, 10) * 1000,
						false);
}

// Registers for a timer event  called look_around, and invokes the
// _look_around() callback after 5000 - 10000 milliseconds.
misty.RegisterTimerEvent("look_around", getRandomInt(5, 10) * 1000, false);






