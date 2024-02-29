import Header from "../components/Header";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GetCategory from "../components/getCategory";

export default function Details() {
  // A hook for navigating back home, to the edit page, or to the delete page
  const navigate = useNavigate();
  // The id of the contact being viewed
  var id = useParams().id;
  //console.log(id);
  // Hooks for storing the data of the contact we fetch
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [contact, setContact] = useState([]);
  // Fetch the contact, passing the id in as a parameter
  useEffect(() => {
    fetch("http://localhost:3020/contact?contactId=" + id)
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setContact(data.data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  //console.log(contact);
  //console.log(error);
  // Decide what we should display based on if an error happened, if the info's still loading, or if it's loaded
  // I've added return home buttons to all of them
  // The loaded version has buttons to send the user to the edit or delete pages too
  if (error) {
    return (
      <div>
        <Header />
        <center></center>
        <div class="container">
          <h2>Contact Details</h2>
          Error: {error.message}
        </div>
        <button type="button" onClick={() => navigate("/")}>
          Return To Home
        </button>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div>
        <Header />
        <center></center>
        <div class="container">
          <h2>Contact Details</h2>
          Loading...
        </div>
        <button type="button" onClick={() => navigate("/")}>
          Return To Home
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        <center></center>
        <div class="container ">
          <h2>Contact Details</h2>
          <ul>
            <li class="row border p-3">
              <div class="col-sm-2">Name:</div>
              <div class="col-sm">
                {contact.FirstName} {contact.LastName}
              </div>
            </li>

            <li class="row border p-3">
              <div class="col-sm-2">Phone:</div>
              <div class="col-sm">{contact.Phone}</div>
            </li>

            <li class="row border p-3">
              <div class="col-sm-2">Email:</div>
              <div class="col-sm">{contact.Email}</div>
            </li>

            <li class="row border p-3">
              <div class="col-sm-2">Category:</div>
              <div class="col-sm">
                <GetCategory id={contact.CategoryId} />
              </div>
            </li>

            <li class="row border p-3">
              <div class="col-sm-2">Organization:</div>
              <div class="col-sm">{contact.Organization}</div>
            </li>

            <li class="row border p-3">
              <div class="col-sm-2">Date Added:</div>
              <div class="col-sm">{contact.createdAt}</div>
            </li>
          </ul>

          <button type="button" onClick={() => navigate("/edit/" + id)}>
            Edit
          </button>
          <button type="button" onClick={() => navigate("/delete/" + id)}>
            Delete
          </button>
          <button type="button" onClick={() => navigate("/")}>
            Return To Home
          </button>
        </div>
      </div>
    );
  }
}
