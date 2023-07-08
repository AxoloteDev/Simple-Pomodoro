// DOM access
const body = document.querySelector("body");

const header = document.querySelector("#header");
const main = document.querySelector("#main");

const icon = document.querySelector("#pageIcon");

const title = document.querySelector(".title");

const config = document.querySelector("#config");
const settings = document.querySelector("#settings");
const closeX = document.querySelector("#closeX");

const stateDisplay = document.querySelector("#stateDisplay");

const buttonFocus = document.querySelector("#buttonFoco");
const buttonShortBreak = document.querySelector("#buttonShortBreak");
const buttonLongBreak = document.querySelector("#buttonLongBreak");

const currentPomodoro = document.querySelector("#currentPomodoroValue");

const inputFocosMinutes = document.querySelector("#inputFMinutes");
const inputFocosSeconds = document.querySelector("#inputFSeconds");
const inputBreakMinutes = document.querySelector("#inputBMinutes");
const inputBreakSeconds = document.querySelector("#inputBSeconds");
const inputLongBreakMinutes = document.querySelector("#inputLBMinutes");
const inputLongBreakSeconds = document.querySelector("#inputLBSeconds");

const inputPomodoro = document.querySelector("#pomodoroValue");

const notificationInput = document.querySelector("#notificationInput");

const focusColor1 = document.querySelector("#fcolor1");
const focusColor2 = document.querySelector("#fcolor2");
const focusColor3 = document.querySelector("#fcolor3");
const focusColor4 = document.querySelector("#fcolor4");
const focusColor5 = document.querySelector("#fcolor5");
const focusColor6 = document.querySelector("#fcolor6");

const shortBreakColor1 = document.querySelector("#sbcolor1");
const shortBreakColor2 = document.querySelector("#sbcolor2");
const shortBreakColor3 = document.querySelector("#sbcolor3");
const shortBreakColor4 = document.querySelector("#sbcolor4");
const shortBreakColor5 = document.querySelector("#sbcolor5");
const shortBreakColor6 = document.querySelector("#sbcolor6");

const longBreakColor1 = document.querySelector("#lbcolor1");
const longBreakColor2 = document.querySelector("#lbcolor2");
const longBreakColor3 = document.querySelector("#lbcolor3");
const longBreakColor4 = document.querySelector("#lbcolor4");
const longBreakColor5 = document.querySelector("#lbcolor5");
const longBreakColor6 = document.querySelector("#lbcolor6");

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
let pomodoroCount = parseInt((inputPomodoro.value = 4));

currentPomodoro.value = 1;
let pomodoro = parseInt(currentPomodoro.value);

// Variable that controls the pomodoro timer
let timer = undefined;

// time of focus state
inputFocosSeconds.value = 0; // 0
inputFocosMinutes.value = 25; // 25

let focusSeconds = parseInt(inputFocosSeconds.value);
let focusMinutes = parseInt(inputFocosMinutes.value);

// time of short break state
inputBreakSeconds.value = 0; // 0
inputBreakMinutes.value = 5; // 5

let shortBreakSeconds = parseInt(inputBreakSeconds.value);
let shortBreakMinutes = parseInt(inputBreakMinutes.value);

// time of long break state
inputLongBreakSeconds.value = 0; // 0
inputLongBreakMinutes.value = 15; // 15

let longBreakSeconds = parseInt(inputLongBreakSeconds.value);
let longBreakMinutes = parseInt(inputLongBreakMinutes.value);

// state of enable or disable the notification
let notificationState = false;

// default color of each state

let focusBackground = "red";

let shortBreakBackground = "green";

