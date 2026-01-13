/**
 * Service pour l'authentification et la gestion des administrateurs
 * 
 * Ce service contient toute la logique métier pour :
 * - Créer des administrateurs
 * - Authentifier les administrateurs (login)
 * - Récupérer les informations d'un administrateur
 * - Mettre à jour un administrateur
 */
import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { AdminRole } from '../common/enums/admin-role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  /**
   * Crée un nouvel administrateur
   * 
   * @param createAdminDto - Données de l'admin à créer
   * @returns L'admin créé (sans le mot de passe)
   */
  async create(createAdminDto: CreateAdminDto): Promise<Omit<Admin, 'passwordHash'>> {
    // Vérifie si un admin avec cet email existe déjà
    const existingAdmin = await this.adminRepository.findOne({
      where: { email: createAdminDto.email },
    });

    if (existingAdmin) {
      throw new ConflictException('Un administrateur avec cet email existe déjà');
    }

    // Hash le mot de passe avec bcrypt
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(createAdminDto.password, saltRounds);

    // Crée l'admin avec le rôle par défaut si non spécifié
    const admin = this.adminRepository.create({
      ...createAdminDto,
      passwordHash,
      role: createAdminDto.role || AdminRole.ADMIN,
    });

    // Sauvegarde dans la base de données
    const savedAdmin = await this.adminRepository.save(admin);

    // Retourne l'admin sans le mot de passe
    const { passwordHash: _, ...adminWithoutPassword } = savedAdmin;
    return adminWithoutPassword;
  }

  /**
   * Authentifie un administrateur (login)
   * 
   * @param loginAdminDto - Email et mot de passe
   * @returns L'admin authentifié (sans le mot de passe)
   * @throws UnauthorizedException si les identifiants sont incorrects
   */
  async login(loginAdminDto: LoginAdminDto): Promise<Omit<Admin, 'passwordHash'>> {
    // Trouve l'admin par email
    const admin = await this.adminRepository.findOne({
      where: { email: loginAdminDto.email },
    });

    if (!admin) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    // Vérifie si l'admin est actif
    if (!admin.isActive) {
      throw new UnauthorizedException('Votre compte a été désactivé. Contactez un super administrateur.');
    }

    // Vérifie le mot de passe
    const isPasswordValid = await bcrypt.compare(loginAdminDto.password, admin.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    // Met à jour la date de dernière connexion
    admin.lastLoginAt = new Date();
    await this.adminRepository.save(admin);

    // Retourne l'admin sans le mot de passe
    const { passwordHash: _, ...adminWithoutPassword } = admin;
    return adminWithoutPassword;
  }

  /**
   * Récupère un administrateur par son ID
   * 
   * @param id - ID de l'admin (UUID)
   * @returns L'admin trouvé (sans le mot de passe)
   * @throws NotFoundException si l'admin n'existe pas
   */
  async findOne(id: string): Promise<Omit<Admin, 'passwordHash'>> {
    const admin = await this.adminRepository.findOne({
      where: { id },
    });

    if (!admin) {
      throw new NotFoundException(`Administrateur avec l'ID ${id} introuvable`);
    }

    // Retourne l'admin sans le mot de passe
    const { passwordHash: _, ...adminWithoutPassword } = admin;
    return adminWithoutPassword;
  }

  /**
   * Récupère tous les administrateurs
   * 
   * @returns Liste de tous les admins (sans les mots de passe)
   */
  async findAll(): Promise<Omit<Admin, 'passwordHash'>[]> {
    const admins = await this.adminRepository.find({
      order: { createdAt: 'DESC' },
    });

    // Retourne les admins sans les mots de passe
    return admins.map(({ passwordHash: _, ...adminWithoutPassword }) => adminWithoutPassword);
  }

  /**
   * Met à jour le statut actif/inactif d'un administrateur
   * 
   * @param id - ID de l'admin à mettre à jour
   * @param isActive - Nouveau statut actif/inactif
   * @returns L'admin mis à jour
   */
  async updateStatus(id: string, isActive: boolean): Promise<Omit<Admin, 'passwordHash'>> {
    const admin = await this.adminRepository.findOne({
      where: { id },
    });

    if (!admin) {
      throw new NotFoundException(`Administrateur avec l'ID ${id} introuvable`);
    }

    admin.isActive = isActive;
    const updatedAdmin = await this.adminRepository.save(admin);

    const { passwordHash: _, ...adminWithoutPassword } = updatedAdmin;
    return adminWithoutPassword;
  }
}





