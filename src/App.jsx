import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [pokemon, setPokemon] = useState([]);
	const [clickedIds, setClickedIds] = useState([]);
	const [currentScore, setCurrentScore] = useState(0);
	const [highScore, setHighScore] = useState(0);

	async function getData() {
		try {
			const response = await fetch(
				"https://pokeapi.co/api/v2/pokemon/?limit=12&offset=900"
			);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			const fetchedPokemon = data.results;

			// Fetch sprite for each Pokémon
			const pokemonWithSprites = await Promise.all(
				fetchedPokemon.map(async (poke, index) => {
					const detailsResponse = await fetch(poke.url);
					if (!detailsResponse.ok) {
						throw new Error(`Failed to fetch details for ${poke.name}`);
					}
					const details = await detailsResponse.json();

					return {
						...poke,
						id: index,
						sprite: details.sprites.front_default,
					};
				})
			);

			setPokemon(pokemonWithSprites);
		} catch (error) {
			console.error("Error fetching Pokémon data:", error);
		}
	}

	function randomizePokemon() {
		setPokemon((prevPokemon) =>
			[...prevPokemon].sort(() => Math.random() - 0.5)
		);
	}

	function handleClick(e) {
		const id = e.target.dataset.id;
		console.log("Clicked ID:", id);

		if (!clickedIds.includes(id)) {
			setClickedIds((prevItems) => [...prevItems, id]);
			randomizePokemon();

			setCurrentScore((prevScore) => {
				const newScore = prevScore + 1;

				setHighScore((prevHigh) => Math.max(prevHigh, newScore));

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
							<div
								className="card"
								data-id={poke.id}
								onClick={(e) => handleClick(e)}
							>
								<img
									className="picture"
									data-id={poke.id}
									src={poke.sprite}
									alt={poke.name}
								/>
								<div className="name" data-id={poke.id}>
									{poke.name}
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