let longBreakBackground = "darkblue";

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
			clock.showNotification();
			clearInterval(timer, 1000);
			if (pomodoro === pomodoroCount) {
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
			icon.setAttribute("href", "/favicon/despertador.ico");
			changeColors();
			clock.updatePomodoro();
			actionText.innerHTML = "Pronto!";
			actionImg.removeAttribute("src");
			actionText.style.bottom = "0px";
			clock.showNotification();
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
			state = "focus";
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
			clock.showNotification();
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
		currentPomodoro.value++;
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

	showNotification() {
		if (notificationState === true) {
			switch (state) {
				case "focus":
					alert("É Hora de Trabalhar!");
					break;
				case "shortBreak" || "longBreak":
					alert("É Hora de Fazer uma Pausa!");
					break;
			}
		} else {
			return console.log("desativado");
		}
	}

	setBackGround() {
		focusColor1.addEventListener("click", () => {
			focusBackground = "red";
			activefColorButton("fcolor1");
		});
		focusColor2.addEventListener("click", () => {
			focusBackground = "green";
			activefColorButton("fcolor2");
		});
		focusColor3.addEventListener("click", () => {
			focusBackground = "darkblue";
			activefColorButton("fcolor3");
		});
		focusColor4.addEventListener("click", () => {
			focusBackground = "pink";
			activefColorButton("fcolor4");
		});
		focusColor5.addEventListener("click", () => {
			focusBackground = "blue";
			activefColorButton("fcolor5");
		});
		focusColor6.addEventListener("click", () => {
			focusBackground = "purple";
			activefColorButton("fcolor6");
		});

		shortBreakColor1.addEventListener("click", () => {
			shortBreakBackground = "red";
			activesbColorButton("sbcolor1");
		});
		shortBreakColor2.addEventListener("click", () => {
			shortBreakBackground = "green";
			activesbColorButton("sbcolor2");
		});
		shortBreakColor3.addEventListener("click", () => {
			shortBreakBackground = "darkblue";
			activesbColorButton("sbcolor3");
		});
		shortBreakColor4.addEventListener("click", () => {
			shortBreakBackground = "pink";
			activesbColorButton("sbcolor4");
		});
		shortBreakColor5.addEventListener("click", () => {
			shortBreakBackground = "blue";
			activesbColorButton("sbcolor5");
		});
		shortBreakColor6.addEventListener("click", () => {
			shortBreakBackground = "purple";
			activesbColorButton("sbcolor6");
		});

		longBreakColor1.addEventListener("click", () => {
			longBreakBackground = "red";
			activelbColorButton("lbcolor1");
		});
		longBreakColor2.addEventListener("click", () => {
			longBreakBackground = "green";
			activelbColorButton("lbcolor2");
		});
		longBreakColor3.addEventListener("click", () => {
			longBreakBackground = "darkblue";
			activelbColorButton("lbcolor3");
		});
		longBreakColor4.addEventListener("click", () => {
			longBreakBackground = "pink";
			activelbColorButton("lbcolor4");
		});
		longBreakColor5.addEventListener("click", () => {
			longBreakBackground = "blue";
			activelbColorButton("lbcolor5");
		});
		longBreakColor6.addEventListener("click", () => {
			longBreakBackground = "purple";
			activelbColorButton("lbcolor6");
		});
	}

	save() {
		// Focus Error Control
		if (parseInt(inputFocosMinutes.value) > 60) {
			inputFocosMinutes.value = 60;
		}
		if (parseInt(inputFocosMinutes.value) < 0) {
			inputFocosMinutes.value = 0;
		}
		if (parseInt(inputFocosSeconds.value) > 60) {
			inputFocosSeconds.value = 60;
		}
		if (parseInt(inputFocosMinutes.value) === 0) {
			if (parseInt(inputFocosSeconds.value) <= 0) {
				inputFocosSeconds.value = 5;
			}
		} else {
			if (parseInt(inputFocosSeconds.value) < 0) {
				inputFocosSeconds.value = 1;
			}
		}
		if (isNaN(parseInt(inputFocosMinutes.value))) {
			inputFocosMinutes.value = 25;
		}
		if (isNaN(parseInt(inputFocosSeconds.value))) {
			inputFocosSeconds.value = 0;
		}
		// ShortBreak Error Control
		if (parseInt(inputBreakMinutes.value) > 60) {
			inputBreakMinutes.value = 60;
		}
		if (parseInt(inputBreakMinutes.value) < 0) {
			inputBreakMinutes.value = 0;
		}
		if (parseInt(inputBreakSeconds.value) > 60) {
			inputBreakSeconds.value = 60;
		}
		if (parseInt(inputBreakMinutes.value) === 0) {
			if (parseInt(inputBreakSeconds.value) <= 0) {
				inputBreakSeconds.value = 5;
			}
		} else {
			if (parseInt(inputBreakSeconds.value) < 0) {
				inputBreakSeconds.value = 1;
			}
		}
		if (isNaN(parseInt(inputBreakMinutes.value))) {
			inputBreakMinutes.value = 5;
		}
		if (isNaN(parseInt(inputBreakSeconds.value))) {
			inputBreakSeconds.value = 0;
		}
		// Long break Error Control
		if (parseInt(inputLongBreakMinutes.value) > 60) {
			inputLongBreakMinutes.value = 60;
		}
		if (parseInt(inputLongBreakMinutes.value) < 0) {
			inputLongBreakMinutes.value = 0;
		}
		if (parseInt(inputLongBreakSeconds.value) > 60) {
			inputLongBreakSeconds.value = 60;
		}
		if (parseInt(inputLongBreakMinutes.value) === 0) {
			if (parseInt(inputLongBreakSeconds.value) <= 0) {
				inputLongBreakSeconds.value = 5;
			}
		} else {
			if (parseInt(inputLongBreakSeconds.value) < 0) {
				inputLongBreakSeconds.value = 1;
			}
		}
		if (isNaN(parseInt(inputLongBreakMinutes.value))) {
			inputLongBreakMinutes.value = 30;
		}
		if (isNaN(parseInt(inputLongBreakSeconds.value))) {
			inputLongBreakSeconds.value = 0;
		}
		// Pomodoro Error Control
		if (parseInt(inputPomodoro.value) > 10) {
			inputPomodoro.value = 10;
		}
		if (parseInt(inputPomodoro.value) < 1) {
			inputPomodoro.value = 1;
		}
		if (isNaN(parseInt(inputPomodoro.value))) {
			inputPomodoro.value = 4;
		}
		if (parseInt(currentPomodoro.value) > parseInt(inputPomodoro.value)) {
			currentPomodoro.value = 1;
		}
		if (parseInt(currentPomodoro.value) < 1) {
			currentPomodoro.value = 1;
		}
		if (isNaN(parseInt(currentPomodoro.value))) {
			currentPomodoro.value = 1;
		}
		// Pomodoro
		pomodoro = parseInt(currentPomodoro.value);
		pomodoroDisplay.innerHTML = `<strong>${pomodoro}°</strong> Pomodoro`;
		pomodoroCount = parseInt(inputPomodoro.value);
		// Change Background
		changeColors();
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

function activeStateButton(id) {
	let buttons = document.getElementsByTagName("button");
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].classList.remove("activeButton");
	}
	let selectButton = document.getElementById(id);
	selectButton.classList.add("activeButton");
}

