import React from "react";

const SelectInput = React.forwardRef((props, ref) => {
  return (
    <div className="w-full">
      <label htmlFor={props.id}>{props.title} </label>
      <select
        className="w-full bg-transparent mt-2 border border-gray-300 focus:outline-gray-400 rounded p-2  "
        id={props.id}
        ref={ref}
      >
        {props.options && props.options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
});

export default SelectInput;
