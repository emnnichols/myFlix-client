import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const baseUrl = 'https://myflix-ghibli-7c8d5913b80b.herokuapp.com';

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const data = {
      Username: username,
      Password: password
    };

    fetch(baseUrl + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Login response: ", data);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token);
      } else {
        alert("No such user");
      }
    })
    .catch((e) => {
      alert("Something went wrong!");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:
        <input
          type="text"
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          requiried
        />
      </label>
      <label>Password:
        <input 
          type="password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)}  
          required
        />
      </label>
      <button type="submit">login</button>
    </form>
  )
};