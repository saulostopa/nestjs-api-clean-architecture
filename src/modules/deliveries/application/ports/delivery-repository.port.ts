import { Delivery } from '@modules/deliveries/domain/entities/delivery.entity';
import { DeliveryStatus } from '@modules/deliveries/domain/entities/delivery-status.interface';

export interface FindAllDeliveriesFilter {
  status?: DeliveryStatus;
}

export interface DeliveryRepository {
  findAll(filter?: FindAllDeliveriesFilter): Promise<Delivery[]>;
}
