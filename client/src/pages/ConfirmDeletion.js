import Header from "../components/Header";
import Return from "../components/Return";

export default function ConfirmDeletion() {
  return (
    <div>
      <Header />
      <center>
        <h2>Delete?</h2>
        <Return />
        <p> Are you sure you want do delete this?</p>
      </center>
    </div>
  );
}
