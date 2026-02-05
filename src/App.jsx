import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnippetProvider } from "./context/SnippetContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddSnippet from "./pages/AddSnippet";

function App() {
  return (
    <SnippetProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddSnippet />} />
        </Routes>
      </BrowserRouter>
    </SnippetProvider>
  );
}

export default App;