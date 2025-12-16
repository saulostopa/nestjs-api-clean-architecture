// src/modules/deliveries/http/dtos/list-deliveries.query.ts
import { IsEnum, IsOptional } from 'class-validator';
import { DeliveryStatus } from '@modules/deliveries/domain/entities/delivery-status.interface';

export class ListDeliveriesQuery {
  @IsOptional()
  @IsEnum(DeliveryStatus, {
    message: `status must be one of: ${Object.values(DeliveryStatus).join(', ')}`,
  })
  status?: DeliveryStatus;
}
