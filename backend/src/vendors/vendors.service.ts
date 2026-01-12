/**
 * Service pour la gestion des vendeurs
 * 
 * Ce service contient toute la logique métier pour :
 * - Créer des vendeurs (inscription)
 * - Authentifier les vendeurs (login)
 * - Récupérer les informations d'un vendeur
 * - Mettre à jour un vendeur
 */
import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Vendor } from './entities/vendor.entity';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { LoginVendorDto } from './dto/login-vendor.dto';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
  ) {}

  /**
   * Crée un nouveau vendeur (inscription)
   * 
   * @param createVendorDto - Données du vendeur à créer
   * @returns Le vendeur créé (sans le mot de passe)
   */
  async create(createVendorDto: CreateVendorDto): Promise<Omit<Vendor, 'passwordHash'>> {
    // Vérifie si un vendeur avec cet email existe déjà
    const existingVendor = await this.vendorRepository.findOne({
      where: { email: createVendorDto.email },
    });

    if (existingVendor) {
      throw new ConflictException('Un vendeur avec cet email existe déjà');
    }

    // Hash le mot de passe avec bcrypt
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(createVendorDto.password, saltRounds);

    // Crée le vendeur
    const vendor = this.vendorRepository.create({
      ...createVendorDto,
      passwordHash,
    });

    // Sauvegarde dans la base de données
    const savedVendor = await this.vendorRepository.save(vendor);

    // Retourne le vendeur sans le mot de passe
    const { passwordHash: _, ...vendorWithoutPassword } = savedVendor;
    return vendorWithoutPassword;
  }

  /**
   * Authentifie un vendeur (login)
   * 
   * @param loginVendorDto - Email et mot de passe
   * @returns Le vendeur authentifié (sans le mot de passe)
   * @throws UnauthorizedException si les identifiants sont incorrects
   */
  async login(loginVendorDto: LoginVendorDto): Promise<Omit<Vendor, 'passwordHash'>> {
    // Trouve le vendeur par email
    const vendor = await this.vendorRepository.findOne({
      where: { email: loginVendorDto.email },
    });

    if (!vendor) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    // Vérifie si le vendeur est actif
    if (!vendor.isActive) {
      throw new UnauthorizedException('Votre compte a été désactivé. Contactez l\'administrateur.');
    }

    // Vérifie le mot de passe
    const isPasswordValid = await bcrypt.compare(loginVendorDto.password, vendor.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    // Retourne le vendeur sans le mot de passe
    const { passwordHash: _, ...vendorWithoutPassword } = vendor;
    return vendorWithoutPassword;
  }

  /**
   * Récupère un vendeur par son ID
   * 
   * @param id - ID du vendeur (UUID)
   * @returns Le vendeur trouvé (sans le mot de passe)
   * @throws NotFoundException si le vendeur n'existe pas
   */
  async findOne(id: string): Promise<Omit<Vendor, 'passwordHash'>> {
    const vendor = await this.vendorRepository.findOne({
      where: { id },
      relations: ['offers', 'subscriptions'], // Charge aussi les offres et abonnements
    });

    if (!vendor) {
      throw new NotFoundException(`Vendeur avec l'ID ${id} introuvable`);
    }

    // Retourne le vendeur sans le mot de passe
    const { passwordHash: _, ...vendorWithoutPassword } = vendor;
    return vendorWithoutPassword;
  }

  /**
   * Récupère un vendeur par son email
   * 
   * @param email - Email du vendeur
   * @returns Le vendeur trouvé (sans le mot de passe)
   */
  async findByEmail(email: string): Promise<Omit<Vendor, 'passwordHash'> | null> {
    const vendor = await this.vendorRepository.findOne({
      where: { email },
    });

    if (!vendor) {
      return null;
    }

    const { passwordHash: _, ...vendorWithoutPassword } = vendor;
    return vendorWithoutPassword;
  }

  /**
   * Met à jour un vendeur
   * 
   * @param id - ID du vendeur à mettre à jour
   * @param updateVendorDto - Données à mettre à jour
   * @returns Le vendeur mis à jour (sans le mot de passe)
   */
  async update(id: string, updateVendorDto: UpdateVendorDto): Promise<Omit<Vendor, 'passwordHash'>> {
    const vendor = await this.vendorRepository.findOne({
      where: { id },
    });

    if (!vendor) {
      throw new NotFoundException(`Vendeur avec l'ID ${id} introuvable`);
    }

    // Si un nouveau mot de passe est fourni, le hash
    if (updateVendorDto.password) {
      const saltRounds = 10;
      updateVendorDto.password = await bcrypt.hash(updateVendorDto.password, saltRounds) as any;
      // Renomme password en passwordHash pour correspondre à l'entité
      (updateVendorDto as any).passwordHash = updateVendorDto.password;
      delete (updateVendorDto as any).password;
    }

    // Met à jour le vendeur
    Object.assign(vendor, updateVendorDto);
    
    // Sauvegarde les modifications
    const updatedVendor = await this.vendorRepository.save(vendor);

    // Retourne le vendeur sans le mot de passe
    const { passwordHash: _, ...vendorWithoutPassword } = updatedVendor;
    return vendorWithoutPassword;
  }
}




