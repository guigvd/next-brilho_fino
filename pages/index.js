import CartMenu from "../components/CartMenu";
import Navbar from "../components/Navbar";
import Home from "./home/Home";

export default function App() {
  return (
    <div>
      <Navbar />
      <CartMenu />
      <Home />
    </div>
  );
}