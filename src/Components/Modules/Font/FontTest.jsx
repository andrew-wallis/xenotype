import { useContext } from "react";
import { FontContext } from "./Font";
import ArticlePage from "./templates/ArticlePage";
import LandingPage from "./templates/LandingPage";
import ProductPage from "./templates/ProductPage";
import Dashboard from "./templates/Dashboard";
import LoginPage from "./templates/LoginPage";
import SettingsPage from "./templates/SettingsPage";

function FontTest() {

  const {template} = useContext(FontContext);

  switch(template) {
    case "Article":
      return <ArticlePage/>;
    case "Landing Page":
      return <LandingPage/>;
    case "Product Page":
      return <ProductPage />;
    case "Dashboard":
      return <Dashboard />;
    case "Log In":
      return <LoginPage />;
    case "Settings":
      return <SettingsPage />
  }
}

export default FontTest;