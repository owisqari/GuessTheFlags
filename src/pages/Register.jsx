import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const apiUrl = "https://65af82562f26c3f2139af858.mockapi.io/users";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiUrl, { username, password });
      const user = response.data;
      if (user) {
        localStorage.setItem("isLogged", true);
        localStorage.setItem("username", username);
        window.location.href = "/";
      } else {
        Swal.fire({
          title: "Wrong Password.",
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff url(../assets/img/CAT.webp)",
          backdrop: `
                  rgba(0,0,123,0.4)
                  url("/images/nyan-cat.gif")
                  left top
                  no-repeat
                `,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Wrong Password.",
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(../assets/img/CAT.webp)",
        backdrop: `
                rgba(0,0,123,0.4)
                url("/images/nyan-cat.gif")
                left top
                no-repeat
              `,
      });
    }
  };

  return (
    <>
      <div className="login-container">
        <h1>Register</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="username">Email</label>
        <input type="text" id="username" />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" onClick={handleSubmit}>
          Register
        </button>
      </div>
    </>
  );
};

export default Register;
