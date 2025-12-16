import { Controller, Get, Param, Body, HttpCode, Query } from '@nestjs/common';
import { StatusCode } from '@shared/infra/http/status';
import { ListDeliveriesService } from '@modules/deliveries/application/use-cases/find-all-deliveries.use-case';
import { DeliveryStatus } from '@modules/deliveries/domain/entities/delivery-status.interface';

@Controller('deliveries')
export class DeliveriesController {
  constructor(
    private readonly listDeliveries: ListDeliveriesService
  ) {}

  @Get()
  @HttpCode(StatusCode.Ok)
  async findAll(
    @Query('status') status?: DeliveryStatus,
  ) {
    return this.listDeliveries.execute(
      status ? status.toUpperCase() as DeliveryStatus : undefined,
    );
  }

  
}
