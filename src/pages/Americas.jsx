import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Americas = () => {
  const url = "https://restcountries.com/v3.1/all";
  const [shuffledCountries, setShuffledCountries] = useState([]);
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [remainingTries, setRemainingTries] = useState(5);
  const [streak, setStreak] = useState(0);
  const [suggestedCountries, setSuggestedCountries] = useState([]);

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
      // Filter countries to only include those in the Americas
      const americasCountries = countries.filter(
        (country) => country.region && country.region === "Americas"
      );
      const newArr = shuffleArray(americasCountries);
      return newArr;
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const resetGame = () => {
    getData();
    setCurrentCountryIndex(0);
    setInputValue("");
    setErrorMessage("");
    setRemainingTries(5);
    setStreak(0);
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

    const currentCountry = shuffledCountries[currentCountryIndex];
    if (inputValue.toLowerCase() === currentCountry.name.common.toLowerCase()) {
      setCurrentCountryIndex(
        (prevIndex) => (prevIndex + 1) % shuffledCountries.length
      );
      setInputValue("");
      setErrorMessage("");
      setRemainingTries(5); // Reset remainingTries on correct guess
      setStreak((prevStreak) => prevStreak + 1); // Increment streak on correct guess
    } else {
      setErrorMessage("Incorrect country name. Try again.");
      setRemainingTries((prevTries) => prevTries - 1);
      setStreak(0); // Reset streak to 0 on wrong guess
      if (remainingTries === 1) {
        setErrorMessage("You're out of tries. Game over!");
        resetGame(); // Reset the game when the health bar is zero
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
          <p className="text-danger">Tries remaining: {remainingTries}</p>
          <p className="text-success">
            Streak:{" "}
            {[...Array(streak)].map((_, index) => (
              <FaHeart
                key={index}
                style={{ color: "red", marginRight: "5px" }}
              />
            ))}
          </p>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default Americas;
