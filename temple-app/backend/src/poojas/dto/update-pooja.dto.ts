import { PartialType } from '@nestjs/mapped-types';
import { CreatePoojaDto } from './create-pooja.dto';

export class UpdatePoojaDto extends PartialType(CreatePoojaDto) {}
