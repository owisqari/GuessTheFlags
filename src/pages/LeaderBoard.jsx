import "../LeaderBoard.css"; // Make sure to import your global styles
import useDataFetch from "../Hooks/useDataFetch";
import { IoHome } from "react-icons/io5";
const LeaderBoard = () => {
  const isLogged = localStorage.getItem("isLogged");
  if (!isLogged) {
    window.location.href = "/login";
  }

  const apiUrl = "https://65af82562f26c3f2139af858.mockapi.io/username";
  const { data, loading, error } = useDataFetch(apiUrl);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <nav className="homeIcon">
        <a href="/">
          <IoHome />
        </a>
      </nav>
      <section className="LeaderSec">
        <div className="lcontainer">
          <div className="MainTitle">
            <h1>Leaderboard</h1>
          </div>

          <div className="LeaderBoardTitle">
            <h3>Name</h3>
            <h3>Score</h3>
          </div>

          <div className="leaderboard-list">
            {data.map((item) => (
              <div key={item.id} className="leaderboard-item">
                <span className="username">{item.username}</span>
                <span className="score">{item.score}</span>
              </div>
            ))}
          </div>

          <div className="footerCheck"></div>
        </div>
      </section>
    </>
  );
};

export default LeaderBoard;
