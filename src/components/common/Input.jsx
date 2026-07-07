const Input = ({
  label,
  type = "text",
  placeholder = "",
  register,
  name,
  validation = {},
  error,
  ...rest
}) => {
  return (
    <div>
      {label && (
        <label className="block mb-1 text-[12px] font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        {...register(name, validation)}
        {...rest}
        className={`w-full rounded-md border px-3  text-[14px] py-2 outline-none transition-all
        ${error ? "border-red-500" : "border-gray-300 focus:border-primary"}`}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default Input;
