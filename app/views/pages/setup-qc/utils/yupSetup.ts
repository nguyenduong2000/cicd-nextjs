import * as yup from 'yup';

const yupSetup = yup.object().shape({
  qc_api_user_id: yup.string().required('Please enter api user Id.'),
  qc_api_token: yup.string().required('Please enter api token.'),
  qc_project_id: yup.string().required('Please enter project Id.'),
  user_id: yup.string(),
  id: yup.string(),
  modified_at: yup.date()
});

export type ISetup = yup.InferType<typeof yupSetup>;

export { yupSetup };
