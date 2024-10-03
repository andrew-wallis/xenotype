import getFontStylesheet from "../../../../utils/getFontStylesheet";
import getFontFamily from "../../../../utils/getFontFamily";
import { useContext } from "react";
import { AppContext } from "../../../../App";
import { FontContext } from "../Font";

function ArticlePage() {

  const context = useContext(AppContext);
  const contextFont = useContext(FontContext);

  const thisFont = Object.keys(contextFont.alternative).length > 0 ? contextFont.alternative : context.activeFont;
  const pairingFont = Object.keys(contextFont.pairing).length > 0 ? contextFont.pairing : context.activeFont;

  const title = {
    fontFamily: getFontFamily(thisFont, "rg"),
    fontSize: `${2.25 / thisFont.adjust}rem`,
    lineHeight: "2.25rem"
  }

  const heading = {
    fontFamily: getFontFamily(thisFont, "rg"),
    fontSize: `${1.5 / thisFont.adjust}rem`,
    lineHeight: "1.75rem"
  }

  const subheading = {
    fontFamily: getFontFamily(thisFont, "rg"),
    fontSize: `${1.5 / thisFont.adjust}rem`,
    lineHeight: "1.8rem"
  }

  const lede = {
    fontFamily: getFontFamily(pairingFont, "rg"),
    fontSize: `${1.125 / pairingFont.adjust}rem`,
    lineHeight: "1.7rem"
  }

  const paragraph = {
    fontFamily: getFontFamily(pairingFont, "rg"),
    fontSize: `${1 / pairingFont.adjust}rem`,
    lineHeight: "1.5rem"
  }

  const small = {
    fontFamily: getFontFamily(pairingFont, "rg"),
    fontSize: `${0.875 / pairingFont.adjust}rem`,
    lineHeight: "1rem"
  }

  const quote = {
    fontFamily: getFontFamily(pairingFont, "rg"),
    fontSize: `${1.125 / pairingFont.adjust}rem`,
    lineHeight: "1.7rem"
  }

  const caption = {
    fontFamily: getFontFamily(pairingFont, "rg"),
    fontSize: `${0.75 / pairingFont.adjust}rem`,
    lineHeight: "0.875rem"
  }

  return (
    <div className="max-w-xl mx-auto">
      <style>
        @import url('{getFontStylesheet(thisFont, ["rg"])}');
        @import url('{getFontStylesheet(pairingFont, ["rg"])}');
      </style>
      <h1 style={{ ...title}} className="mb-8 font-semibold">Font Trends in 2024</h1>
      <p style={{...lede}} className="mb-4 font-medium">2024 sees fonts as dynamic tools, shaping design trends and reflecting digital evolution.</p>
      <ul className="flex gap-4 text-gray-800 dark:text-gray-300 mb-8" style={{...small}}>
        <li>Emily Jones</li>
        <li>4 April 2024</li>
      </ul>
      <p style={{ ...paragraph}} className="my-6">Typography has always been a crucial element in design, influencing how  information is perceived and communicated. In recent years, we've witnessed significant shifts in font preferences, driven by advancements in technology and changing design philosophies. As we navigate through 2024, the world of fonts is embracing innovation and experimentation like never before. Let's explore the prominent font trends defining this year.</p>
      <div className="pt-[50%] bg-gray-100 dark:bg-gray-900/50 mb-2"></div>
      <div style={{...caption}} className="text-right mb-8 opacity-80"><span className="opacity-80">Photo by</span> Brands&People <span className="opacity-80">on</span> Unsplash</div>
      <h2 style={{ ...heading}} className="mt-9 mb-6 font-semibold">Minimalist Fonts</h2>
      <p style={{ ...paragraph}} className="my-6">In 2024, the mantra "less is more" echoes throughout the design realm, manifesting in the prevalence of minimalist fonts. Embracing simplicity, these typefaces exude elegance and clarity, offering a timeless appeal across various platforms. With clean lines and ample white space, minimalist fonts enhance readability while maintaining a sense of sophistication. From sleek sans-serifs to refined serifs, designers are harnessing the power of simplicity to create visually striking compositions that resonate with modern audiences.</p>
      <blockquote className="px-6 my-6 italic text-gray-800 dark:text-gray-300" style={{...quote}}>“In a world cluttered with information, minimalist fonts offer a breath of fresh air, allowing content to shine with clarity and elegance.”</blockquote>
      <p style={{ ...paragraph}} className="my-6">The rise of minimalist fonts can be attributed to their versatility and adaptability across different mediums. Whether adorning a sleek website interface or gracing the pages of a printed publication, these fonts seamlessly integrate with diverse design elements, fostering a harmonious visual experience. By prioritizing legibility and aesthetic refinement  minimalist fonts empower brands to communicate their message effectively while leaving a lasting impression on their audience.</p>
      <p style={{ ...paragraph}} className="my-6">As we navigate the digital age, minimalist fonts serve as a beacon of simplicity in a sea of complexity, guiding us towards a more refined and visually engaging future.</p>
      <h2 style={{ ...heading}} className="mt-9 mb-6 font-semibold">Variable Fonts</h2>
      <p style={{ ...paragraph}} className="my-6">Enter the era of dynamic typography with the advent of variable fonts, revolutionizing the way we perceive and utilize typefaces. Offering unprecedented flexibility, variable fonts encapsulate a spectrum of styles within a single font file, allowing designers to tailor typography with precision and fluidity. From adjusting weight and width to fine-tuning optical size, the possibilities are limitless, enabling seamless adaptation across various screen sizes and devices.</p>
      <blockquote className="px-6 my-6 italic text-gray-800 dark:text-gray-300" style={{...quote}}>“Variable fonts usher in a new era of typographic versatility, empowering designers to craft dynamic compositions with unparalleled precision and fluidity.”</blockquote>
      <p style={{ ...paragraph}} className="my-6">With the growing demand for responsive design, variable fonts emerge as a game-changer, streamlining the optimization process without compromising visual integrity. By eliminating the need for multiple font files, these adaptable typefaces enhance performance and accessibility, ensuring a consistent user experience across diverse digital platforms. From enhancing readability on mobile devices to optimizing loading times on web pages, variable fonts pave the way for a more accessible and inclusive digital landscape.</p>
      <p style={{ ...paragraph}} className="my-6">As technology continues to evolve, variable fonts stand at the forefront of typographic innovation, reshaping the way we interact with content in the digital sphere.</p>
      <h2 style={{ ...heading}} className="mt-9 mb-6 font-semibold">Experimental Typography</h2>
      <p style={{ ...paragraph}} className="my-6">In the avant-garde realm of design, experimental typography reigns supreme, pushing the boundaries of conventional aesthetics and challenging the status quo. Embracing bold forms, vibrant colors, and unconventional layouts, experimental typography captivates the imagination, sparking dialogue and evoking emotion. From typographic illusions to kinetic typography, designers are harnessing the power of experimentation to create immersive experiences that captivate and inspire.</p>
      <blockquote className="px-6 my-6 italic text-gray-800 dark:text-gray-300" style={{...quote}}>“Experimental typography defies expectations, inviting audiences on a journey of visual exploration and discovery, where creativity knows no bounds.”</blockquote>
      <p style={{ ...paragraph}} className="my-6">Fuelled by innovation and artistic expression, experimental typography transcends traditional constraints, blurring the lines between art and design. By embracing risk-taking and pushing the limits of typographic expression, designers breathe life into static content, transforming words into dynamic visual narratives that resonate with audiences on a deeper level. From interactive installations to multimedia presentations, experimental typography offers a glimpse into the boundless possibilities of creative expression in the digital age.</p>
      <p style={{ ...paragraph}} className="my-6">As we embrace the spirit of experimentation, experimental typography serves as a catalyst for innovation, paving the way for new forms of visual storytelling and creative expression.</p>
      <p style={{ ...paragraph}} className="my-6">In the dynamic landscape of design, fonts serve as the cornerstone of visual communication, shaping the way we perceive and interact with content. As we traverse the typography trends of 2024, from the elegant simplicity of minimalist fonts to the dynamic versatility of variable fonts and the daring experimentation of avant-garde typography, one thing remains clear: the power of typography to captivate, inspire, and evoke emotion knows no bounds. As we embark on this typographic journey, let us embrace the endless possibilities of creative expression, forging a path towards a more vibrant and visually engaging future.</p>
    </div>
  );
}

export default ArticlePage;