import React from "react";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className="w-full">
      <label className="flex" htmlFor={props.input.id}>
        {props.title}
        {props.isInvalid && (
          <div className="pr-4 text-rose-500 text-sm">{props.message}</div>
        )}
      </label>

      <input
        {...props.input}
        ref={ref}
        className="w-full bg-transparent my-2 border-gray-300 border rounded p-2 placeholder:text-sm focus:outline-gray-400"
      />
    </div>
  );
});

export default Input;
