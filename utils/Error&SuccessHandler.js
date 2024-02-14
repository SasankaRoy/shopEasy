import { toast } from "react-toastify";

export const handleError = (error) => {
  return error.response.data.error
  // return toast.error(error.response.data.error);
};
