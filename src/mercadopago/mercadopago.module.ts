import { Module } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';
import { MercadoPagoResolver } from './mercadopago.resolver';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ProductsModule], 
  providers: [MercadoPagoService, MercadoPagoResolver],
})
export class PaymentsModule {}