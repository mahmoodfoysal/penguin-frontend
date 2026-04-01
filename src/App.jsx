import { Outlet } from "react-router";
import "./App.css";
import Footer from "./modules/Footer/Footer";
import NavBar from "./modules/NavBar/NavBar";

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}

export default App;
