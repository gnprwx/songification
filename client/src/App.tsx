import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import Form from "./Form";
import Spotify from "./Spotify";
import Error from "./Error";
import logo from "./assets/logo.png";

function App() {
	const [songs, setSongs] = useState([]);
	const [err, setErr] = useState(false);
	const [urlValue, setUrlValue] = useState("");
	const [textValue, setTextValue] = useState("");

	const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let url = urlValue.slice(31, 53);
		let text = textValue;
		try {
			await axios.post("api/songs", { url, text });
			fetchSongs();
			setUrlValue("");
			setTextValue("");
			setErr(false);
		} catch (error) {
			setErr(true);
		}
	};

	const handleUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUrlValue(e.target.value);
	};

	const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTextValue(e.target.value);
	};

	const handleOnError = () => {
		setErr(false);
	};

	const fetchSongs = async () => {
		try {
			const response = await axios.get("/api/songs");
			setSongs(response.data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchSongs();
	}, []);

	return (
		<div className="min-h-[100dvh] mx-auto bg-indigo-950/70">
			<Error handleOnError={handleOnError} error={err}>
				<p>This song has already been submitted. Try a different one.</p>
			</Error>
			<div className="grid grid-cols-1 2xl:grid-cols-1 lg:grid-cols-2 justify-items-center items-center gap-5 px-10 py-5 bg-indigo-900 border-b-2 border-indigo-500 shadow-lg shadow-indigo-500/40">
				<img src={logo} alt="logo" className="w-96" />
				<Form
					onClickSubmission={handleFormSubmission}
					urlValue={urlValue}
					textValue={textValue}
					handleTextInputChange={handleTextInputChange}
					handleUrlInputChange={handleUrlInputChange}
				/>
			</div>
			<div className="mx-auto 2xl:max-w-[1440px] sm:max-w-7xl px-5 pt-10">
				<Spotify songs={songs} />
			</div>
		</div>
	);
}

export default App;