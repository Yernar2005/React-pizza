import React from "react";
import { Route, Routes } from "react-router-dom";

import "./scss/app.scss";
import Header from "./components/Search/Header";

import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart.html" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
