import * as Yup from "yup";
export const CreateGroupSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
  });