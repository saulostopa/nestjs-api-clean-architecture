import { Delivery } from '@modules/deliveries/domain/entities/delivery.entity';
import { PrismaService } from '@shared/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { IDeliveryRepository, FindAllDeliveriesFilter } from '@modules/deliveries/domain/interfaces/delivery-repository.interface';

@Injectable()
export class PrismaDeliveryRepository implements IDeliveryRepository {
  constructor(private readonly prisma: PrismaService) {}

  withTransaction(trx: unknown): IDeliveryRepository {
    return new PrismaDeliveryRepository(trx as PrismaService);
  }

  async all(filter?: FindAllDeliveriesFilter): Promise<Delivery[]> {
    const delivery = await this.prisma.delivery.findMany({
      where: {
        status: filter?.status,
      },
    });
    return delivery.map((delivery) => this.toDomain(delivery));
  }

  private toDomain(prismaDelivery: any): Delivery {
    return new Delivery(
      prismaDelivery.id,
      prismaDelivery.hospital,
      prismaDelivery.deviceName,
      prismaDelivery.status,
      prismaDelivery.createdAt,
      prismaDelivery.updatedAt,
    );
  }
}
