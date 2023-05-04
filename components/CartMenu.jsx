import {
  Button,
  Divider,
  Icon,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";

import { useSelector, useDispatch } from "react-redux";
import {
  setIsCartOpen,
  increaseCount,
  decreaseCount,
  removeFromCart,
} from "../state";
import Link from "next/link";

const CartMenu = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);

  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  return (
    <div // overlay
      className={`${
        isCartOpen ? "block" : "hidden"
      } bg-black bg-opacity-40 fixed z-20 w-full h-full left-0 top-0 overflow-auto`}
    >
      <div //modal
        className={`${
          isNonMobile ? "max-w-[450px] w-full" : "w-full"
        } fixed right-0 bottom-0 h-full bg-white `}
      >
        <div className="overflow-auto h-full p-6">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h2>SACOLA DE COMPRAS</h2>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </div>

          <div>
            {/* CART LIST */}
            {cart.map((item) => (
              <div key={item._id} className="flex gap-4 border-b py-6 text-sm">
                <div className="w-[40%]">
                  <img src={item.picture} alt={item.picture} />
                </div>

                <div className="w-[60%] flex flex-col">
                  <div className="flex justify-between w-full">
                    <p className="font-bold">{item.name}</p>
                    <IconButton
                      onClick={() =>
                        dispatch(removeFromCart({ _id: item._id }))
                      }
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>

                  <p className="text-xs flex-1 pt-4 font-fauna">
                    {item.shortDesc}
                  </p>

                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center rounded-sm border">
                      <IconButton
                        onClick={() =>
                          dispatch(decreaseCount({ _id: item._id }))
                        }
                      >
                        <RemoveIcon style={{ fontSize: "16px" }} />
                      </IconButton>
                      <p className="text-xs">{item.count}</p>
                      <IconButton
                        onClick={() =>
                          dispatch(increaseCount({ _id: item._id }))
                        }
                      >
                        <AddIcon style={{ fontSize: "16px" }} />
                      </IconButton>
                    </div>

                    <div>
                      <p className="font-bold">${item.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SUBTOTAL */}
          <div className="flex justify-between items-center font-bold py-4 text-sm">
            <p>SUBTOTAL</p>
            <p>${totalPrice}</p>
          </div>

          {/* BUTTON */}
          <Link href="/Checkout">
            <Button
              className="bg-neutral-800 hover:text-neutral-900 text-white text-xs rounded-sm w-full py-6 mt-4 font-bold"
              sx={{ fontFamily: "Cinzel" }}
              onClick={() => dispatch(setIsCartOpen({}))}
            >
              CHECKOUT
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartMenu;
