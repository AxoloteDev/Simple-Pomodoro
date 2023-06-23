// DOM access
const body = document.querySelector("body");

const header = document.querySelector("#header");
const main = document.querySelector("#main");

const title = document.querySelector("#title");

const config = document.querySelector("#config");
const settings = document.querySelector("#settings");
const closeX = document.querySelector("#closeX");

const inputFocosMinutes = document.querySelector("#inputFMinutes");
const inputFocosSeconds = document.querySelector("#inputFSeconds");
const inputBreakMinutes = document.querySelector("#inputBMinutes");
const inputBreakSeconds = document.querySelector("#inputBSeconds");
const inputLongBreakMinutes = document.querySelector("#inputLBMinutes");
const inputLongBreakSeconds = document.querySelector("#inputLBSeconds");

const saveButton = document.querySelector("#save");

const sound = document.querySelector("#sound");

const pomodoroDisplay = document.querySelector("#pomodoro");
const time = document.querySelector("#timer");
const displayState = document.querySelector("#state");

const buttons = document.querySelector("#buttons");

const action = document.querySelector("#button");
const actionText = document.querySelector("#buttonText");
const actionImg = document.querySelector("#buttonImg");

const reStart = document.querySelector("#restart");

const audio = document.querySelector("#audio");

const pageTitle = document.querySelector("#pageTitle");

// pomodoro state
let state = "focus";

// pomodoro count
let pomodoro = 1;

// Variable that controls the pomodoro timer
let timer = undefined;

// time of focus state

inputFocosSeconds.value = 3;
inputFocosMinutes.value = 0;

let focusSeconds = parseInt(inputFocosSeconds.value);
let focusMinutes = parseInt(inputFocosMinutes.value);

// time of short break state

inputBreakSeconds.value = 3;
inputBreakMinutes.value = 0;

let shortBreakSeconds = parseInt(inputBreakSeconds.value);
let shortBreakMinutes = parseInt(inputBreakMinutes.value);

// time of long break state

inputLongBreakSeconds.value = 5;
inputLongBreakMinutes.value = 0;

let longBreakSeconds = parseInt(inputLongBreakSeconds.value);
let longBreakMinutes = parseInt(inputLongBreakMinutes.value);

// display pomodoro´s count on screen
pomodoroDisplay.innerHTML = `<strong>${pomodoro}°</strong> Pomodoro`;

// create a Clock object
class Clock {
	// start pomodoro focus state
	iniciateFocus() {
		// the timer variable receives a new interval as a value that activates the pomodoroFocus method every 1 second
		timer = setInterval(this.pomodoroFocus, 1000);
	}

	// method that make pomodoro focus work
	pomodoroFocus() {
		// If seconds equal zero and minutes greater than zero
		if (focusSeconds === 0 && focusMinutes >= 0) {
			// Decreases a number of 'focusMinutes'
			focusMinutes--;
			// 'focusSeconds' egual a 60
			focusSeconds = 60;
		}

		// decreases a number of the variable 'focusSeconds'
		focusSeconds--;

		if (focusSeconds === 0 && focusMinutes === 0) {
			state = "shortBreak";
			shortBreakMinutes = parseInt(inputBreakMinutes.value);
			shortBreakSeconds = parseInt(inputBreakSeconds.value);
			focusMinutes = shortBreakMinutes;
			focusSeconds = shortBreakSeconds;
			changeColors();
			actionText.innerHTML = "Pronto!";
			actionText.style.bottom = "0px";
			actionImg.removeAttribute("src");
			clearInterval(timer, 1000);
			if (pomodoro === 4) {
				state = "longBreak";
				longBreakMinutes = parseInt(inputLongBreakMinutes.value);
				longBreakSeconds = parseInt(inputLongBreakSeconds.value);
				focusMinutes = longBreakMinutes;
				focusSeconds = longBreakSeconds;
				changeColors();
				actionText.innerHTML = "Pronto!";
				actionImg.removeAttribute("src");
				actionText.style.bottom = "0px";
				clearInterval(timer, 1000);
			}
		}

		// Display focus formatted time (if focusMinutes is less than zero, add a zero in front of minutes. if not, do not add anything)
		time.innerHTML = `${(focusMinutes < 10 ? "0" : "") + focusMinutes}:${
			// (if focusSeconds is less than zero, add a zero in front of seconds. if not, do not add anything)
			(focusSeconds < 10 ? "0" : "") + focusSeconds
		}`;

		// Display focus formatted time (if focusMinutes is less than zero, add a zero in front of minutes. if not, do not add anything)
		pageTitle.innerHTML = `Foco - ${
			(focusMinutes < 10 ? "0" : "") + focusMinutes
		}:${
			// (if focusSeconds is less than zero, add a zero in front of seconds. if not, do not add anything)
			(focusSeconds < 10 ? "0" : "") + focusSeconds
		}`;

		// if action has class 'active'
		if (action.classList.contains("active")) {
			// the action HTMl = "Pausar"
			actionText.innerHTML = "Pausar";
			actionText.style.bottom = "4px";
			actionImg.setAttribute("src", "/imgs/pausa.png");
			// remove class 'active' from action
			action.classList.remove("active");
		}
	}

