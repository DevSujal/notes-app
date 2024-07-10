import { Outlet } from "react-router-dom";
import "./App.css";
import { Container, Header } from "./components";
import { useEffect } from "react";

function App() {

  useEffect(() => {
    clearInterval()
  }, [])
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
}

export default App;
