import { ISetup } from './yupSetup';

export interface IResponseSetup extends ISetup {
  decrypted_qc_api_token: string;
  decrypted_qc_api_user_id: string;
}
