import { Module } from '@nestjs/common';
import { PrismaModule } from '@shared/database/prisma/prisma.module';
import { PrismaDeliveryRepository } from '@modules/deliveries/infra/database/prisma-delivery.repository';
import { DELIVERY_REPOSITORY } from '@modules/deliveries/domain/interfaces/delivery-repository.token';
import { UNIT_OF_WORK } from '@modules/deliveries/application/ports/unit-of-work';
import { PrismaUnitOfWork } from '@modules/deliveries/infra/database/prisma-unit-of-work';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: DELIVERY_REPOSITORY,
      useClass: PrismaDeliveryRepository,
    },
    {
      provide: UNIT_OF_WORK,
      useClass: PrismaUnitOfWork,
    }
  ],
  exports: [DELIVERY_REPOSITORY, UNIT_OF_WORK],
})
export class DeliveriesInfraModule {}
