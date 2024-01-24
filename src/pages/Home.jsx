import "../App.css";
import africaImage from "../assets/img/africa-gold.png";
import americaImage from "../assets/img/America-gold.png";
import asiaImage from "../assets/img/asia-gold.png";
import europeImage from "../assets/img/europe-gold.png";
import globeImage from "../assets/img/globe-gold.png";
const HeroSection = () => {
  const isLogged = localStorage.getItem("isLogged");
  const username = localStorage.getItem("username");
  const logout = () => {
    localStorage.removeItem("isLogged");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  return (
    <section id="hero" className="sec">
      <div className="container">
        {isLogged ? <h1 className="hero-title">Welcome {username}!</h1> : <></>}
        <div className="">
          <h1>
            Can You Guess the Country?<br></br> Test Your Knowledge of the
            World&apos;s Flags!
            <span>.</span>
          </h1>
        </div>
      </div>

      <div className="country-container">
        <div className="cont-container">
          <a href="/africa">
            <img className="contimage" src={africaImage} alt="" />
          </a>
          <h4 className="">Africa</h4>
        </div>
        <div className="cont-container">
          <a href="/americas">
            <img className="contimage" src={americaImage} alt="" />
          </a>
          <h4 className="">America</h4>
        </div>
        <div className="cont-container">
          <a href="/asia">
            <img className="contimage" src={asiaImage} alt="" />
          </a>
          <h4 className="">Asia</h4>
        </div>
        <div className="cont-container">
          <a href="/europe">
            <img className="contimage" src={europeImage} alt="" />
          </a>
          <h4 className="">Europe</h4>
        </div>
        <div className="cont-container">
          <a href="/all">
            <img className="contimage" src={globeImage} alt="" />
          </a>
          <h4 className="">World</h4>
        </div>
      </div>
      {isLogged ? (
        <>
          <div className="leaderboardBtb">
            <a href="/leaderboard">Leaderboard</a>
          </div>
          <div className="logoutBtb">
            <a href="/" onClick={logout}>
              Logout
            </a>
          </div>
        </>
      ) : (
        <>
          <div className="loginBtb">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>
        </>
      )}
    </section>
  );
};

export default HeroSection;
