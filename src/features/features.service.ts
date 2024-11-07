import { Injectable } from '@nestjs/common';
import { FeatureInput } from './dto/create-feature.input';
import { UpdateFeatureInput } from './dto/update-feature.input';

@Injectable()
export class FeaturesService {
  create(createFeatureInput: FeatureInput) {
    return 'This action adds a new feature';
  }

  findAll() {
    return `This action returns all features`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feature`;
  }

  update(id: number, updateFeatureInput: UpdateFeatureInput) {
    return `This action updates a #${id} feature`;
  }

  remove(id: number) {
    return `This action removes a #${id} feature`;
  }
}
