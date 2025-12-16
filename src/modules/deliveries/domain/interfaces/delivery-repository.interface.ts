import { Delivery } from '@modules/deliveries/domain/entities/delivery.entity';
import { DeliveryStatus } from '@modules/deliveries/domain/entities/delivery-status.interface';
export interface FindAllDeliveriesFilter {
  status?: DeliveryStatus;
  limit?: number;
}
export interface IDeliveryRepository {
  all(params?: FindAllDeliveriesFilter): Promise<Delivery[]>;
  
  withTransaction(trx: unknown): IDeliveryRepository;
}
