window.onload = function () {
	let socket = io.connect('http://localhost:3031');
	let latestReply = document.getElementById("latest-reply");
	let inputField = document.getElementById("inputField");
	let topic = document.getElementById("topic").value;
	console.log(nickName);

	function addMessages(message) {
		let newReply = document.createElement("div");
		/*		if (localeCompare(message.username, nickName) == 0){
			newReply.classList.add("reply", "from-me");
		} else {
			newReply.classList.add("reply", "from-other");
		}*/ 
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

	socket.on('is_online', (username, other, topic) => {
		let online_status = $('<div>');
		online_status.html('🔵 <i>' + username + ' join the chat.</i>');
		online_status.addClass('reply');
		$('#conversation').append(online_status);
		if (username.localeCompare(nickName) != 0){
			$('#webpal').html(username);
		} else {
			$('#webpal').html(other);
		}
	});

	socket.on('is_offline', username => {
		let offline_status = $('<div>');
		offline_status.html(username);
		offline_status.addClass('reply');
		$('#conversation').append(offline_status);
		$('#webpal').html = 'Pending...';
	});

	socket.emit('user_login', nickName, topic);
}