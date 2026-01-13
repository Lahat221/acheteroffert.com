/**
 * Contrôleur pour les routes API des administrateurs
 * 
 * Ce contrôleur expose les endpoints REST pour :
 * - POST /auth/admin/register : Création d'un nouvel admin (réservé aux super admins)
 * - POST /auth/admin/login : Connexion d'un administrateur
 * - GET /auth/admin : Liste de tous les admins
 * - GET /auth/admin/:id : Détails d'un administrateur
 * - PATCH /auth/admin/:id/status : Mettre à jour le statut d'un admin
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';

@Controller('auth/admin')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * POST /auth/admin/register
   * Création d'un nouvel administrateur
   * 
   * Note: Dans un environnement de production, cette route devrait être protégée
   * et réservée aux super administrateurs uniquement
   * 
   * @param createAdminDto - Données de l'admin à créer
   * @returns L'admin créé (sans le mot de passe)
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createAdminDto: CreateAdminDto) {
    return await this.authService.create(createAdminDto);
  }

  /**
   * POST /auth/admin/login
   * Connexion d'un administrateur
   * 
   * @param loginAdminDto - Email et mot de passe
   * @returns L'admin authentifié (sans le mot de passe)
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginAdminDto: LoginAdminDto) {
    return await this.authService.login(loginAdminDto);
  }

  /**
   * GET /auth/admin
   * Récupère tous les administrateurs
   * 
   * @returns Liste de tous les admins
   */
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  /**
   * GET /auth/admin/:id
   * Récupère les détails d'un administrateur
   * 
   * @param id - ID de l'admin (UUID)
   * @returns Les détails de l'admin
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  /**
   * PATCH /auth/admin/:id/status
   * Met à jour le statut actif/inactif d'un administrateur
   * 
   * @param id - ID de l'admin à mettre à jour
   * @param body - Nouveau statut (isActive: boolean)
   * @returns L'admin mis à jour
   */
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: { isActive: boolean },
  ) {
    return this.authService.updateStatus(id, body.isActive);
  }
}





