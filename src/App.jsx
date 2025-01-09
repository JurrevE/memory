import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [pokemon, setPokemon] = useState([]);
	const [currentScore, setCurrentScore] = useState(0);
	const [highScore, setHighScore] = useState(0);

	// Fetch Pokémon data
	function getData() {
		fetch("https://pokeapi.co/api/v2/pokemon/?limit=12&offset=900")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				const gekozenPokemon = data.results;
				console.log(gekozenPokemon);
				console.log("Data received:", gekozenPokemon);
				gekozenPokemon.forEach((pokemon, index) => {
					pokemon.id = index;
				});
				console.log(
					"nu hier de pokemons met specifieke index:",
					gekozenPokemon
				);

				setPokemon(gekozenPokemon);
			})
			.catch((error) => {
				console.error("There was a problem with the fetch operation:", error);
			});
	}

	// Shuffle Pokémon cards
	function shuffleCards(index) {
		console.log("Shuffling cards...");
		const shuffledCards = [...pokemon].sort(() => Math.random() - 0.5); // Shuffle the array
		setPokemon(shuffledCards); // Update the state with the shuffled cards
		console.log(index);
	}

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		console.log("Updated Pokémon array:", pokemon);
	}, [pokemon]);

	return (
		<div className="maincontent">
			<div className="header">
				<h1 className="currentScore">Current score: {currentScore}</h1>
				<h1>Pokemon Memory Game</h1>
				<h1 className="highScore">High score: {highScore}</h1>
			</div>
			<div className="cardsDiv">
				<ul>
					{pokemon.map((poke, index) => (
						<li key={index}>
							<div className="card" onClick={() => shuffleCards(index)}>
								<div className="picture"></div>
								<div className="name">{poke.name}</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;
