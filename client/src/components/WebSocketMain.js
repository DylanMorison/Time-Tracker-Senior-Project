import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5001";

function WebSocketMain() {
	const [response, setResponse] = useState("");

	useEffect(() => {
		const socket = socketIOClient(ENDPOINT);
		socket.on("FromAPI", (data) => {
			setResponse(data);
		});
	}, []);

	return (
		<p>
			It's <time dataTime={response}>{response}</time>
		</p>
	);
}

export default WebSocketMain;
