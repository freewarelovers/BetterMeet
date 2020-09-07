import * as Yup from "yup";
export const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email("Please Enter a valide email adress")
        .required('Required'),
    password1: Yup.string()
        .min(8, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
    password2: Yup.string()
        .min(8, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
  });