import { useEffect, useState } from "react";
import { setItens } from "../../state";
import { useDispatch, useSelector } from "react-redux";

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
  }, []);

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
    </div>
  );
};

export default ShoppingList;
