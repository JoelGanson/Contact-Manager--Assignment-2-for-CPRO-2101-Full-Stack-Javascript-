import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function HomeList() {
  var id = useParams().id;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3020/cat/category?=" + id)
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

    return <span></span>;
  }
}
