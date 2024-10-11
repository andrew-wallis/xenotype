import { useContext } from "react";
import { FontContext } from "../Font";
import ArticlePage from "../templates/ArticlePage";
import LandingPage from "../templates/LandingPage";
import ProductPage from "../templates/ProductPage";
import Dashboard from "../templates/Dashboard";
import LoginPage from "../templates/LoginPage";
import SettingsPage from "../templates/SettingsPage";
import FontHeader from "../FontHeader";
import SelectComponent from "../../../Elements/SelectComponent";

function FontTest() {
  
  const {templates, template, setTemplate, swap, setSwap, pairing} = useContext(FontContext);

  const getTemplate = () => {
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

  return (
    <>
      <FontHeader>
        <div className="flex">
          <div className={`grow border-gray-100 border ${Object.keys(pairing).length > 0 ? "rounded-l-lg" : "rounded-lg"} `}>
            <SelectComponent id="template-select" label="Select template" options={templates} action={setTemplate} value={template} />
          </div>
          {Object.keys(pairing).length > 0 ? 
            <div className="shrink-0">
              <button onClick={(e) => {e.preventDefault; setSwap(!swap)}} className="block py-3 px-4 border-gray-100 bg-gray-100 border rounded-r-lg leading-6 h-12">Swap</button>
            </div>
          : <></>}
        </div>
      </FontHeader>
      <main className="px-4 pb-4">
        {getTemplate()}
      </main>
    </>
  )
}

export default FontTest;