import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GetCategory from "../components/getCategory";

export default function HomeList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3020/allcontacts")
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setContacts(data.data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    //console.log(contacts);

    return (
      <ul class="container">
        <li class="row" key="title">
          <div class="col-sm-1">
            <strong>First Name</strong>
          </div>
          <div class="col-sm-1">
            <strong>Last Name</strong>
          </div>
          <div class="col-sm-2">
            <strong>Phone</strong>
          </div>
          <div class="col-sm-3">
            <strong>Email</strong>
          </div>
          <div class="col-sm">
            <strong>Category</strong>
          </div>
          <hr />
        </li>
        {contacts.map((contact) => (
          <li class="row" key={contact.id}>
            <div class="col-sm-1">
              <Link to={"Details/" + contact._id}>{contact.FirstName}</Link>
            </div>
            <div class="col-sm-1">
              <Link to={"Details/" + contact._id}>{contact.LastName}</Link>
            </div>
            <div class="col-sm-2">{contact.Phone}</div>
            <div class="col-sm-3">{contact.Email}</div>
            <div class="col-sm">
              <GetCategory id={contact.CategoryId} />
            </div>
            <hr />
          </li>
        ))}
      </ul>
    );
  }
}
