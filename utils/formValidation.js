import * as Yup from "yup";
export const loginValidation = Yup.object({
  email: Yup.string().email().required("email is required"),
  password: Yup.string().min(6).max(12).required("password is required"),
});

export const singinValidation = Yup.object({
  userName: Yup.string().required("name is required").min(2).max(15),
  lastName: Yup.string().required("lastname is required").min(3),
  email: Yup.string().email().required("email is required"),
  password: Yup.string().min(6).max(12).required("password is required"),
  ConPassword: Yup.string()
    .min(6)
    .max(12)
    .oneOf([Yup.ref("password")], "password should match"),
});

export const createProductValidation = Yup.object({
  productName: Yup.string().required("product name is required"),
  productFor: Yup.string().required("product for is required"),
  category: Yup.string().required("category is required"),
  size: Yup.string(),
  color: Yup.string(),
  price: Yup.number().required("price is required"),
  description1: Yup.string().required("description1 is required"),
  description2: Yup.string().required("description2 is required"),
  description3: Yup.string().required("description3 is required"),
  description4: Yup.string().required("description4 is required"),
});
