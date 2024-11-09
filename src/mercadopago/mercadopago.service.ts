import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { ProductsService } from 'src/products/products.service';
import { CreatePreferenceDto } from './dto/preference-dto';

@Injectable()
export class MercadoPagoService {
  private client: MercadoPagoConfig;
  private preference: Preference;

  constructor(
    private readonly productsService: ProductsService, 
  ) {
    this.client = new MercadoPagoConfig({
      accessToken: 'APP_USR-8908389167604670-110618-be1fc25903d6f47220e313787c83102c-2082910792'
    });
    this.preference = new Preference(this.client);
  }

  async crearPreferencia(createPreferenceDto: CreatePreferenceDto): Promise<any> {
    const { productId, quantity } = createPreferenceDto;

    const product = await this.productsService.findOne(productId);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
 
    const preferenceData = {
      items: [
        {
          id: product.id,
          title: product.name,
          unit_price: product.precio, 
          quantity,
          currency_id: 'ARS',
        },
      ],
      back_urls: {
        success: 'http://localhost:5173/',
        failure: 'http://localhost:5173/',
        pending: 'http://localhost:5173/',
      },
      auto_return: 'approved',
    };

    try {
      const response = await this.preference.create({ body: preferenceData });
      return response;
    } catch (error) {
      throw new Error(`Error al crear la preferencia de pago: ${error.message}`);
    }
  }
}