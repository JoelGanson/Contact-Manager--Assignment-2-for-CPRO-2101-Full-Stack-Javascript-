import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AddOrEdit(props) {
  const [inputs, setInputs] = useState({
    FirstName: "",
    LastName: "",
    Phone: "",
    Email: "",
    CategoryId: "",
    Organization: "",
    contactId: "",
  });

  var id = useParams().id;
  //console.log(id);
  var title, action, method;
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [contact, setContact] = useState([]);
  var successMessage = "Contact succesfully added!";

  useEffect(() => {
    if (id) {
      fetch("http://localhost:3020/contact?contactId=" + id)
        .then((res) => res.json())
        .then(
          (data) => {
            setIsLoaded(true);
            setContact(data.data);
            //   console.log(data.data);
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

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    };
    console.log(requestOptions);
    fetch(action, requestOptions);
    alert(successMessage);
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
