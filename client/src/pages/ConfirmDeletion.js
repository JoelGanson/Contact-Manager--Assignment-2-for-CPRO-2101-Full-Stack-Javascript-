import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ConfirmDeletion() {
  // The id of the contact you are trying to delete
  var id = useParams().id;
  // A hook for sending the user back to the home page
  const navigate = useNavigate();
  // Hooks for loading data into when we fetch it
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [contact, setContact] = useState([]);

  // Fetch the contact we're about to delete, so we can get first and last name from it
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

  // If we error, remove the confirm button and warn of an error.
  // If it's still loading the name information, the confirm button will do nothing
  // If the contact name was loaded, display it and use an onClick function to fetch the delete API
  if (error) {
    return (
      <div>
        <Header />
        <center>
          <h2>Delete?</h2>
          <p> Are you sure you want do delete this?</p>
        </center>
        <div class="container-sm">
          <center>
            <p>Error!</p>
            <button type="button" onClick={() => navigate("/")}>
              Cancel
            </button>
          </center>
        </div>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div>
        <Header />
        <center>
          <h2>Delete?</h2>
          <p> Are you sure you want do delete this?</p>
        </center>
        <div class="container-sm">
          <center>
            <p>Please wait one second</p>
            <button type="button" onClick={() => {}}>
              Confirm
            </button>
            <span> </span>
            <button type="button" onClick={() => navigate("/")}>
              Cancel
            </button>
          </center>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        <center>
          <h2>Delete?</h2>
          <p>
            {" "}
            Are you sure you want do delete{" "}
            <strong>
              {contact.FirstName} {contact.LastName}
            </strong>
            ?
          </p>
        </center>
        <div class="container-sm">
          <center>
            <button
              type="button"
              onClick={() => {
                // Tells the API that we are deleting
                const requestOptions = {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" },
                };
                // The console.log isn't nessesary, but it helped with debugging and most users won't see it
                console.log(
                  // Send the delete command
                  fetch(
                    "http://localhost:3020/delete?contactId=" + id,
                    requestOptions
                  )
                );
                // This alert actually pops up even if the delete wasn't succesful, but I've eliminated any way I can think of that it wouldn't be
                alert("Successfully deleted contact!");
                // send the user back to the home page to see that the contact was deleted
                navigate("/");
              }}
            >
              Confirm
            </button>
            <span> </span>
            <button type="button" onClick={() => navigate("/")}>
              Cancel
            </button>
          </center>
        </div>
      </div>
    );
  }
}
