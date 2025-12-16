import { Delivery } from '@modules/deliveries/domain/entities/delivery.entity';

export interface IDeliveryRepository {
  all(): Promise<Delivery[]>;
  
  // findById(id: string): Promise<Delivery | null>;
  // create(data: IDeliveryObject): Promise<Delivery>;
  // findByEmail(email: string): Promise<Delivery | null>;
  // update(id: string, data: Partial<Delivery>): Promise<Delivery>;
  // replace(id: string, data: Delivery): Promise<Delivery>;
  // delete(id: string): Promise<void>;

  withTransaction(trx: unknown): IDeliveryRepository;
}
