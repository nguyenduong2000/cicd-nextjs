import * as yup from 'yup';

const yupComment = yup.object().shape({
  name: yup
    .string()
    .required('Please enter your name.')
    .trim('Please remove space')
    .strict()
    .default(''),
  email: yup
    .string()
    .required('Please enter your email.')
    .trim('Please remove space')
    .strict()
    .default(''),
  comment: yup.string().trim('Please remove space').strict().default('')
});

export type IComment = yup.InferType<typeof yupComment>;

export { yupComment };
