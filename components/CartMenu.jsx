import { Button, Divider, Icon, IconButton, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/close";
import { useSelector, useDispatch } from 'react-redux';
import { setIsCartOpen } from "../state";
import { useContext } from "react";
import { ItemsContext } from "./ItemsContext";

const CartMenu = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const {selectedItems} = useContext(ItemsContext)
  
  const isCartOpen = useSelector((state) => state.cart.isCartOpen)

  return (
    <div // overlay
      className={`${isCartOpen ? 'block' : 'hidden'} bg-black bg-opacity-40 fixed z-20 w-full h-full left-0 top-0 overflow-auto`}
    >
      <div //modal
        className={`${isNonMobile ? 'max-w-[400px] w-full' : 'w-full'} fixed right-0 bottom-0 h-full bg-white `}
      >

        <div className="p-7 overflow-auto h-fu
        ">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
                <h2>
                    SACOLA DE COMPRAS
                </h2>
                <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
                    <CloseIcon />
                </IconButton>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CartMenu;
