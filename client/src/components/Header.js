export default function Header() {
  // This is simple, just makes sure that all the pages share the same header
  return (
    <center
      className="container pt-5 my-5 bg-dark text-white"
      style={{
        "background-image": "url('https://i.imgur.com/VE4Ebp1.gif')",
        "background-size": "calc(100% + 40px)",
      }}
    >
      <h1>Contact Manager</h1>
    </center>
  );
}
