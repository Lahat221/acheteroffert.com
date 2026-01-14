/**
 * DTO pour mettre à jour un vendeur
 * 
 * Tous les champs sont optionnels
 */
import { PartialType } from '@nestjs/mapped-types';
import { CreateVendorDto } from './create-vendor.dto';

export class UpdateVendorDto extends PartialType(CreateVendorDto) {}






