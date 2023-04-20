import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { addToCart } from "../state";
import Link from "next/link";

const Item = ({ item, _id, picture, category, material, name, price }) => {
  //   const navigate = u;
  const [isHover, setIsHover] = useState(false);
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  return (
    <div
      className="relative flex flex-col items-center overflow-hidden cursor-pointer mt-5"
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <Link href={`../ItemDetails?id=${_id}`}>
      {/* <Link href={`../ItemDetails/`}> */}
        <Image
          src={`/${picture}`}
          className="object-cover h-[400px] w-[300px]"
          alt={picture}
          width="300"
          height="400"
        />
      </Link>

      <div
        className={`${
          isHover ? "block" : "hidden"
        } absolute bottom-[20%] left-0 w-full p-x-[5%]`}
      >
        <div className="flex justify-around items-cente">
          <div className="flex items-center bg-slate-100 rounded-sm">
            <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
              <RemoveIcon style={{ fontSize: "16px" }} />
            </IconButton>
            <p className="text-xs">{count}</p>
            <IconButton onClick={() => setCount(count + 1)}>
              <AddIcon style={{ fontSize: "16px" }} />
            </IconButton>
          </div>

          <Button
            className="bg-gray-500 text-white text-sm rounded-sm"
            sx={{ fontFamily: "Cinzel" }}
            onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
          >
            ADD TO CART
          </Button>
        </div>
      </div>

      <div className="mt-2 px-1 text-left w-full">
        <p className="text-xs text-gray-500 ">
          {category} | {material}
        </p>
        <p className="text-sm">{name}</p>
        <p className="text-sm font-bold">${price}</p>
      </div>
    </div>
  );
};

export default Item;
