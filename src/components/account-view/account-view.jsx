import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Button, Form } from "react-bootstrap";

export const AccountView = ({ user, token, setUser }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState("");
  const baseUrl = 'https://myflix-ghibli-7c8d5913b80b.herokuapp.com';

  const navigate = useNavigate();

  const handleUpdate = (event) => {
    event.preventDefault();
    
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch(baseUrl + `/profile/${user.Username}/account`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    .then(async (response) => {
      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert("Account updated successfully!");
        window.location;
        navigate(`/profile/${updatedUser.Username}/account`);
      } else {
        const failed = await response.json();
        const failedStr = JSON.stringify(failed);
        const failedObj = JSON.parse(failedStr);

        let whatFailed = failedObj.errors.map(x => x.msg)

        alert(whatFailed)
      }
    })
    .catch((e) => {
      alert("Something went wrong!");
    })
  };

  const handleDelete = () => {

    confirm("Are you sure?");

    if (confirm === true) {
      fetch(baseUrl + `/profile/${user.Username}/account`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        if (response.ok) {
          setUser(null);
          localStorage.clear();
          alert("Account deleted successfully!");
          navigate(`/signup`);
        } else {
          const failed = response.json();
          const failedStr = JSON.stringify(failed);
          const failedObj = JSON.parse(failedStr);
  
          let whatFailed = failedObj.errors.map(x => x.msg)
  
          alert(whatFailed)
        }
      })
      .catch((e) => {
        alert("Something went wrong!");
        window.location;
      })
    } else {
      alert("Deletion cancelled");
    }
  };

  return (
    <>
      <Row className="justify-content-md-center w-100 mt-5">
        <Form onSubmit={handleUpdate} className="mt-5 mb-5 formLabel">
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control 
            type="text"
            className="formInput"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength="5"
            required/>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label className="mt-2">Password:</Form.Label>
            <Form.Control 
            type="password"
            className="formInput"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="8"
            required
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label className="mt-2">Email:</Form.Label>
            <Form.Control  
            type="email"
            className="formInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
          </Form.Group>

          <Form.Group controlId="formBirthday">
            <Form.Label className="mt-2">Birthday:</Form.Label>
            <Form.Control  
            type="date"
            className="formInput"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>

          <Button className="mt-4 primaryButton w-100" variant="primary" type="submit" onClick={handleUpdate}>Update Information</Button>
          <p className="warning">-- DANGER ZONE --
        <Button className="deleteButton w-100" variant="danger" type="submit" onClick={handleDelete}>Delete Account</Button></p>
        </Form>
      </Row>
    </>
  )
};