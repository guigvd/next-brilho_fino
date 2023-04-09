import { ShoppingBagOutlined } from "@mui/icons-material";
import { IconButton, Badge } from "@mui/material";
import { useContext } from "react";

import { useSelector, useDispatch } from 'react-redux';
import { setIsCartOpen } from "../state";
import { ItemsContext } from "./ItemsContext";



const Navbar = () => {
  const dispatch = useDispatch();
  // const {selectedItems} = useContext(ItemsContext);
  // console.log(selectedItems);
  
  // const isCartOpen = useSelector((state) => state.cart.isCartOpen)

  return (
    <nav className="w-full bg-white">
      <div className="w-5/6 mx-auto flex justify-between my-4">
        <div>
          <h1 className="text-xl text-purple-800">Brilho Fino</h1>
        </div>
        <div>
          <Badge
            // badgeContent={selectedItems.length}
            color="secondary"
            // invisible={cart.length === 0}
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
    </nav>
  );
};

export default Navbar;