buttonFocus.addEventListener("click", () => {
	state = buttonFocus.value;
	activeStateButton("buttonFoco");
});

buttonShortBreak.addEventListener("click", () => {
	state = buttonShortBreak.value;
	activeStateButton("buttonShortBreak");
});

buttonLongBreak.addEventListener("click", () => {
	state = buttonLongBreak.value;
	activeStateButton("buttonLongBreak");
});

notificationInput.addEventListener("change", () => {
	if (notificationInput.checked) {
		notificationState = true;
	} else {
		notificationState = false;
	}
});

clock.setBackGround();

function activefColorButton(id) {
	let colors = document.getElementsByTagName("button");
	for (let i = 0; i < colors.length; i++) {
		colors[i].classList.remove("activefColor");
	}
	let selectColor = document.getElementById(id);
	selectColor.classList.add("activefColor");
}

function activesbColorButton(id) {
	let colors = document.getElementsByTagName("button");
	for (let i = 0; i < colors.length; i++) {
		colors[i].classList.remove("activesbColor");
	}
	let selectColor = document.getElementById(id);
	selectColor.classList.add("activesbColor");
}

function activelbColorButton(id) {
	let colors = document.getElementsByTagName("button");
	for (let i = 0; i < colors.length; i++) {
		colors[i].classList.remove("activelbColor");
	}
	let selectColor = document.getElementById(id);
	selectColor.classList.add("activelbColor");
}

