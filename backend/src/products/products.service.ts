/**
 * Service pour la gestion des offres
 * 
 * Ce service contient toute la logique métier pour :
 * - Créer des offres
 * - Récupérer des offres (avec filtres)
 * - Mettre à jour des offres
 * - Supprimer des offres
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { QueryOffersDto } from './dto/query-offers.dto';

@Injectable()
export class ProductsService {
  /**
   * Injection du repository TypeORM pour l'entité Offer
   * Permet d'exécuter des requêtes SQL sur la table offers
   */
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {}

  /**
   * Crée une nouvelle offre
   * 
   * @param createOfferDto - Données de l'offre à créer
   * @returns L'offre créée avec son ID
   */
  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    try {
      // Convertit les dates string en objets Date si présentes
      const offerData = {
        ...createOfferDto,
        validFrom: createOfferDto.validFrom ? new Date(createOfferDto.validFrom) : null,
        validUntil: createOfferDto.validUntil ? new Date(createOfferDto.validUntil) : null,
      };

      // Crée une nouvelle instance d'offre
      const offer = this.offerRepository.create(offerData);
      
      // Sauvegarde dans la base de données
      const savedOffer = await this.offerRepository.save(offer);
      
      // Log pour vérifier que l'offre est bien enregistrée
      console.log('✅ Offre créée avec succès:', {
        id: savedOffer.id,
        title: savedOffer.title,
        vendorId: savedOffer.vendorId,
      });
      
      return savedOffer;
    } catch (error) {
      console.error('❌ Erreur lors de la création de l\'offre:', error);
      throw error;
    }
  }

  /**
   * Récupère toutes les offres avec filtres optionnels
   * 
   * @param queryDto - Paramètres de filtrage et pagination
   * @returns Liste des offres correspondant aux critères
   */
  async findAll(queryDto: QueryOffersDto): Promise<{ offers: Offer[]; total: number }> {
    const {
      city,
      category,
      featured,
      active = true,
      page = 1,
      limit = 20,
      vendorId,
    } = queryDto;

    // Construit la requête avec les filtres
    const queryBuilder = this.offerRepository.createQueryBuilder('offer');

    // Filtre par vendeur si fourni
    if (vendorId) {
      queryBuilder.andWhere('offer.vendorId = :vendorId', { vendorId });
    }

    // Filtre par ville si fourni
    if (city) {
      queryBuilder.andWhere('offer.city = :city', { city });
    }

    // Filtre par catégorie si fourni
    if (category) {
      queryBuilder.andWhere('offer.category = :category', { category });
    }

    // Filtre les offres mises en avant si demandé
    if (featured !== undefined) {
      queryBuilder.andWhere('offer.isFeatured = :featured', { featured });
    }

    // Filtre les offres actives/inactives
    if (active !== undefined) {
      queryBuilder.andWhere('offer.isActive = :active', { active });
    }

    // Charge les relations pour obtenir le nombre de réservations
    // Note: Désactivé temporairement si la table reservations n'existe pas encore
    // queryBuilder.leftJoinAndSelect('offer.reservations', 'reservation');

    // Pagination (seulement si limit est défini et > 0)
    // Si limit = 0, on récupère toutes les offres sans pagination
    if (limit !== undefined && limit > 0) {
      const skip = (page - 1) * limit;
      queryBuilder.skip(skip).take(limit);
    }

    // Tri par date de création (plus récentes en premier)
    queryBuilder.orderBy('offer.createdAt', 'DESC');

    // Exécute la requête et compte le total
    const [offers, total] = await queryBuilder.getManyAndCount();

    return { offers, total };
  }

  /**
   * Récupère une offre par son ID
   * 
   * @param id - ID de l'offre (UUID)
   * @returns L'offre trouvée
   * @throws NotFoundException si l'offre n'existe pas
   */
  async findOne(id: string): Promise<Offer> {
    const offer = await this.offerRepository.findOne({
      where: { id },
      relations: ['vendor'], // Charge aussi les informations du vendeur
    });

    if (!offer) {
      throw new NotFoundException(`Offre avec l'ID ${id} introuvable`);
    }

    return offer;
  }

  /**
   * Met à jour une offre
   * 
   * @param id - ID de l'offre à mettre à jour
   * @param updateOfferDto - Données à mettre à jour (tous les champs sont optionnels)
   * @returns L'offre mise à jour
   */
  async update(id: string, updateOfferDto: UpdateOfferDto): Promise<Offer> {
    // Vérifie que l'offre existe
    const offer = await this.findOne(id);

    // Convertit les dates string en objets Date si présentes
    const updateData: any = { ...updateOfferDto };
    if (updateOfferDto.validFrom) {
      updateData.validFrom = new Date(updateOfferDto.validFrom);
    }
    if (updateOfferDto.validUntil) {
      updateData.validUntil = new Date(updateOfferDto.validUntil);
    }

    // Met à jour l'offre
    Object.assign(offer, updateData);
    
    // Sauvegarde les modifications
    return await this.offerRepository.save(offer);
  }

  /**
   * Supprime une offre (soft delete : marque comme inactive)
   * 
   * @param id - ID de l'offre à supprimer
   * @returns Message de confirmation
   */
  async remove(id: string): Promise<{ message: string }> {
    const offer = await this.findOne(id);
    
    // Soft delete : marque l'offre comme inactive au lieu de la supprimer
    offer.isActive = false;
    await this.offerRepository.save(offer);

    return { message: `Offre ${id} désactivée avec succès` };
  }
}




