import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AddOrEdit(props) {
  const [inputs, setInputs] = useState({});
  var id = useParams().id;
  //console.log(id);
  var title, action, hiddenField, method;
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [contact, setContact] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3020/contact?contactId=" + id)
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setContact(data.data);
          console.log(data.data)
          setInputs({ ...inputs, FirstName: data.data.FirstName });
          setInputs({ ...inputs, LastName: data.data.LastName });
          setInputs({ ...inputs, Phone: data.data.Phone });
          setInputs({ ...inputs, Email: data.data.Email });
          setInputs({ ...inputs, CategoryId: data.data.CategoryId });
          setInputs({ ...inputs, Organization: data.data.Organization });
          console.log("inputs:")
          console.log(inputs);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (contact) {
    title = "Editting";
    action = "http://localhost:3020/update";
    method = "PUT";
    hiddenField = (
      <input
        type="hidden"
        id="contactId"
        name="contactId"
        defaultValue={id}
        value={inputs.contactID}
        readOnly
      ></input>
    );
  } else {
    method = "POST";
    title = "Add New";
    action = "http://localhost:3020/create";
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    console.log(inputs)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    };
    fetch(action, requestOptions);
    alert("Contact succesfully added!");
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
            value={inputs.firstName}
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
            value={inputs.lastName}
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
            value={inputs.phone}
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
            value={inputs.email}
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
            value={inputs.categoryId}
            onChange={handleChange}
            required
          >
            <option selected disabled value="">
              Select one (Required):
            </option>
            <option value="65dfc5381e21c2065d97a0a5">Friend</option>
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
            value={inputs.organization}
            onChange={handleChange}
          ></input>
          <div class="valid-feedback">Optional</div>
        </div>
        {hiddenField}
        <button type="submit">Submit</button>
        <span> </span>
        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
}