	iniciateShortBreak() {
		timer = setInterval(this.pomodoroShortBreak, 1000);
	}

	pomodoroShortBreak() {
		if (shortBreakSeconds === 0 && shortBreakMinutes >= 0) {
			// Decreases a number of 'focusMinutes'
			shortBreakMinutes--;
			// 'focusSeconds' egual a 60
			shortBreakSeconds = 60;
		}

		// decreases a number of the variable 'focusSeconds'
		shortBreakSeconds--;

		if (shortBreakSeconds === 0 && shortBreakMinutes === 0) {
			state = "focus";
			focusMinutes = parseInt(inputFocosMinutes.value);
			focusSeconds = parseInt(inputFocosSeconds.value);
			shortBreakMinutes = focusMinutes;
			shortBreakSeconds = focusSeconds;
			changeColors();
			clock.updatePomodoro();
			actionText.innerHTML = "Pronto!";
			actionImg.removeAttribute("src");
			actionText.style.bottom = "0px";
			clearInterval(timer, 1000);
		}

		time.innerHTML = `${
			(shortBreakMinutes < 10 ? "0" : "") + shortBreakMinutes
		}:${
			// (if focusSeconds is less than zero, add a zero in front of seconds. if not, do not add anything)
			(shortBreakSeconds < 10 ? "0" : "") + shortBreakSeconds
		}`;

		pageTitle.innerHTML = `Pausa - ${
			(shortBreakMinutes < 10 ? "0" : "") + shortBreakMinutes
		}:${
			// (if focusSeconds is less than zero, add a zero in front of seconds. if not, do not add anything)
			(shortBreakSeconds < 10 ? "0" : "") + shortBreakSeconds
		}`;

		// if action has class 'active'
		if (action.classList.contains("active")) {
			// the action HTMl = "Pausar"
			actionText.innerHTML = "Pausar";
			actionText.style.bottom = "4px";
			actionImg.setAttribute("src", "/imgs/pausa.png");
			// remove class 'active' from action
			action.classList.remove("active");
		}
	}

	iniciateLongBreak() {
		timer = setInterval(this.pomodoroLongBreak, 1000);
	}

