import * as Yup from "yup";

const phoneNumberReg = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

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

export const shippingValidation = Yup.object({
  fullName: Yup.string().required("name is a required"),
  email: Yup.string().email().required("email is a required"),
  phoneNumber: Yup.string().matches(phoneNumberReg, 'phone number is not valid').max(10, 'too long').min(10, 'too short').required("phoneNumber is a required"),
  alternatePhoneNumber: Yup.string().matches(phoneNumberReg, 'phone number is not vali').max(10, 'too long').min(10, 'too short').required('alternative phone number is a required'),
  fullAddress:Yup.string().required("address is required"),
  country:Yup.string().required("country is required"),
  payMethod:Yup.string().required("pay method is required")
})
