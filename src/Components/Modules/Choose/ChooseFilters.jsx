import Checkbox from "../../Elements/Checkbox";

function Checkboxs({filter, handleFilter}) {

  console.log(filter);

  return (
    <div>
      <div className="mb-8">
        <h2 className="mb-2 uppercase tracking-wider text-sm leading-5 font-bold">Classification</h2>
        <Checkbox id="classification" value="Sans" callback={handleFilter} checked={filter["classification"].includes("Sans") ? true : false} />
          {filter["classification"].includes("Sans") && 
            <div className="ml-2">
              <Checkbox id="subclassification" value="Humanist" callback={handleFilter} checked={filter["subclassification"].includes("Humanist") ? true : false}/>
              <Checkbox id="subclassification" value="Grotesque" callback={handleFilter} checked={filter["subclassification"].includes("Grotesque") ? true : false}/>
              <Checkbox id="subclassification" value="Geometric" callback={handleFilter} checked={filter["subclassification"].includes("Geometric") ? true : false}/>
            </div>
          }
        <Checkbox id="classification" value="Serif" callback={handleFilter} checked={filter["classification"].includes("Serif") ? true : false}/>
          {filter["classification"].includes("Serif") && 
            <div className="ml-2">
              <Checkbox id="subclassification" value="Old Style" callback={handleFilter} checked={filter["subclassification"].includes("Old Style") ? true : false}/>
              <Checkbox id="subclassification" value="Transitional" callback={handleFilter} checked={filter["subclassification"].includes("Transitional") ? true : false} />
              <Checkbox id="subclassification" value="Modern" callback={handleFilter} checked={filter["subclassification"].includes("Modern") ? true : false} />
              <Checkbox id="subclassification" value="Contemporary" callback={handleFilter} checked={filter["subclassification"].includes("Contemporary") ? true : false} />
              <Checkbox id="subclassification" value="Slab" callback={handleFilter} checked={filter["subclassification"].includes("Slab") ? true : false} />
            </div>
          }
        <Checkbox id="classification" value="Mono" callback={handleFilter} checked={filter["classification"].includes("Mono") ? true : false}/>
      </div>
      <div className="mb-8">
        <h2 className="mb-2 uppercase tracking-wider text-sm leading-5 font-bold">Vibe</h2>
        <Checkbox id="vibe" value="Neutral" callback={handleFilter} checked={filter["vibe"].includes("Neutral") ? true : false}/>
        <Checkbox id="vibe" value="Quirky" callback={handleFilter} checked={filter["vibe"].includes("Quirky") ? true : false}/>
        <Checkbox id="vibe" value="Elegant" callback={handleFilter} checked={filter["vibe"].includes("Elegant") ? true : false}/>
        <Checkbox id="vibe" value="Technical" callback={handleFilter} checked={filter["vibe"].includes("Technical") ? true : false} />
      </div>
      <div className="mb-8">
        <h2 className="mb-2 uppercase tracking-wider text-sm leading-5 font-bold">Licence</h2>
        <Checkbox id="licence" value="Google" callback={handleFilter} checked={filter["licence"].includes("Google") ? true : false}/>
        <Checkbox id="licence" value="Adobe" callback={handleFilter} checked={filter["licence"].includes("Adobe") ? true : false}/>
      </div>
    </div>
  );
}

export default Checkboxs;