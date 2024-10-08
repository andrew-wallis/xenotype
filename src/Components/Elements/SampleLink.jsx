import { forwardRef } from "react";
import Sample from "./Sample";

const SampleLink = forwardRef(({font, sampleText, action, inactive}, ref) => {

  const handleClick = (e) => {
    e.preventDefault();
    action(font);
  }

  return (
    <div className={`relative font-sample ${inactive ? "opacity-50" : "opacity-100"}`}>
      <a ref={ref} href="#" className="select-none overflow-hidden" onClick={(e) => {handleClick(e)}}>
        <Sample font={font} sampleText={sampleText} />
      </a>
    </div>
  );
});

export default SampleLink;