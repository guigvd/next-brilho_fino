import { useEffect, useState } from "react";
import Item from "../../components/Item";

import { Tab, Tabs, useMediaQuery } from "@mui/material";

const ShoppingList = () => {
  const isNonMobile = useMediaQuery("(min-width:600px");

  // const items = useSelector((state) => state.cart.items)
  const [items, setItems] = useState([]);

  // FETCH THE PRODUCTS
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((json) => setItems(json));
  }, []);

  console.log(items);

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

  // POSSÍVEL FILTRO POR MATERIAL TAMBÉM
  // const [valueMaterial, setValueMaterial] = useState("all");
  // const handleChangeMaterial = (event, newValue) => {
  //   setValueMaterial(newValue);
  // };
  // const material = [...new Set(items.map((p) => p.material))];

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

      <div
        className="mt-10 w-full grid gap-5 justify-around"
        style={{ gridTemplateColumns: "repeat(auto-fill, 300px)" }}
      >
        {valueCategory === "all" &&
          items.map((item) => <Item key={item._id} {...item} />)}
        {valueCategory === "anel" &&
          anelItems.map((item) => <Item key={item._id} {...item} />)}
        {valueCategory === "bracelete" &&
          barceleteItems.map((item) => <Item key={item._id} {...item} />)}
        {valueCategory === "brinco" &&
          brincoItems.map((item) => <Item key={item._id} {...item} />)}
        {valueCategory === "colar" &&
          colarItems.map((item) => <Item key={item._id} {...item} />)}
      </div>
    </div>
  );
};

export default ShoppingList;

