import { Outlet } from "react-router-dom";
import "./App.css";
import { Container, Header } from "./components";

function App() {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
}

export default App;