	pomodoroLongBreak() {
		if (longBreakSeconds === 0 && longBreakMinutes > 0) {
			// Decreases a number of 'focusMinutes'
			longBreakMinutes--;
			// 'focusSeconds' egual a 60
			longBreakSeconds = 60;
		}

		longBreakSeconds--;

		if (longBreakSeconds === 0 && longBreakMinutes === 0) {
			state = 'focus'
			focusMinutes = parseInt(inputFocosMinutes.value);
			focusSeconds = parseInt(inputFocosSeconds.value);
			longBreakMinutes = focusMinutes;
			longBreakSeconds = focusSeconds;
			changeColors();
			pomodoro = 1;
			pomodoroDisplay.innerHTML = `<strong>${pomodoro}°</strong> Pomodoro`;
			actionText.innerHTML = "Pronto!";
			actionText.style.bottom = "0px";
			actionImg.removeAttribute("src");
			clearInterval(timer, 1000);
		}

		time.innerHTML = `${(longBreakMinutes < 10 ? "0" : "") + longBreakMinutes}:${
			// (if focusSeconds is less than zero, add a zero in front of seconds. if not, do not add anything)
			(longBreakSeconds < 10 ? "0" : "") + longBreakSeconds
		}`;

		pageTitle.innerHTML = `Descanso - ${
			(longBreakMinutes < 10 ? "0" : "") + longBreakMinutes
		}:${
			// (if focusSeconds is less than zero, add a zero in front of seconds. if not, do not add anything)
			(longBreakSeconds < 10 ? "0" : "") + longBreakSeconds
		}`;

		// if action has class 'active'
		if (action.classList.contains("active")) {
			// the action HTMl = "Pausar"
			actionText.innerHTML = "Pausar";
			actionText.style.bottom = "4px";
			actionImg.setAttribute("src", "/imgs/pausa.png");
			// remove class 'active' from action
			action.classList.remove("active");
		}
	}

	updatePomodoro() {
		pomodoro++;
		pomodoroDisplay.innerHTML = `<strong>${pomodoro}°</strong> Pomodoro`;
	}

	// method responsible for clearing the timer value
	pause() {
		clearInterval(timer, 1000);
	}

	reStart() {
		clearInterval(timer, 1000);
		switch (state) {
			case "focus":
				focusMinutes = parseInt(inputFocosMinutes.value);
				focusSeconds = parseInt(inputFocosSeconds.value);
				time.innerHTML = `${(focusMinutes < 10 ? "0" : "") + focusMinutes}:${
					// (if focusSeconds is less than zero, add a zero in front of seconds. if not, do not add anything)
					(focusSeconds < 10 ? "0" : "") + focusSeconds
				}`;
				actionText.innerHTML = "Iniciar";
				actionText.style.bottom = "4px";
				actionImg.setAttribute("src", "/imgs/play2.png");
				action.classList.add("active");
				break;
			case "shortBreak":
				shortBreakMinutes = parseInt(inputBreakMinutes.value);
				shortBreakSeconds = parseInt(inputBreakSeconds.value);
				time.innerHTML = `${
					(shortBreakMinutes < 10 ? "0" : "") + shortBreakMinutes
				}:${
					// (if focusSeconds is less than zero, add a zero in front of seconds. if not, do not add anything)
					(shortBreakSeconds < 10 ? "0" : "") + shortBreakSeconds
				}`;
				actionText.innerHTML = "Iniciar";
				actionText.style.bottom = "4px";
				actionImg.setAttribute("src", "/imgs/play2.png");
				action.classList.add("active");
				break;
			case "longBreak":
				longBreakMinutes = parseInt(inputLongBreakMinutes.value);
				longBreakSeconds = parseInt(inputLongBreakSeconds.value);
				time.innerHTML = `${
					(longBreakMinutes < 10 ? "0" : "") + longBreakMinutes
				}:${
					// (if focusSeconds is less than zero, add a zero in front of seconds. if not, do not add anything)
					(longBreakSeconds < 10 ? "0" : "") + longBreakSeconds
				}`;
				actionText.innerHTML = "Iniciar";
				actionText.style.bottom = "4px";
				actionImg.setAttribute("src", "/imgs/play2.png");
				action.classList.add("active");
				break;
		}
	}

	mute() {
		sound.classList.remove("sounding");
		sound.setAttribute("src", "/imgs/volume2.png");
	}

	sound() {
		sound.classList.add("sounding");
		sound.setAttribute("src", "/imgs/aumentar-o-volume(1).png");
	}

	openConfig() {
		settings.style.display = "flex";
		main.style.filter = "blur(5px)";
		header.style.filter = "blur(5px)";
		clock.pause();
	}

