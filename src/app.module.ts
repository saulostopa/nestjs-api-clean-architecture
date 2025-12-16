import { Module } from '@nestjs/common'
import { UsersHttpModule } from '@modules/users/http/users-http.module'
import { DeliveriesHttpModule } from '@modules/deliveries/http/deliveries-http.module'

@Module({
  imports: [
    UsersHttpModule,
    DeliveriesHttpModule,
  ],
})
export class AppModule {}
