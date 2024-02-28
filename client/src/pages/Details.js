import Header from "../components/Header";
import Return from "../components/Return";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Details() {
  var id = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [contact, setContact] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3020/contact", {
        method:"GET",
        body: JSON.stringify({
            "contactID":id
        }),
        mode:"cors",
        cache:"no-cache",
        headers:{
            "Content-Type":"application/json"
        }
    })
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

  console.log(contact)
  console.log(error)
  return (
    <div>
      <Header />
      <center>
        <h2>Details</h2>
        <Return />
      </center>
    </div>
  );
}
