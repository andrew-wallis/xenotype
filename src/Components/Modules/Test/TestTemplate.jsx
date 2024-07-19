import { useContext } from "react";
import ArticleText from "./templates/ArticleText";
import Landing from "./templates/Landing";
import { AppContext } from "../../../App";
import Product from "./templates/Product";
import LoginScreen from "./templates/LoginScreen";

function TestTemplate() {

  // React Hooks

  const context = useContext(AppContext);

  switch(context.template) {
    case "Article":
      return <ArticleText />
    case "Landing Page":
      return <Landing />
    case "Product Page":
      return <Product />
    case "Log In":
      return <LoginScreen />
  }
}

export default TestTemplate;