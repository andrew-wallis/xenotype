import ChooseFilter from "./ChooseFilter";

function ChooseFilters({filter, handleFilter}) {

  console.log(filter);

  return (
    <div>
      <div className="mb-8">
        <h2 className="mb-2 uppercase tracking-wider text-xs leading-5 font-bold">Classification</h2>
        <ChooseFilter filterKey="classification" value="Sans" filter={filter} handleFilter={handleFilter} />
          {filter["classification"].includes("Sans") && 
            <div className="ml-2">
              <ChooseFilter filterKey="subclassification" value="Humanist" filter={filter} handleFilter={handleFilter} />
              <ChooseFilter filterKey="subclassification" value="Grotesque" filter={filter} handleFilter={handleFilter} />
              <ChooseFilter filterKey="subclassification" value="Geometric" filter={filter} handleFilter={handleFilter} />
            </div>
          }
        <ChooseFilter filterKey="classification" value="Serif" filter={filter} handleFilter={handleFilter} />
          {filter["classification"].includes("Serif") && 
            <div className="ml-2">
              <ChooseFilter filterKey="subclassification" value="Old Style" filter={filter} handleFilter={handleFilter} />
              <ChooseFilter filterKey="subclassification" value="Transitional" filter={filter} handleFilter={handleFilter} />
              <ChooseFilter filterKey="subclassification" value="Modern" filter={filter} handleFilter={handleFilter} />
              <ChooseFilter filterKey="subclassification" value="Contemporary" filter={filter} handleFilter={handleFilter} />
            </div>
          }
        <ChooseFilter filterKey="classification" value="Mono" filter={filter} handleFilter={handleFilter} />
      </div>
      <div className="mb-8">
        <h2 className="mb-2 uppercase tracking-wider text-xs leading-5 font-bold">Vibe</h2>
        <ChooseFilter filterKey="vibe" value="Clean" filter={filter} handleFilter={handleFilter} />
        <ChooseFilter filterKey="vibe" value="Friendly" filter={filter} handleFilter={handleFilter} />
        <ChooseFilter filterKey="vibe" value="Classy" filter={filter} handleFilter={handleFilter} />
        <ChooseFilter filterKey="vibe" value="Technical" filter={filter} handleFilter={handleFilter} />
      </div>
      <div className="mb-8">
        <h2 className="mb-2 uppercase tracking-wider text-xs leading-5 font-bold">Licence</h2>
        <ChooseFilter filterKey="licence" value="Google" filter={filter} handleFilter={handleFilter} />
        <ChooseFilter filterKey="licence" value="Adobe" filter={filter} handleFilter={handleFilter} />
      </div>
    </div>
  );
}

export default ChooseFilters;