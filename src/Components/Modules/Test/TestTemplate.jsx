import ArticlePage from "./templates/ArticlePage";
import LandingPage from "./templates/LandingPage";
import ProductPage from "./templates/ProductPage";
import LoginPage from "./templates/LoginPage";
import Dashboard from "./templates/Dashboard";

function TestTemplate({template}) {

  // React Hooks

  switch(template) {
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