import "../styles/globals.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../state";
import { ItemsContextProvider } from "../components/ItemsContext";

const store = configureStore({
  reducer: { cart: cartReducer },
});

export default function App({ Component, pageProps }) {
  return (
    <ItemsContextProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ItemsContextProvider>
  );
}
