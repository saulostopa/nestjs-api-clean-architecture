import { Module } from '@nestjs/common';
import { DeliveriesInfraModule } from '@modules/deliveries/infra/deliveries-infra.module';
import { ListDeliveriesService } from '@modules/deliveries/application/use-cases/find-all-deliveries.use-case';

@Module({
  imports: [DeliveriesInfraModule],
  providers: [ListDeliveriesService],
  exports: [ListDeliveriesService],
})
export class DeliveriesApplicationModule {}
