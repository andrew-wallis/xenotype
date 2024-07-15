import { useContext } from "react";
import { AppContext } from "../../../../App";
import getFontStylesheet from "../../../../utils/getFontStylesheet";
import getFontFamily from "../../../../utils/getFontFamily";

function Article() {

  const context = useContext(AppContext);

  const pairingFont = context.pairing ? context.secondaryFont : context.primaryFont;

  const title = {
    fontFamily: getFontFamily(context.primaryFont, "rg"),
    fontSize: `${3 / context.primaryFont.adjust}rem`,
    lineHeight: 1.2
  }

  const heading = {
    fontFamily: getFontFamily(context.primaryFont, "rg"),
    fontSize: `${2 / context.primaryFont.adjust}rem`,
    lineHeight: 1.2
  }

  const subheading = {
    fontFamily: getFontFamily(context.primaryFont, "rg"),
    fontSize: `${1.5 / context.primaryFont.adjust}rem`,
    lineHeight: 1.2
  }

  const paragraph = {
    fontFamily: getFontFamily(pairingFont, "rg"),
    fontSize: `${1.125 / pairingFont.adjust}rem`,
    lineHeight: 1.5
  }

  return (
    <div className="max-w-prose">
      <style>
        @import url('{getFontStylesheet(context.primaryFont, ["rg"])}');
        @import url('{getFontStylesheet(context.secondaryFont, ["rg"])}');
      </style>
      <h1 style={{ ...title}} className="mb-12 font-semibold">The Art and Science of Web and Software Design</h1>
      <p style={{ ...paragraph}} className="my-6">Designing intuitive and engaging web and software interfaces requires a unique blend of creativity and analytical thinking. A designer must ensure that every pixel and element is aligned perfectly, creating a harmonious visual experience. Quick feedback loops, zigzag patterns in user testing, and the ability to adapt to new challenges are essential. The ultimate goal is to craft an interface that enables users to accomplish tasks efficiently and enjoyably, whether they're inputting data in a web form or navigating through complex software features. Understanding user behavior is crucial, as is the ability to quickly iterate on designs based on feedback and testing.</p>
      <h2 style={{ ...heading}} className="mt-12 mb-9 font-semibold">Balancing Aesthetics and Functionality</h2>
      <p style={{ ...paragraph}} className="my-6">In the realm of web and software design, striking the perfect balance between aesthetics and functionality is imperative. An interface that is visually appealing can significantly enhance the user experience, yet it must also function seamlessly across different devices and screen sizes. Designers often utilize a mix of fonts, color palettes, and graphical elements to create a distinctive look, while ensuring that every element serves a purpose. Features like responsive design, keyboard shortcuts, and accessible navigation are integral, allowing users to interact with the software in a way that feels natural and intuitive.</p>
      <h3 style={{ ...subheading}} className="mt-9 mb-6 font-semibold">Future Trends and Innovations</h3>
      <p style={{ ...paragraph}} className="my-6">Looking ahead, the landscape of web and software design is set to evolve dramatically with the advent of new technologies and methodologies. Innovations such as artificial intelligence, augmented reality, and quantum computing are poised to revolutionize how designers approach their craft. In this new paradigm, quick prototyping and iterative testing will become even more critical. Moreover, designers will need to stay adept with numerical analysis tools to measure user engagement and performance metrics accurately. Embracing these trends will not only enhance the designer's toolkit but also elevate the user experience to new heights, making each interaction more engaging and effective.</p>
    </div>
  );
}

export default Article;