saveButton.addEventListener("click", clock.save);

// Change all color
function changeColors() {
	if (state === "focus") {
		stateDisplay.innerHTML = "Foco";
		activeStateButton("buttonFoco");
		switch (focusBackground) {
			case "red":
				body.style.backgroundColor = "#fb3628";

				body.style.transition = "all 0.3s";

				// Call playAudio() function
				playAudio();

				title.setAttribute("src", "/imgs/titulo.png");

				document.documentElement.style.setProperty("--settingsColor", "#cc271b");

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

				icon.setAttribute("href", "/favicon/despertador.ico");

				displayState.innerHTML = "Foco";

				break;

			case "green":
				body.style.backgroundColor = "#358528";

				body.style.transition = "all 0.3s";

				// Call playAudio() function
				playAudio();

				title.setAttribute("src", "/imgs/titulo2.png");

				document.documentElement.style.setProperty("--settingsColor", "#2d7422");

				document.documentElement.style.setProperty("--primaryColor", "#22531A");

				document.documentElement.style.setProperty("--shadowColor", "#1c5513bc");

				document.documentElement.style.setProperty("--hoverColor", "#22531Acd");

				// by default display focus time on screen (if focusMinutes is less than zero, add a zero in front of minutes. if not, do not add anything)
				time.innerHTML = `${
					(parseInt(inputFocosMinutes.value) < 10 ? "0" : "") +
					parseInt(inputFocosMinutes.value)
				}:${
					// (if focusSeconds is less than zero, add a zero in front of seconds. if not, do not add anything)
					(parseInt(inputFocosSeconds.value) < 10 ? "0" : "") +
					parseInt(inputFocosSeconds.value)
				}`;

				icon.setAttribute("href", "/favicon/despertador2.ico");

				displayState.innerHTML = "Foco";
				break;

			case "darkblue":
				body.style.backgroundColor = "#32307D";

				body.style.transition = "all 0.3s";

				// Call playAudio() function
				playAudio();

				title.setAttribute("src", "/imgs/titulo3.png");

				document.documentElement.style.setProperty("--settingsColor", "#302c99");

				document.documentElement.style.setProperty("--primaryColor", "#292867");

				document.documentElement.style.setProperty("--shadowColor", "#1B1966");

				document.documentElement.style.setProperty("--hoverColor", "#292867cd");

				// by default display focus time on screen (if focusMinutes is less than zero, add a zero in front of minutes. if not, do not add anything)
				time.innerHTML = `${
					(parseInt(inputFocosMinutes.value) < 10 ? "0" : "") +
					parseInt(inputFocosMinutes.value)
				}:${
					// (if focusSeconds is less than zero, add a zero in front of seconds. if not, do not add anything)
					(parseInt(inputFocosSeconds.value) < 10 ? "0" : "") +
					parseInt(inputFocosSeconds.value)
				}`;

				icon.setAttribute("href", "/favicon/despertador3.ico");

				displayState.innerHTML = "Foco";
				break;

			case "pink":
				body.style.backgroundColor = "#FE265A";

				body.style.transition = "all 0.3s";

				// Call playAudio() function
				playAudio();

				title.setAttribute("src", "/imgs/titulo4.png");

				document.documentElement.style.setProperty("--settingsColor", "#ed3661");

				document.documentElement.style.setProperty("--primaryColor", "#e00639");

				document.documentElement.style.setProperty("--shadowColor", "#be002c");

				document.documentElement.style.setProperty("--hoverColor", "#D20032cd");

				// by default display focus time on screen (if focusMinutes is less than zero, add a zero in front of minutes. if not, do not add anything)
				time.innerHTML = `${
					(parseInt(inputFocosMinutes.value) < 10 ? "0" : "") +
					parseInt(inputFocosMinutes.value)
				}:${
					// (if focusSeconds is less than zero, add a zero in front of seconds. if not, do not add anything)
					(parseInt(inputFocosSeconds.value) < 10 ? "0" : "") +
					parseInt(inputFocosSeconds.value)
				}`;

				icon.setAttribute("href", "/favicon/despertador4.ico");

				displayState.innerHTML = "Foco";
				break;

			case "blue":
				body.style.backgroundColor = "#29BFFF";

				body.style.transition = "all 0.3s";

				// Call playAudio() function
				playAudio();

				title.setAttribute("src", "/imgs/titulo5.png");

				document.documentElement.style.setProperty("--settingsColor", "#44b7e9");

				document.documentElement.style.setProperty("--primaryColor", "#009EE1");

				document.documentElement.style.setProperty("--shadowColor", "#017fb6");

				document.documentElement.style.setProperty("--hoverColor", "#009EE1cd");

				// by default display focus time on screen (if focusMinutes is less than zero, add a zero in front of minutes. if not, do not add anything)
				time.innerHTML = `${
					(parseInt(inputFocosMinutes.value) < 10 ? "0" : "") +
					parseInt(inputFocosMinutes.value)
				}:${
					// (if focusSeconds is less than zero, add a zero in front of seconds. if not, do not add anything)
					(parseInt(inputFocosSeconds.value) < 10 ? "0" : "") +
					parseInt(inputFocosSeconds.value)
				}`;

				icon.setAttribute("href", "/favicon/despertador5.ico");

				displayState.innerHTML = "Foco";

				break;

			case "purple":
				body.style.backgroundColor = "#5F2CF1";

				body.style.transition = "all 0.3s";

				// Call playAudio() function
				playAudio();

				title.setAttribute("src", "/imgs/titulo6.png");

				document.documentElement.style.setProperty("--settingsColor", "#592bd8");

				document.documentElement.style.setProperty("--primaryColor", "#3D00EB");

				document.documentElement.style.setProperty("--shadowColor", "#4200FF");

				document.documentElement.style.setProperty("--hoverColor", "#3D00EBcd");

				// by default display focus time on screen (if focusMinutes is less than zero, add a zero in front of minutes. if not, do not add anything)
				time.innerHTML = `${
					(parseInt(inputFocosMinutes.value) < 10 ? "0" : "") +
					parseInt(inputFocosMinutes.value)
				}:${
					// (if focusSeconds is less than zero, add a zero in front of seconds. if not, do not add anything)
					(parseInt(inputFocosSeconds.value) < 10 ? "0" : "") +
					parseInt(inputFocosSeconds.value)
				}`;

				icon.setAttribute("href", "/favicon/despertador6.ico");

				displayState.innerHTML = "Foco";

				break;
		}
	}
	if (state === "shortBreak") {
		stateDisplay.innerHTML = "Pausa";
		activeStateButton("buttonShortBreak");
		switch (shortBreakBackground) {
			case "red":
				body.style.backgroundColor = "#fb3628";

				body.style.transition = "all 0.3s";

				// Call playAudio() function
				playAudio();

				title.setAttribute("src", "/imgs/titulo.png");

				document.documentElement.style.setProperty("--settingsColor", "#cc271b");

				document.documentElement.style.setProperty("--primaryColor", "#771414");

				document.documentElement.style.setProperty("--shadowColor", "#b00c02c2");

				document.documentElement.style.setProperty("--hoverColor", "#771414cd");

				displayState.innerHTML = "Pausa";

				icon.setAttribute("href", "/favicon/despertador.ico");

				break;

			case "green":
				body.style.backgroundColor = "#358528";

				body.style.transition = "all 0.3s";

				// Call playAudio() function
				playAudio();

				title.setAttribute("src", "/imgs/titulo2.png");

				document.documentElement.style.setProperty("--settingsColor", "#2d7422");

				document.documentElement.style.setProperty("--primaryColor", "#22531A");

				document.documentElement.style.setProperty("--shadowColor", "#1c5513bc");

				document.documentElement.style.setProperty("--hoverColor", "#22531Acd");

				icon.setAttribute("href", "/favicon/despertador2.ico");

				displayState.innerHTML = "Pausa";
				break;

			case "darkblue":
				body.style.backgroundColor = "#32307D";

				body.style.transition = "all 0.3s";

				// Call playAudio() function
				playAudio();

				title.setAttribute("src", "/imgs/titulo3.png");

				document.documentElement.style.setProperty("--settingsColor", "#302c99");

				document.documentElement.style.setProperty("--primaryColor", "#292867");

				document.documentElement.style.setProperty("--shadowColor", "#1B1966");

				document.documentElement.style.setProperty("--hoverColor", "#292867cd");

				icon.setAttribute("href", "/favicon/despertador3.ico");

				displayState.innerHTML = "Pausa";
				break;

			case "pink":
				body.style.backgroundColor = "#FE265A";

				body.style.transition = "all 0.3s";

				// Call playAudio() function
				playAudio();

				title.setAttribute("src", "/imgs/titulo4.png");

				document.documentElement.style.setProperty("--settingsColor", "#ed3661");

				document.documentElement.style.setProperty("--primaryColor", "#e00639");

				document.documentElement.style.setProperty("--shadowColor", "#be002c");

				document.documentElement.style.setProperty("--hoverColor", "#D20032cd");

				icon.setAttribute("href", "/favicon/despertador4.ico");

				displayState.innerHTML = "Pausa";
				break;

			case "blue":
				body.style.backgroundColor = "#29BFFF";

				body.style.transition = "all 0.3s";

				// Call playAudio() function
				playAudio();

				title.setAttribute("src", "/imgs/titulo5.png");

				document.documentElement.style.setProperty("--settingsColor", "#44b7e9");

				document.documentElement.style.setProperty("--primaryColor", "#009EE1");

				document.documentElement.style.setProperty("--shadowColor", "#017fb6");

				document.documentElement.style.setProperty("--hoverColor", "#009EE1cd");
				icon.setAttribute("href", "/favicon/despertador5.ico");

				displayState.innerHTML = "Pausa";

				break;

			case "purple":
				body.style.backgroundColor = "#5F2CF1";

				body.style.transition = "all 0.3s";

				// Call playAudio() function
				playAudio();

				title.setAttribute("src", "/imgs/titulo6.png");

				document.documentElement.style.setProperty("--settingsColor", "#592bd8");

				document.documentElement.style.setProperty("--primaryColor", "#3D00EB");

				document.documentElement.style.setProperty("--shadowColor", "#4200FF");

				document.documentElement.style.setProperty("--hoverColor", "#3D00EBcd");

				icon.setAttribute("href", "/favicon/despertador6.ico");

				displayState.innerHTML = "Pausa";

				break;
		}
	}
	if (state === "longBreak") {
		stateDisplay.innerHTML = "Descanso";
		activeStateButton("buttonLongBreak");
		switch (longBreakBackground) {
			case "red":
				body.style.backgroundColor = "#fb3628";

				body.style.transition = "all 0.3s";

				// Call playAudio() function
				playAudio();

				title.setAttribute("src", "/imgs/titulo.png");

				document.documentElement.style.setProperty("--settingsColor", "#cc271b");

				document.documentElement.style.setProperty("--primaryColor", "#771414");

				document.documentElement.style.setProperty("--shadowColor", "#b00c02c2");

				document.documentElement.style.setProperty("--hoverColor", "#771414cd");

				icon.setAttribute("href", "/favicon/despertador.ico");

				displayState.innerHTML = "Descanso";

				break;

			case "green":
				body.style.backgroundColor = "#358528";

				body.style.transition = "all 0.3s";

				// Call playAudio() function
				playAudio();

				title.setAttribute("src", "/imgs/titulo2.png");

				document.documentElement.style.setProperty("--settingsColor", "#2d7422");

				document.documentElement.style.setProperty("--primaryColor", "#22531A");

				document.documentElement.style.setProperty("--shadowColor", "#1c5513bc");

				document.documentElement.style.setProperty("--hoverColor", "#22531Acd");

				icon.setAttribute("href", "/favicon/despertador2.ico");

				displayState.innerHTML = "Descanso";
				break;

			case "darkblue":
				body.style.backgroundColor = "#32307D";

				body.style.transition = "all 0.3s";

				// Call playAudio() function
				playAudio();

				title.setAttribute("src", "/imgs/titulo3.png");

				document.documentElement.style.setProperty("--settingsColor", "#302c99");

				document.documentElement.style.setProperty("--primaryColor", "#292867");

				document.documentElement.style.setProperty("--shadowColor", "#1B1966");

				document.documentElement.style.setProperty("--hoverColor", "#292867cd");

				icon.setAttribute("href", "/favicon/despertador3.ico");

				displayState.innerHTML = "Descanso";
				break;

			case "pink":
				body.style.backgroundColor = "#FE265A";

				body.style.transition = "all 0.3s";

				// Call playAudio() function
				playAudio();

				title.setAttribute("src", "/imgs/titulo4.png");

				document.documentElement.style.setProperty("--settingsColor", "#ed3661");

				document.documentElement.style.setProperty("--primaryColor", "#e00639");

				document.documentElement.style.setProperty("--shadowColor", "#be002c");

				document.documentElement.style.setProperty("--hoverColor", "#D20032cd");

				icon.setAttribute("href", "/favicon/despertador4.ico");

				displayState.innerHTML = "Descanso";
				break;

			case "blue":
				body.style.backgroundColor = "#29BFFF";

				body.style.transition = "all 0.3s";

				// Call playAudio() function
				playAudio();

				title.setAttribute("src", "/imgs/titulo5.png");

				document.documentElement.style.setProperty("--settingsColor", "#44b7e9");

				document.documentElement.style.setProperty("--primaryColor", "#009EE1");

				document.documentElement.style.setProperty("--shadowColor", "#017fb6");

				document.documentElement.style.setProperty("--hoverColor", "#009EE1cd");

				icon.setAttribute("href", "/favicon/despertador5.ico");

				displayState.innerHTML = "Descanso";

				break;

			case "purple":
				body.style.backgroundColor = "#5F2CF1";

				body.style.transition = "all 0.3s";

				// Call playAudio() function
				playAudio();

				title.setAttribute("src", "/imgs/titulo6.png");

				document.documentElement.style.setProperty("--settingsColor", "#592bd8");

				document.documentElement.style.setProperty("--primaryColor", "#3D00EB");

				document.documentElement.style.setProperty("--shadowColor", "#4200FF");

				document.documentElement.style.setProperty("--hoverColor", "#3D00EBcd");

				icon.setAttribute("href", "/favicon/despertador6.ico");

				displayState.innerHTML = "Descanso";

				break;
		}
	}
}

// call changeColors() to change background color
changeColors();

onload = function () {
	notificationInput.checked = false;
};
