/**
 * Contrôleur pour l'upload d'images
 */
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { ConfigService } from '@nestjs/config';

@Controller('upload')
export class UploadController {
  constructor(private readonly configService: ConfigService) {}

  /**
   * POST /upload/image
   * Upload une image et retourne l'URL pour y accéder
   */
  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = join(process.cwd(), 'uploads');
          
          // Crée le dossier s'il n'existe pas
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }
          
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          // Génère un nom de fichier unique
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `offer-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        // Vérifie que c'est une image
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new BadRequestException('Seuls les fichiers image sont autorisés'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max
      },
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Aucun fichier fourni');
    }

    // Construit l'URL de l'image en utilisant l'URL de l'API
    // En production, utilise l'URL Railway, en développement localhost
    let apiUrl = this.configService.get<string>('API_URL') || process.env.API_URL;
    
    if (!apiUrl) {
      // Si pas d'URL configurée, essaie de la construire depuis Railway
      if (process.env.RAILWAY_PUBLIC_DOMAIN) {
        apiUrl = `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`;
      } else if (process.env.NODE_ENV === 'production') {
        // En production sans Railway, utilise le host de la requête
        // Note: Cela nécessiterait d'injecter @Req() dans la méthode
        apiUrl = 'http://localhost:3001'; // Fallback
      } else {
        apiUrl = 'http://localhost:3001';
      }
    }

    // Retourne l'URL pour accéder à l'image
    return {
      url: `${apiUrl}/uploads/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
    };
  }
}

