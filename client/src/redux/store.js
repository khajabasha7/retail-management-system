import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import networkReducer from "./networkSlice";


const store = configureStore({

  reducer: {

    cart: cartReducer,

    auth: authReducer,

    network: networkReducer

  }

});


export default store;