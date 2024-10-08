import Sample from "./Sample";

function SampleLink({font, sampleText, action, inactive}) {

  const handleClick = (e) => {
    e.preventDefault();
    action(font);
  }

  return (
    <div className={`relative font-sample ${inactive ? "opacity-50" : "opacity-100"}`}>
      <a href="#" className="select-none overflow-hidden" onClick={(e) => {handleClick(e)}}>
        <Sample font={font} sampleText={sampleText} />
      </a>
    </div>
  );
}

export default SampleLink;