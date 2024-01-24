import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import "../main.css";
import axios from "axios";

const Europe = () => {
  const isLogged = localStorage.getItem("isLogged");
  if (!isLogged) {
    window.location.href = "/login";
  }

  const url = "https://restcountries.com/v3.1/all";
  const [shuffledCountries, setShuffledCountries] = useState([]);
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [remainingTries, setRemainingTries] = useState(5);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0); // Added score state
  const [suggestedCountries, setSuggestedCountries] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const getAllCountries = async () => {
    try {
      const response = await fetch(url);
      const countries = await response.json();
      // Filter countries to only include those in Europe
      const europeanCountries = countries.filter(
        (country) => country.region && country.region === "Europe"
      );
      const newArr = shuffleArray(europeanCountries);
      return newArr;
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const ScoreUpdate = async () => {
    const username = localStorage.getItem("username");
    console.log(username, score);

    try {
      const response = await axios.put(
        "https://65af82562f26c3f2139af858.mockapi.io/scores",
        {
          username,
          score,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };
  const resetGame = () => {
    getData();
    setCurrentCountryIndex(0);
    setInputValue("");
    setErrorMessage("");
    setRemainingTries(5);
    setGameOver(false);
    setStreak(0);
    setScore(0); // Reset score to 0 on Play Again

    setShowModal(false); // Close the modal on Play Again
  };

  const getData = async () => {
    const countries = await getAllCountries();
    setShuffledCountries(countries);
    const countryNames = countries.map((country) =>
      country.name.common.toLowerCase()
    );
    setSuggestedCountries(countryNames);
  };

  useEffect(() => {
    getData();
  }, []); // Run once when the component mounts

  const nextCountry = (e) => {
    e.preventDefault(); // Prevent the default behavior (page refresh)

    if (gameOver) {
      resetGame();
      return;
    }

    const currentCountry = shuffledCountries[currentCountryIndex];
    if (inputValue.toLowerCase() === currentCountry.name.common.toLowerCase()) {
      setCurrentCountryIndex(
        (prevIndex) => (prevIndex + 1) % shuffledCountries.length
      );
      setInputValue("");
      setErrorMessage("");
      setRemainingTries(5); // Reset remainingTries on correct guess
      setStreak((prevStreak) => prevStreak + 1); // Increment streak on correct guess
      setScore((prevScore) => prevScore + 1); // Increment score on correct guess

      if (currentCountryIndex === shuffledCountries.length - 1) {
        setGameOver(true);
        setShowModal(true); // Display modal on game over
        ScoreUpdate(); // Update score when the game is over
      }
    } else {
      setErrorMessage("Incorrect country name. Try again.");
      setRemainingTries((prevTries) => prevTries - 1);
      setStreak(0); // Reset streak to 0 on wrong guess
      if (remainingTries === 1) {
        setErrorMessage("You're out of tries. Game over!");
        setGameOver(true);
        setShowModal(true); // Display modal on game over
        ScoreUpdate(); // Update score when the game is over
      }
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);
    setErrorMessage("");

    // Show all suggestions when the input is empty
    const filteredCountries =
      value === ""
        ? suggestedCountries
        : suggestedCountries.filter((country) => country.startsWith(value));

    setSuggestedCountries(filteredCountries);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const currentCountry = shuffledCountries[currentCountryIndex];

  return (
    <div className="container mt-5">
      {currentCountry && (
        <div className="text-center">
          <img
            src={currentCountry.flags.png}
            alt={currentCountry.name.common}
            className="img-fluid mb-3"
          />
          <p className="text-success">Streak: {streak} </p>

          <form onSubmit={nextCountry}>
            <div className="input-group mb-3">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                list="countrySuggestions"
                className="form-control"
                placeholder="Enter country name"
              />
              <datalist id="countrySuggestions">
                {suggestedCountries.map((suggestion, index) => (
                  <option
                    key={index}
                    value={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                  />
                ))}
              </datalist>
              <button type="submit" className="btn btn-primary">
                Next Country
              </button>
            </div>
          </form>
          <p className="text-danger">
            Tries:{" "}
            {[...Array(remainingTries)].map((_, index) => (
              <FaHeart
                key={index}
                style={{ color: "red", marginRight: "5px" }}
              />
            ))}
          </p>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </div>
      )}
      {gameOver && (
        <div className="text-center">
          <h2>Game Over!</h2>
          <button className="btn btn-primary" onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}

      <Modal
        show={showModal}
        onHide={handleModalClose}
        centered
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title className="text-danger display-2 text-md">
            GAME OVER
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={resetGame}>
            Play Again
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Europe;
