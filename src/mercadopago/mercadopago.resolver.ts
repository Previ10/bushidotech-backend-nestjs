import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { MercadoPagoService } from './mercadopago.service';
import { CreatePreferenceDto } from './dto/preference-dto';

@Resolver()
export class MercadoPagoResolver {
  constructor(private readonly mercadoPagoService: MercadoPagoService) { }

  @Mutation(() => String)
  async createPreference(@Args('createPreferenceInput') input: CreatePreferenceDto): Promise<string> {
    const preference = await this.mercadoPagoService.crearPreferencia(input);
    return preference.init_point;
  }
}