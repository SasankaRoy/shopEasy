import { toast } from "react-toastify";

export const handleError = (error) => {
  return toast.error(error.response.data.error);
};
