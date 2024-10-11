import Sample from "./Sample";

function SampleLink({font, action, inactive}) {

  const handleClick = (e) => {
    e.preventDefault();
    action(font);
  }

  return (
    <div className={`relative font-sample ${inactive ? "opacity-50" : "opacity-100"}`}>
      <a href="#" className="select-none overflow-hidden" onClick={(e) => {handleClick(e)}}>
        <Sample font={font}/>
      </a>
    </div>
  );
}

export default SampleLink;