import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { useState } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../state";
import Footer from "../components/Footer";

const ItemDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const [count, setCount] = useState(1);

  const items = useSelector((state) => state.cart.items);
  const item = items.find((item) => item._id === id);

  if (!item) {
    return (
      <div>
        <p>Item not found</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      {/* ITEM DETAILS */}
      <div className="py-24 w-5/6 mx-auto">
        <div className="flex lg:flex-row items-center lg:items-start flex-col flex-wrap gap-10">
          {/* IMGAGE */}
          <div className="flex-[1_1_40%]">
            <img
              src={`/${item.picture}`}
              className="object-contain"
              alt={item.picture}
            />
          </div>

          {/* TEXT */}
          <div className="flex-[1_1_50%]">
            <div>
              <p className="text-xl pt-4">{item.name}</p>
              <p className="font-bold">${item.price}</p>
              <p className="font-fauna text-xs pt-8">{item.longDesc}</p>
            </div>

            {/* ACTIOS */}
            <div className="flex justify-start items-center gap-8 mt-10">
              <div className="flex items-center gap-1 rounded-sm border">
                <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                  <RemoveIcon style={{ fontSize: "20px" }} />
                </IconButton>
                <p className="text-base">{count}</p>
                <IconButton onClick={() => setCount(count + 1)}>
                  <AddIcon style={{ fontSize: "20px" }} />
                </IconButton>
              </div>

              <button
                className="bg-neutral-800 hover:bg-transparent text-white hover:text-neutral-800 p-2 text-sm rounded-sm transition duration-200"
                sx={{ fontFamily: "Cinzel" }}
                onClick={() =>
                  dispatch(addToCart({ item: { ...item, count } }))
                }
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ItemDetails;
