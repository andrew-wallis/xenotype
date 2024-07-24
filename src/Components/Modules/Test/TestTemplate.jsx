import { useContext } from "react";
import { AppContext } from "../../../App";
import ArticlePage from "./templates/ArticlePage";
import LandingPage from "./templates/LandingPage";
import ProductPage from "./templates/ProductPage";
import LoginPage from "./templates/LoginPage";
import Dashboard from "./templates/Dashboard";

function TestTemplate() {

  // React Hooks

  const context = useContext(AppContext);

  switch(context.template) {
    case "Article":
      return <ArticlePage />
    case "Landing Page":
      return <LandingPage />
    case "Product Page":
      return <ProductPage />
    case "Dashboard":
      return <Dashboard />
    case "Log In":
      return <LoginPage />
  }
}

export default TestTemplate;