import { baseUrl } from "../constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./account-view.scss";

export const AccountView = ({ user, token, setUser }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);

  const date = new Date(user.Birthday).toLocaleDateString();

  const [birthday, setBirthday] = useState(date);

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

  const handleDelete = (event) => {
    if (!password) {return;}

    event.preventDefault();

    if (confirm("Are you sure?") == false) {
      alert("Deletion cancelled");
    } else {
      fetch(baseUrl + `/profile/${user.Username}/account`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        if (response.ok) {      
          alert("Account deleted successfully!");
          navigate(`/signup`);
          setUser(null);
          localStorage.clear();
        } else {
          const failed = response.json();
          const failedStr = JSON.stringify(failed);
          const failedObj = JSON.parse(failedStr);
  
          let whatFailed = failedObj.errors.map(x => x.msg)
  
          alert(whatFailed)
        }
      })
    }
  };

  return (
    <>
      <Row className="justify-content-md-center w-100 mt-5">
        <Form className="mt-5 mb-5 formLabel">
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
            <DatePicker
            id="formBirthday"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={30}
            showMonthDropdown
            calendarClassName="pickerCal"
            wrapperClassName="formInput"
            dateFormatCalendar=" "
            dateFormat="MMM dd YYYY"
            selected={birthday}
            onChange={(birthday) => setBirthday(birthday)}
            />
          </Form.Group>

          <Button className="mt-4 primaryButton w-100" variant="primary" type="submit" onClick={handleUpdate}>Update Information</Button>
          <p className="warning">-- DANGER ZONE --
        <Button className="primaryButton deleteButton w-100" variant="danger" type="submit" onClick={handleDelete}>Delete Account</Button></p>
        </Form>
      </Row>
    </>
  )
};