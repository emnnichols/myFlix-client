import { baseUrl } from "../constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch(baseUrl + "/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful!");
        window.location;
        navigate("/");
      } else {
        alert("Signup failed")
      }
    })
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-5 formLabel">
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control 
        type="text"
        className="formInput"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        minLength="4"
        required />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label className="mt-2">Password:</Form.Label>
        <Form.Control 
        type="password"
        className="formInput"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength="8"
        required />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label className="mt-2">Email:</Form.Label>
        <Form.Control  
        type="email"
        className="formInput"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required />
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label className="mt-2">Birthday:</Form.Label>
        <DatePicker
          id="formBirthday"
          showYearDropdown
          minDate="1941"
          maxDate={new Date()}
          dropdownMode="select"
          showMonthDropdown
          placeholderText="birthday"
          calendarClassName="pickerCal"
          wrapperClassName="formInput"
          dateFormatCalendar=" "
          dateFormat="MMM dd YYYY"
          selected={birthday}
          onChange={(birthday) => setBirthday(birthday)}
        required />
      </Form.Group>

      <Button className="mb-2 mt-2 primaryButton w-100" variant="primary" type="submit">Signup</Button>
    </Form>
  )
};