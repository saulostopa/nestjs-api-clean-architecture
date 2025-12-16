import { Inject, Injectable } from '@nestjs/common';
import { IDeliveryRepository } from '@modules/deliveries/domain/interfaces/delivery-repository.interface';
import { DELIVERY_REPOSITORY } from '@modules/deliveries/domain/interfaces/delivery-repository.token';
import { UNIT_OF_WORK, UnitOfWork } from '@modules/deliveries/application/ports/unit-of-work';
import { Delivery } from '@modules/deliveries/domain/entities/delivery.entity';

@Injectable()
export class ListDeliveriesService {
  constructor(
    @Inject(DELIVERY_REPOSITORY)
    private readonly deliveries: IDeliveryRepository,

    @Inject(UNIT_OF_WORK)
    private readonly unitOfWork: UnitOfWork,
  ) {}

  async execute(): Promise<Delivery[]> {
    return await this.deliveries.all();
  }
}
