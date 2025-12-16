import { Inject, Injectable } from '@nestjs/common';
import { IDeliveryRepository } from '@modules/deliveries/domain/interfaces/delivery-repository.interface';
import { DELIVERY_REPOSITORY } from '@modules/deliveries/domain/interfaces/delivery-repository.token';
import { UNIT_OF_WORK, UnitOfWork } from '@modules/deliveries/application/ports/unit-of-work';
import { Delivery } from '@modules/deliveries/domain/entities/delivery.entity';
import { DeliveryRepository } from '../ports/delivery-repository.port';
import { DeliveryStatus } from '@modules/deliveries/domain/entities/delivery-status.interface';

@Injectable()
export class ListDeliveriesService {
  constructor(
    @Inject(DELIVERY_REPOSITORY)
    private readonly deliveries: IDeliveryRepository,

    @Inject(UNIT_OF_WORK)
    private readonly unitOfWork: UnitOfWork,
  ) {}

  async execute(status?: DeliveryStatus): Promise<(Delivery & { isDelayed: boolean })[]> {
    const deliveries = await this.deliveries.all(
      status ? { status } : undefined,
    );

    const now = new Date();

    return deliveries.map((delivery) => {
      const hoursDiff =
        (now.getTime() - new Date(delivery.updatedAt).getTime()) / (1000 * 60 * 60);

      return {
        ...delivery,
        isDelayed: hoursDiff > 24,
      };
    });
  }
}
