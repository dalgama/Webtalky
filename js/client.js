window.onload = function () {
	let socket = io.connect('http://localhost:3031');
	let latestReply = document.getElementById("latest-reply");
	let inputField = document.getElementById("inputField");

	function addMessages(message) {
		// message = JSON.parse(message)
		let newReply = document.createElement("div");
		newReply.classList.add("reply", "from-other");
		let msg = `<h4> ${message.username} </h4><p>  ${message.msg} </p>`
		newReply.innerHTML = msg;
		document.getElementById("conversation").appendChild(newReply);
	}
	$('#send-button').click(function () {
		socket.emit('chat_message', { msg: inputField.value });
		inputField.value = "";
	});
	socket.on('chat_message', data => {
		addMessages(data);
	});

	socket.on('connect', data => {
		console.log(data);
	});

	socket.on('is_online', username => {
		let online_status = $('<div>');
		online_status.html(username);
		online_status.addClass('reply');
		$('#conversation').append(online_status);
	});

	socket.on('is_offline', username => {
		let offline_status = $('<div>');
		offline_status.html(username);
		offline_status.addClass('reply');
		$('#conversation').append(offline_status);
	});

	var num = Math.floor(Math.random() * 100);
	var username = `artem${num}`;
	socket.emit('user_login', username);
}