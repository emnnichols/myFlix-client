import { useState } from "react";
import { Button, Form } from "react-bootstrap";

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
    <Form onSubmit={handleSubmit} className="mt-5 mb-5 formLabel">
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control 
          type="text"
          className="formInput"
          placeholder="username"
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          minLength="3"
          requiried
        />
      </Form.Group>
      
      <Form.Group controlId="formPassword">
        <Form.Label className="mt-2">Password:</Form.Label>
        <Form.Control 
          type="password"
          className="formInput"
          placeholder="password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)}  
          required
        />
      </Form.Group>
      <Button className="mb-2 mt-2 primaryButton w-100" variant="primary" type="submit">login</Button>
    </Form>
  )
};