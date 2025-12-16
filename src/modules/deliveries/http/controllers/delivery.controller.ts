import { Controller, Get, Param, Body, HttpCode, Query } from '@nestjs/common';
import { StatusCode } from '@shared/infra/http/status';
import { ListDeliveriesService } from '@modules/deliveries/application/use-cases/find-all-deliveries.use-case';
import { DeliveryStatus } from '@modules/deliveries/domain/entities/delivery-status.interface';
import { ListDeliveriesQuery } from '@modules/deliveries/application/use-cases/list-query-deliveries.use-case';

@Controller('deliveries')
export class DeliveriesController {
  constructor(
    private readonly listDeliveries: ListDeliveriesService
  ) {}

  @Get()
  @HttpCode(StatusCode.Ok)
  async findAll(
    @Query() query: ListDeliveriesQuery,
  ) {
    return this.listDeliveries.execute(query.status);
  }

  
}
