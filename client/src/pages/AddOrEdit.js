import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AddOrEdit(props) {
  // The variables that make up the Contact model, plus the contactId variable for the update function in the Contact Controller
  const [inputs, setInputs] = useState({
    FirstName: "",
    LastName: "",
    Phone: "",
    Email: "",
    CategoryId: "",
    Organization: "",
    contactId: "",
  });

  // Get the ID from the url, as in "edit?id=skdfe39202483ad"
  // ID will be undefined for creating a new user, and defined for editing
  // We can use this undefined trick for truthy and falsey variable checking
  var id = useParams().id;
  //console.log(id);
  // Placeholders, to be defined later once we check if id has been defined
  var title, action, method;
  // A hook for navigating to other pages
  const navigate = useNavigate();
  // Hooks for getting the contact info of an existing contact to edit
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [contact, setContact] = useState([]);
  // This message will be changed if id is present
  var successMessage = "Contact succesfully added!";

  // If an id is present, we must be in edit mode, so get the information of the contact coresponding to the id
  useEffect(() => {
    if (id) {
      fetch("http://localhost:3020/contact?contactId=" + id)
        .then((res) => res.json())
        .then(
          (data) => {
            setIsLoaded(true);
            // I don't think I actually used this, but the page crashes and errors if I remove it
            setContact(data.data);
            //   console.log(data.data);
            // Fill all the information of the loaded contact into the form
            setInputs({
              ...inputs,
              FirstName: data.data.FirstName,
              LastName: data.data.LastName,
              Phone: data.data.Phone,
              Email: data.data.Email,
              CategoryId: data.data.CategoryId,
              Organization: data.data.Organization,
              contactId: id,
            });
            //   console.log("inputs:")
            //   console.log(inputs)
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, []);

  // Check if we're editing, or creating a new contact using the falsey/truthy method
  // Title displays at the top of the page
  // action determines which API to use
  // method determines what category of api action this is, as if being sent through Postman
  if (id) {
    title = "Editting";
    action = "http://localhost:3020/update";
    method = "PUT";
    successMessage = "Contact succesfully updated!";
  } else {
    method = "POST";
    title = "Add New";
    action = "http://localhost:3020/create";
  }

  // When the user types something into one of the input fields, update the coresponding variables
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // The submit button has been clicked, so consume the PUT or POST API.
  const handleSubmit = (event) => {
    // Keeps the form from tring to send the data anywhere we don't want
    event.preventDefault();
    // Determines how we're sending data, and puts the data into the request body
    const requestOptions = {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    };
    //console.log(requestOptions);
    // Sends the data to the API. Note the action variable, defined above in the if(id) section
    fetch(action, requestOptions);
    alert(successMessage);
    // Send the user back to the home page to see their changes
    navigate("/");
  };

  return (
    <div>
      <Header />
      <center>
        <h2>{title} Contact</h2>
      </center>
      <form onSubmit={handleSubmit} class="container was-validated">
        <div class="mb-3 mt-3">
          <label for="FirstName" class="form-label">
            First Name
          </label>
          <input
            id="FirstName"
            name="FirstName"
            type="text"
            class="form-control"
            value={inputs.FirstName}
            onChange={handleChange}
            required
          ></input>
          <div class="valid-feedback">Good to go!</div>
          <div class="invalid-feedback">Please fill out this field</div>
        </div>
        <div class="mb-3 mt-3">
          <label for="LastName" class="form-label">
            Last Name
          </label>
          <input
            id="LastName"
            name="LastName"
            type="text"
            class="form-control"
            value={inputs.LastName}
            onChange={handleChange}
            required
          ></input>
          <div class="valid-feedback">Good to go!</div>
          <div class="invalid-feedback">Please fill out this field</div>
        </div>
        <div class="mb-3 mt-3">
          <label for="Phone" class="form-label">
            Phone
          </label>
          <input
            id="Phone"
            name="Phone"
            type="text"
            class="form-control"
            value={inputs.Phone}
            onChange={handleChange}
            required
          ></input>
          <div class="valid-feedback">Good to go!</div>
          <div class="invalid-feedback">Please fill out this field</div>
        </div>
        <div class="mb-3 mt-3">
          <label for="Email" class="form-label">
            Email
          </label>
          <input
            id="Email"
            name="Email"
            type="text"
            class="form-control"
            value={inputs.Email}
            onChange={handleChange}
            required
          ></input>
          <div class="valid-feedback">Good to go!</div>
          <div class="invalid-feedback">Please fill out this field</div>
        </div>
        <div class="mb-3 mt-3">
          <label for="CategoryId" class="form-label">
            Category
          </label>
          <select
            id="CategoryId"
            name="CategoryId"
            type=""
            class="form-control"
            value={inputs.CategoryId}
            onChange={handleChange}
            required
          >
            <option selected disabled value="">
              Select one (Required):
            </option>
            <option value="65dfc5381e21c2065d97a0a5">Friend</option>
            <option value="65e00babc30f45fb049bd84b">Family</option>
            <option value="65dfc5421e21c2065d97a0a7">Work</option>
            <option value="65dfc52e1e21c2065d97a0a3">Self</option>
          </select>
          <div class="valid-feedback">Good to go!</div>
          <div class="invalid-feedback">Please select an option</div>
        </div>
        <div class="mb-3 mt-3">
          <label for="Organization" class="form-label">
            Organization
          </label>
          <input
            id="Organization"
            name="Organization"
            type="text"
            class="form-control"
            value={inputs.Organization}
            onChange={handleChange}
          ></input>
          <div class="valid-feedback">Optional</div>
        </div>
        <div>
          <input
            type="hidden"
            id="contactId"
            name="contactId"
            defaultValue={id}
            value={inputs.ContactID}
            readOnly
          ></input>
        </div>
        <button type="submit">Submit</button>
        <span> </span>
        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
}
