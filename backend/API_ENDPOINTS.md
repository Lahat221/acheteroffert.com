# Documentation des endpoints API

## Base URL
```
http://localhost:3001
```

## Endpoints disponibles

### 1. Offres (Products)

#### GET /offers
Récupère toutes les offres avec filtres optionnels.

**Paramètres de requête (tous optionnels) :**
- `city` (string) : Filtrer par ville (ex: `?city=Saint-Denis`)
- `category` (string) : Filtrer par catégorie (ex: `?category=restauration`)
- `featured` (boolean) : Filtrer les offres mises en avant (ex: `?featured=true`)
- `active` (boolean) : Filtrer les offres actives/inactives (défaut: `true`)
- `page` (number) : Numéro de page (défaut: `1`)
- `limit` (number) : Nombre d'éléments par page (défaut: `20`)

**Exemples :**
```bash
# Toutes les offres
GET /offers

# Offres à Saint-Denis
GET /offers?city=Saint-Denis

# Offres de restauration mises en avant
GET /offers?category=restauration&featured=true

# Pagination
GET /offers?page=1&limit=10
```

**Réponse :**
```json
{
  "offers": [
    {
      "id": "uuid",
      "vendorId": "uuid",
      "title": "1 tacos acheté = 1 tacos offert",
      "description": "...",
      "imageUrl": "...",
      "city": "Saint-Denis",
      "price": 10.00,
      "category": "restauration",
      "validDays": [1, 2, 3, 4],
      "validFromHour": 23,
      "isFeatured": true,
      "isActive": true,
      "createdAt": "2025-12-24T...",
      "updatedAt": "2025-12-24T..."
    }
  ],
  "total": 1
}
```

#### GET /offers/:id
Récupère les détails d'une offre spécifique.

**Exemple :**
```bash
GET /offers/123e4567-e89b-12d3-a456-426614174000
```

**Réponse :**
```json
{
  "id": "uuid",
  "vendorId": "uuid",
  "vendor": {
    "id": "uuid",
    "companyName": "Restaurant XYZ",
    ...
  },
  "title": "...",
  ...
}
```

#### POST /offers
Crée une nouvelle offre.

**Body (JSON) :**
```json
{
  "vendorId": "uuid",
  "title": "1 tacos acheté = 1 tacos offert",
  "description": "Offre valable du lundi au jeudi après 23h",
  "imageUrl": "https://example.com/image.jpg",
  "city": "Saint-Denis",
  "price": 10.00,
  "category": "restauration",
  "validDays": [1, 2, 3, 4],
  "validFromHour": 23,
  "validUntilHour": 23,
  "isFeatured": true,
  "maxReservations": 50
}
```

**Réponse :**
```json
{
  "id": "uuid",
  "title": "...",
  ...
}
```

#### PATCH /offers/:id
Met à jour une offre existante.

**Body (JSON) :** Tous les champs sont optionnels
```json
{
  "title": "Nouveau titre",
  "isActive": false
}
```

#### DELETE /offers/:id
Supprime une offre (soft delete : marque comme inactive).

**Réponse :**
```json
{
  "message": "Offre uuid désactivée avec succès"
}
```

### 2. Routes de base

#### GET /
Message de bienvenue de l'API.

**Réponse :**
```json
{
  "message": "Bienvenue sur l'API AcheterOffert.com",
  "status": "OK",
  "version": "1.0.0",
  "timestamp": "2025-12-24T..."
}
```

#### GET /health
Vérification de santé de l'API.

**Réponse :**
```json
{
  "status": "healthy",
  "service": "acheteroffert-api",
  "timestamp": "2025-12-24T..."
}
```

## Codes de statut HTTP

- `200 OK` : Requête réussie
- `201 Created` : Ressource créée avec succès
- `400 Bad Request` : Données invalides
- `404 Not Found` : Ressource introuvable
- `500 Internal Server Error` : Erreur serveur

## Notes

- Tous les endpoints nécessitent un format JSON pour les requêtes POST/PATCH
- Les dates doivent être au format ISO 8601 (ex: `"2025-12-24"`)
- Les IDs sont des UUIDs (format: `123e4567-e89b-12d3-a456-426614174000`)




