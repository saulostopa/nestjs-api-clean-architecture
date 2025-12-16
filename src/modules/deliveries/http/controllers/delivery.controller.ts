import { Controller, Get, Param, Body, HttpCode } from '@nestjs/common';
import { StatusCode } from '@shared/infra/http/status';
import { ListDeliveriesService } from '@modules/deliveries/application/use-cases/find-all-deliveries.use-case';

@Controller('deliveries')
export class DeliveriesController {
  constructor(
    private readonly listDeliveries: ListDeliveriesService
  ) {}

  @Get()
  @HttpCode(StatusCode.Ok)
  async findAll() {
    return this.listDeliveries.execute();
  }

  
}
