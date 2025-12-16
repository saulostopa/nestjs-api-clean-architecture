import { Module } from '@nestjs/common';
import { DeliveriesController } from './controllers/delivery.controller';
import { DeliveriesApplicationModule } from '@modules/deliveries/application/deliveries-application.use-case';

@Module({
  imports: [DeliveriesApplicationModule],
  controllers: [DeliveriesController],
})
export class DeliveriesHttpModule {}
