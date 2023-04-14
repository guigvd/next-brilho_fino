import { useEffect, useState } from "react";
import { setItens } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import Item from "../../components/Item";

import { Tab, Tabs, useMediaQuery } from "@mui/material";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px");
  const items = useSelector((state) => state.cart.items);

  // FETCH THE PRODUCTS
  async function getItems() {
    const response = await fetch("/api/products");
    const data = await response.json();
    dispatch(setItens(data));
  }

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // FILTER THINGS
  const [valueCategory, setValueCategory] = useState("all");

  const handleChangeCategory = (event, newValue) => {
    setValueCategory(newValue);
  };

  const categories = [...new Set(items.map((p) => p.category))];

  const anelItems = items.filter((item) => item.category === "anel");
  const barceleteItems = items.filter((item) => item.category === "bracelete");
  const brincoItems = items.filter((item) => item.category === "brinco");
  const colarItems = items.filter((item) => item.category === "colar");

  return (
    <div className="w-5/6 mx-auto py-16 flex flex-col items-center">
      <h2 className="text-xl">
        Nossos Principais <span className="font-semibold">Produtos</span>
      </h2>

      {/* FILTER CATEGORY */}
      <div className="w-full">
        <Tabs
          value={valueCategory}
          onChange={handleChangeCategory}
          textColor="secondary"
          indicatorColor="secondary"
          centered
          TabIndicatorProps={{
            sx: { display: isNonMobile ? "block" : "none" },
          }}
          sx={{
            m: "25px",
            "& .MuiTabs-flexContainer": {
              flexWrap: "wrap",
            },
          }}
        >
          <Tab label="Todos" value="all" />
          {categories.map((categoryName) => (
            <Tab
              key={`category-${categoryName}`}
              label={categoryName.toUpperCase()}
              value={categoryName}
            />
          ))}
        </Tabs>
      </div>

      {/* SHOW ITEMS */}
      <div
        className="mt-10 w-full grid gap-5 justify-around"
        style={{ gridTemplateColumns: "repeat(auto-fill, 300px)" }}
      >
        {valueCategory === "all" &&
          items.map((item) => <Item item={item} key={item._id} {...item} />)}
        {valueCategory === "anel" &&
          anelItems.map((item) => <Item item={item} key={item._id} {...item} />)}
        {valueCategory === "bracelete" &&
          barceleteItems.map((item) => <Item item={item} key={item._id} {...item} />)}
        {valueCategory === "brinco" &&
          brincoItems.map((item) => <Item item={item} key={item._id} {...item} />)}
        {valueCategory === "colar" &&
          colarItems.map((item) => <Item item={item} key={item._id} {...item} />)}
      </div>
    </div>
  );
};

export default ShoppingList;
