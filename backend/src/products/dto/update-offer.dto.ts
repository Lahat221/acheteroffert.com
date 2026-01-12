/**
 * DTO pour mettre à jour une offre existante
 * 
 * Tous les champs sont optionnels car on peut mettre à jour
 * seulement certains champs d'une offre
 */
import { PartialType } from '@nestjs/mapped-types';
import { CreateOfferDto } from './create-offer.dto';

/**
 * Utilise PartialType pour rendre tous les champs de CreateOfferDto optionnels
 * Cela évite de dupliquer le code
 */
export class UpdateOfferDto extends PartialType(CreateOfferDto) {}




