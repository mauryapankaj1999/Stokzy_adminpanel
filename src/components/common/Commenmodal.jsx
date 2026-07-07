import react from "react";

export default function Commenmodal({children}) {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[55]"></div>
      <div className="fixed inset-0 flex items-center justify-center z-[60]">
        <div className="mx-auto w-[35%] bg-white rounded-lg p-4  relative">
         {children}
        </div>
      </div>
    </>
  );
}
