import { ShoppingBagOutlined } from "@mui/icons-material";
import { IconButton, Badge } from "@mui/material";

import { useSelector, useDispatch } from 'react-redux';
import { setIsCartOpen } from "../state";
import Link from "next/link";
import CartMenu from "./CartMenu";

const Navbar = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart)

  return (
    <nav className="w-full bg-white/95 fixed z-20 border-b">
      <div className="w-5/6 mx-auto flex justify-between items-center my-4">
        <Link href="/">
          <h1 className="text-xl text-purple-800">Brilho Fino</h1>
        </Link>
        <div>
          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen({}))}
              className="text-black"
              >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
        </div>
      </div>
      <CartMenu />
    </nav>
  );
};

export default Navbar;
