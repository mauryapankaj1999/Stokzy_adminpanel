const Textarea = ({ label, placeholder, register, error, name, rows = 5 }) => {
  return (
    <div>
      {label && (
        <label className="block mb-1 text-[14px] font-medium text-gray-700">
          {label}
        </label>
      )}

      <textarea
        rows={rows}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full rounded-lg border p-3 outline-none
        ${error ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default Textarea;
