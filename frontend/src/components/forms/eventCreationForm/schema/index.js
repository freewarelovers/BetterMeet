import * as Yup from "yup";

export const CreateEventSchema = Yup.object().shape({
    name : Yup.string()
    .min(5, 'Too Short!')
    .max(200, 'Too Long!')
    .required('Required'),

    description : Yup.string()
    .min(15, 'Too Short!')
    .max(1000, 'Too Long!')
    .required('Required'),

    position :  Yup.string()
    .min(4, 'Too Short!')
    .max(400, 'Too Long!')
    .required('Required'),

    startAt : Yup.date()
    .required('Required'),
    
    endAt : Yup.date()
    .required('Required')
})