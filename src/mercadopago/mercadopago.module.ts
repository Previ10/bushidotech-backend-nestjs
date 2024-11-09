import { Module } from '@nestjs/common';
import { MercadoPagoService } from './mercadoPago.service';
import { MercadoPagoResolver } from './mercadoPago.resolver';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ProductsModule], 
  providers: [MercadoPagoService, MercadoPagoResolver],
})
export class PaymentsModule {}