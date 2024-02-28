import Header from "../components/Header";
import HomeList from "../components/HomeList";

export default function Home() {

  return (
    <div class="container-xl">
      <Header />
      <center>
        <h2>Home</h2>
      </center>
      <a href="./Add">Add New Contact</a>
      <hr />
      <HomeList/>
    </div>
  );
}
