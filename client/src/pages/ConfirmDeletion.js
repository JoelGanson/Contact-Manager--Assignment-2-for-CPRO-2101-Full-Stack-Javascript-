import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function ConfirmDeletion() {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <center>
        <h2>Delete?</h2>
        <p> Are you sure you want do delete this?</p>
      </center>
      <button type="button" onClick={() => navigate("/")}>
        Return to Home
      </button>
    </div>
  );
}
