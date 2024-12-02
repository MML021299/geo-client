import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <Container>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/home" element={
            <ProtectedRoutes children={<Home />}/>
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
