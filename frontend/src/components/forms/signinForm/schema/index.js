import * as Yup from "yup";
export const SigninSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please Enter a valide email adress")
        .required('Required'),
    password: Yup.string()
        .min(8, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
  });