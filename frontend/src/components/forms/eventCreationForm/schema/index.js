import * as Yup from "yup";

export const CreateEventSchema = Yup.object().shape({
    name : Yup.string()
    .min(5, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),

    description : Yup.string()
    .min(20, 'Too Short!')
    .max(1000, 'Too Long!')
    .required('Required'),

    position :  Yup.string()
    .min(10, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),

    startAt : Yup.date()
    .min(10, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required')
})