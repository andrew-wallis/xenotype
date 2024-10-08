function SelectComponent({id, label, options, action, value}) {

  const handleChange = (e) => {
    action(e.target.value);
  }

  return (
    <div >
      <label className="sr-only" htmlFor={id}>{label}</label>
      <select className="w-full py-3 px-4 h-12" id={id} value={value} onChange={handleChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select> 
    </div>
  );
}

export default SelectComponent;