	closeConfig() {
		settings.style.display = "none";
		main.style.filter = "blur(0px)";
		header.style.filter = "blur(0px)";
		actionText.innerHTML = "Iniciar";
		actionText.style.bottom = "4px";
		actionImg.setAttribute("src", "/imgs/play2.png");
		action.classList.add("active");
	}

	save() {
		inputFocosMinutes.value;
		inputFocosSeconds.value;
		clock.reStart();
		clock.closeConfig();
	}
}

// const to access the Clock class
const clock = new Clock();

// add class "active" to action button
action.classList.add("active");

// add a click event on action that call isPause() function
action.addEventListener("click", isPause);

// function that determines when the timer is paused
function isPause() {
	// if action has the class 'active'
	if (action.classList.contains("active")) {
		// call the iniciate state method
		switch (state) {
			case "focus":
				clock.iniciateFocus();
				break;
			case "shortBreak":
				clock.iniciateShortBreak();
				break;
			case "longBreak":
				clock.iniciateLongBreak();
				break;
		}
		// else not
	} else {
		// action changes the html to "Iniciar"
		actionText.innerHTML = "Iniciar";
		actionText.style.bottom = "4px";
		actionImg.setAttribute("src", "/imgs/play2.png");
		// call the pause method
		clock.pause();
		// add the 'active' class in the action again
		action.classList.add("active");
	}
}

reStart.addEventListener("click", clock.reStart);

sound.classList.add("sounding");

sound.addEventListener("click", isSounding);

function isSounding() {
	if (sound.classList.contains("sounding")) {
		clock.mute();
	} else {
		clock.sound();
	}
}

// function that play the audio
function playAudio() {
	if (sound.classList.contains("sounding")) {
		audio.play();
	}
}

config.addEventListener("click", clock.openConfig);

closeX.addEventListener("click", clock.closeConfig);

saveButton.addEventListener("click", clock.save);

// Change all color
function changeColors() {
	// Switch pomodoro states
	switch (state) {
		// On Focus
		case (state = "focus"):
			body.style.backgroundColor = "#fb3628";

			// Call playAudio() function
			playAudio();

			title.setAttribute("src", "/imgs/titulo.png");

			document.documentElement.style.setProperty("--primaryColor", "#771414");

			document.documentElement.style.setProperty("--shadowColor", "#b00c02c2");

			document.documentElement.style.setProperty("--hoverColor", "#771414cd");

			// by default display focus time on screen (if focusMinutes is less than zero, add a zero in front of minutes. if not, do not add anything)
			time.innerHTML = `${
				(parseInt(inputFocosMinutes.value) < 10 ? "0" : "") +
				parseInt(inputFocosMinutes.value)
			}:${
				// (if focusSeconds is less than zero, add a zero in front of seconds. if not, do not add anything)
				(parseInt(inputFocosSeconds.value) < 10 ? "0" : "") +
				parseInt(inputFocosSeconds.value)
			}`;

			displayState.innerHTML = "Foco";

			break;
		// On Short Break
		case (state = "shortBreak"):
			body.style.backgroundColor = "#358528";

			body.style.transition = "all 0.3s";

			// Call playAudio() function
			playAudio();

			title.setAttribute("src", "/imgs/titulo2.png");

			document.documentElement.style.setProperty("--primaryColor", "#22531A");

			document.documentElement.style.setProperty("--shadowColor", "#1c5513bc");

			document.documentElement.style.setProperty("--hoverColor", "#22531Acd");

			displayState.innerHTML = "Pausa";

			break;
		case (state = "longBreak"):
			body.style.backgroundColor = "#32307D";

			body.style.transition = "all 0.3s";

			// Call playAudio() function
			playAudio();

			title.setAttribute("src", "/imgs/titulo3.png");

			document.documentElement.style.setProperty("--primaryColor", "#292867");

			document.documentElement.style.setProperty("--shadowColor", "#1B1966");

			document.documentElement.style.setProperty("--hoverColor", "#292867cd");

			displayState.innerHTML = "Descanso";

			break;
		default:
			console.log(`Ocorreu um Erro no estado atual. state igual a ${state}`);
			break;
	}
}

// call changeColors() to change background color
changeColors();
