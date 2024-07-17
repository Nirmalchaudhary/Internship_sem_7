import logo from "./logo.svg";
import "./App.css";
import { Route,Routes } from "react-router-dom"
import Navbar from "./Component/Navbar";
import Home from './Component/Home'
import About from './Component/About'
import Signin from './Component/Signin'
import Signup from './Component/Signup'
import Contact from './Component/Contact'
import Logout from './Component/Logout'
import Admin from './Component/Admin'
import { createContext } from "react";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
      <Route exact path="/" Component={Home}></Route>
      <Route path="/about" Component={About}></Route>
      <Route path="/contact" Component={Contact}></Route>
      <Route path="/signin" Component={Signin}></Route>
      <Route path="/signup" Component={Signup}></Route>
      <Route path="/logout" Component={Logout}></Route>
      <Route path="/admin" Component={Admin}></Route>
      </Routes>
    </>
  );
}

export default App;
