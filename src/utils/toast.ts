import toast from "react-hot-toast";

export const showSuccess = (message: string) => {
    console.log(message);
  // toast.error(message);
  toast.success(message);
};


export const showError = (message: string) => {
   console.log(message);
  toast.error(message);
};