import Header from "../components/Header";
import Return from "../components/Return";

export default function NoPage() {
  return (
    <div>
      <Header />
      <center>
        <h2>Error 404: Page not found</h2>
        <p>
          The page you were looking for was not found. Please try a different
          page or come back later.
        </p>
        <Return />
      </center>
    </div>
  );
}
