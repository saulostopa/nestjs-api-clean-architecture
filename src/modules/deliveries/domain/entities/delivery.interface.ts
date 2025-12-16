import { DeliveryStatus } from './delivery-status.interface';
export interface IDeliveryObject {
  hospital: string;
  deviceName: string;
  status: DeliveryStatus;
  createdAt?: Date;
  updatedAt?: Date;
  isDelayed?: boolean;
}