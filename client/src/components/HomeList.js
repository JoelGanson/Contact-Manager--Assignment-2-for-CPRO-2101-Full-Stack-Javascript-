import react, { useState, useEffect } from "react";
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
          <div class="col-sm-1">First Name</div>
          <div class="col-sm-1">Last Name</div>
        <hr/>
        </li>
        {contacts.map((contact) => (
          <li class="row" key={contact.id}>
            <div class="col-sm-1">{contact.FirstName}</div>
            <div class="col-sm-1">{contact.LastName}</div>
            <hr/>
          </li>
        ))}
      </ul>
    );
  }
}
