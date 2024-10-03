import { useContext, useEffect, useRef } from "react";
import { FontContext } from "./Font";
import ArticlePage from "./templates/ArticlePage";

function FontTest() {

  const contextFont = useContext(FontContext);

  const topRef = useRef(null);

  useEffect(() => {
    if(topRef.current) {
      topRef.current.scrollIntoView({
        behavior: 'instant',
        block: 'start',
        inline: 'nearest'
      })
    }
  }, [contextFont.activeModule, contextFont.template]);

  switch(contextFont.template) {
    case "Article":
      return (
        <>
          <div className="pb-4" ref={topRef}></div>
          <ArticlePage/>
        </>
      )
  }
}

export default FontTest;