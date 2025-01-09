import { useEffect, useState } from "react";
import "./App.css";

function App() {
	function getData() {
		fetch("https://pokeapi.co/api/v2/pokemon/?limit=11&offset=900")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				// Parse the JSON data
				return response.json();
			})
			.then((data) => {
				console.log("Data received:", data);
			})
			.catch((error) => {
				console.error("There was a problem with the fetch operation:", error);
			});
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="maincontent">
			<div className="header">
				<h1 className="currentScore">Current score: </h1>
				<h1>Pokemon memory game</h1>
				<h1 className="highScore">High score:</h1>
			</div>
			<div className="cardsDiv">Je dikke kanker moeder</div>
		</div>
	);
}

export default App;
