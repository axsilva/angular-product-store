import { ToastTypeEnum } from './toast-type.enum';

export interface ToastMessage {
  id?: number;
  message: string;
  type: ToastTypeEnum;
}
