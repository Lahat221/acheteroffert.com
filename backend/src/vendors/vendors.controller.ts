/**
 * Contrôleur pour les routes API des vendeurs
 * 
 * Ce contrôleur expose les endpoints REST pour :
 * - POST /vendors/register : Inscription d'un nouveau vendeur
 * - POST /vendors/login : Connexion d'un vendeur
 * - GET /vendors/:id : Détails d'un vendeur
 * - PATCH /vendors/:id : Mettre à jour un vendeur
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
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { LoginVendorDto } from './dto/login-vendor.dto';

@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  /**
   * POST /vendors/register
   * Inscription d'un nouveau vendeur
   * 
   * @param createVendorDto - Données du vendeur à créer
   * @returns Le vendeur créé (sans le mot de passe)
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createVendorDto: CreateVendorDto) {
    return await this.vendorsService.create(createVendorDto);
  }

  /**
   * POST /vendors/login
   * Connexion d'un vendeur
   * 
   * @param loginVendorDto - Email et mot de passe
   * @returns Le vendeur authentifié (sans le mot de passe)
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginVendorDto: LoginVendorDto) {
    return await this.vendorsService.login(loginVendorDto);
  }

  /**
   * GET /vendors/:id
   * Récupère les détails d'un vendeur
   * 
   * @param id - ID du vendeur (UUID)
   * @returns Les détails du vendeur
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vendorsService.findOne(id);
  }

  /**
   * PATCH /vendors/:id
   * Met à jour un vendeur
   * 
   * @param id - ID du vendeur à mettre à jour
   * @param updateVendorDto - Données à mettre à jour
   * @returns Le vendeur mis à jour
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVendorDto: UpdateVendorDto) {
    return this.vendorsService.update(id, updateVendorDto);
  }
}




