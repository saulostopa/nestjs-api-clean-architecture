// src/modules/deliveries/http/dtos/list-deliveries.query.ts
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { DeliveryStatus } from '@modules/deliveries/domain/entities/delivery-status.interface';
import { Type } from 'class-transformer';

export class ListDeliveriesQuery {
  @IsOptional()
  @IsEnum(DeliveryStatus, {
    message:
      'Invalid status. Allowed values: Pending, InTransit, Delivered',
  })
  status?: DeliveryStatus;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'limit must be an integer' })
  @Min(1, { message: 'limit must be at least 1' })
  @Max(100, { message: 'limit cannot be greater than 100' })
  limit?: number;
}
