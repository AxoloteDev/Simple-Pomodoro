document.querySelector("button").addEventListener("click", () => {
	chrome.windows.create({
		url: "https://simple-pomodoro-delta.vercel.app/",
		left: Math.round((screen.width - 800) / 2), // Largura da janela: 800px
		top: Math.round((screen.height - 600) / 2), // Altura da janela: 600px
		width: 800,
		height: 800,
	});
});
