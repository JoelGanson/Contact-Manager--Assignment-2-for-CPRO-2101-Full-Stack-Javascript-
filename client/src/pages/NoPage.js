import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function NoPage() {
    // A hook that lets the Return to Home button function
    const navigate = useNavigate();
  return (
    <div>
      <Header />
      <center>
        <h2>Error 404: Page not found</h2>
        <p>
          The page you were looking for was not found. Please try a different
          page or come back later.
        </p>
      </center>
      <button type="button" onClick={() => navigate("/")}>Return to Home
        </button>
    </div>
  );
}
