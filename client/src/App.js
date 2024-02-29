import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import NoPage from "./pages/NoPage";
import AddOrEdit from "./pages/AddOrEdit";
import ConfirmDeletion from "./pages/ConfirmDeletion";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/add" element={<AddOrEdit />} />
          <Route path="/edit/:id" element={<AddOrEdit />} />
          <Route path="/delete/:id" element={<ConfirmDeletion />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
