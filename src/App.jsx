import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [pokemon, setPokemon] = useState([]);
	const [clickedIds, setClickedIds] = useState([]);

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
				const fetchedPokemon = data.results;
				console.log("Data received:", fetchedPokemon);
				fetchedPokemon.forEach((pokemon, index) => {
					pokemon.id = index; // Assign unique IDs to each Pokémon
				});
				setPokemon(fetchedPokemon);
			})
			.catch((error) => {
				console.error("There was a problem with the fetch operation:", error);
			});
	}

	// Shuffle Pokémon cards
	function randomizePokemon() {
		setPokemon((prevPokemon) =>
			[...prevPokemon].sort(() => Math.random() - 0.5)
		);
	}

	// Function to handle card clicks
	function addId(e) {
		const id = e.target.dataset.id;
		console.log("Clicked ID:", id);

		if (!clickedIds.includes(id)) {
			setClickedIds((prevItems) => [...prevItems, id]);
			randomizePokemon(); // Shuffle the Pokémon cards

			// Update current score and potentially high score
			setCurrentScore((prevScore) => {
				const newScore = prevScore + 1;

				// Update high score if needed
				setHighScore((prevHigh) => Math.max(prevHigh, newScore));

				// Check for win condition
				if (newScore === 12) {
					alert("CONGRATS YOU ARE VERY SMART!!");
					resetGame();
				}

				return newScore;
			});
		} else {
			console.log("Wrong, stupid");
			alert("Game Over! Try again.");
			resetGame();
		}
	}

	// Reset the game
	function resetGame() {
		setClickedIds([]);
		setCurrentScore(0);
		randomizePokemon();
	}

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		console.log("Current clicked IDs:", clickedIds);
	}, [clickedIds]);

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
							<div className="card" data-id={poke.id} onClick={(e) => addId(e)}>
								<div className="picture" data-id={poke.id}></div>
								<div className="name" data-id={poke.id}>
									{poke.name}
									{poke.id}
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;
