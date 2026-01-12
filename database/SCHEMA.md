# Schéma de Base de Données - acheteroffert.com

## Vue d'ensemble

Base de données PostgreSQL pour le MVP marketplace acheteroffert.com.

## Tables

### 1. `vendors` (Vendeurs)

**Description :** Comptes des vendeurs qui proposent des offres.

| Champ | Type | Contraintes | Description |
|-------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL | Identifiant unique du vendeur |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | Email du vendeur (utilisé pour l'authentification) |
| `password_hash` | VARCHAR(255) | NOT NULL | Hash du mot de passe (bcrypt) |
| `company_name` | VARCHAR(255) | NOT NULL | Nom de l'entreprise/commerce |
| `first_name` | VARCHAR(100) | NOT NULL | Prénom du responsable |
| `last_name` | VARCHAR(100) | NOT NULL | Nom du responsable |
| `phone` | VARCHAR(20) | NULL | Téléphone de contact |
| `address` | TEXT | NULL | Adresse complète |
| `city` | VARCHAR(100) | NULL | Ville |
| `postal_code` | VARCHAR(10) | NULL | Code postal |
| `is_active` | BOOLEAN | NOT NULL, DEFAULT true | Statut actif/inactif du vendeur |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Date de création |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Date de mise à jour |

**Relations :**
- Un vendeur peut avoir plusieurs offres (1:N)
- Un vendeur peut avoir plusieurs abonnements (1:N)
- Un vendeur peut avoir plusieurs réservations via ses offres (1:N indirect)

---

### 2. `offers` (Offres)

**Description :** Offres proposées par les vendeurs.

| Champ | Type | Contraintes | Description |
|-------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL | Identifiant unique de l'offre |
| `vendor_id` | UUID | FOREIGN KEY → vendors.id, NOT NULL | Référence au vendeur |
| `title` | VARCHAR(255) | NOT NULL | Titre de l'offre |
| `description` | TEXT | NULL | Description détaillée |
| `image_url` | VARCHAR(500) | NULL | URL de l'image principale |
| `city` | VARCHAR(100) | NOT NULL | Ville où l'offre est disponible |
| `price` | DECIMAL(10,2) | NULL | Prix de l'offre (optionnel) |
| `original_price` | DECIMAL(10,2) | NULL | Prix original (pour afficher la réduction) |
| `is_active` | BOOLEAN | NOT NULL, DEFAULT true | Offre active/inactive |
| `valid_from` | DATE | NULL | Date de début de validité |
| `valid_until` | DATE | NULL | Date de fin de validité |
| `max_reservations` | INTEGER | NULL | Nombre maximum de réservations (NULL = illimité) |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Date de création |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Date de mise à jour |

**Relations :**
- Une offre appartient à un vendeur (N:1)
- Une offre peut avoir plusieurs réservations (1:N)

---

### 3. `reservations` (Réservations)

**Description :** Réservations effectuées par les clients (sans compte).

| Champ | Type | Contraintes | Description |
|-------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL | Identifiant unique de la réservation |
| `offer_id` | UUID | FOREIGN KEY → offers.id, NOT NULL | Référence à l'offre |
| `first_name` | VARCHAR(100) | NOT NULL | Prénom du client |
| `last_name` | VARCHAR(100) | NOT NULL | Nom du client |
| `email` | VARCHAR(255) | NOT NULL | Email du client |
| `status` | VARCHAR(20) | NOT NULL, DEFAULT 'pending' | Statut : pending, confirmed, used, cancelled |
| `reserved_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Date de réservation |
| `used_at` | TIMESTAMP | NULL | Date d'utilisation (quand le QR code est scanné) |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Date de création |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Date de mise à jour |

**Relations :**
- Une réservation appartient à une offre (N:1)
- Une réservation a un QR code unique (1:1)

**Index :**
- `idx_reservations_email` sur `email` (pour recherche)
- `idx_reservations_offer_id` sur `offer_id`
- `idx_reservations_status` sur `status`

---

### 4. `qr_codes` (QR Codes)

**Description :** QR codes générés pour chaque réservation (utilisable une seule fois).

| Champ | Type | Contraintes | Description |
|-------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL | Identifiant unique du QR code |
| `reservation_id` | UUID | FOREIGN KEY → reservations.id, UNIQUE, NOT NULL | Référence à la réservation (1:1) |
| `code` | VARCHAR(255) | UNIQUE, NOT NULL | Code unique du QR code (généré) |
| `data` | TEXT | NOT NULL | Données encodées dans le QR code (JSON) |
| `is_used` | BOOLEAN | NOT NULL, DEFAULT false | Indique si le QR code a été utilisé |
| `used_at` | TIMESTAMP | NULL | Date d'utilisation (quand scanné) |
| `expires_at` | TIMESTAMP | NULL | Date d'expiration (optionnel) |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Date de création |

**Relations :**
- Un QR code appartient à une réservation (1:1)
- Un QR code est lié à une offre via la réservation (N:1 indirect)

**Index :**
- `idx_qr_codes_code` sur `code` (pour validation rapide)
- `idx_qr_codes_reservation_id` sur `reservation_id`
- `idx_qr_codes_is_used` sur `is_used`

**Contraintes :**
- Un QR code ne peut être utilisé qu'une seule fois (`is_used = true`)

---

### 5. `subscriptions` (Abonnements)

**Description :** Abonnements des vendeurs (un seul actif par vendeur).

| Champ | Type | Contraintes | Description |
|-------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL | Identifiant unique de l'abonnement |
| `vendor_id` | UUID | FOREIGN KEY → vendors.id, NOT NULL | Référence au vendeur |
| `plan_type` | VARCHAR(50) | NOT NULL, DEFAULT 'standard' | Type d'abonnement (un seul type dans le MVP) |
| `status` | VARCHAR(20) | NOT NULL, DEFAULT 'active' | Statut : active, cancelled, expired |
| `starts_at` | DATE | NOT NULL | Date de début de l'abonnement |
| `ends_at` | DATE | NOT NULL | Date de fin de l'abonnement |
| `price` | DECIMAL(10,2) | NOT NULL | Prix de l'abonnement |
| `payment_status` | VARCHAR(20) | NOT NULL, DEFAULT 'pending' | Statut paiement : pending, paid, failed |
| `payment_date` | TIMESTAMP | NULL | Date de paiement |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Date de création |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Date de mise à jour |

**Relations :**
- Un abonnement appartient à un vendeur (N:1)

**Index :**
- `idx_subscriptions_vendor_id` sur `vendor_id`
- `idx_subscriptions_status` sur `status`
- `idx_subscriptions_vendor_active` sur `(vendor_id, status)` où `status = 'active'`

**Contraintes :**
- Un seul abonnement actif par vendeur (contrainte unique ou logique applicative)
- `ends_at` doit être supérieur à `starts_at`

---

### 6. `admins` (Administrateurs)

**Description :** Comptes administrateurs pour gérer la plateforme.

| Champ | Type | Contraintes | Description |
|-------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, NOT NULL | Identifiant unique de l'admin |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | Email de l'admin (utilisé pour l'authentification) |
| `password_hash` | VARCHAR(255) | NOT NULL | Hash du mot de passe (bcrypt) |
| `first_name` | VARCHAR(100) | NOT NULL | Prénom |
| `last_name` | VARCHAR(100) | NOT NULL | Nom |
| `role` | VARCHAR(50) | NOT NULL, DEFAULT 'admin' | Rôle : admin, super_admin |
| `is_active` | BOOLEAN | NOT NULL, DEFAULT true | Statut actif/inactif |
| `last_login_at` | TIMESTAMP | NULL | Dernière connexion |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Date de création |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Date de mise à jour |

**Relations :**
- Aucune relation directe avec les autres tables (gestion via l'application)

**Index :**
- `idx_admins_email` sur `email`

---

## Diagramme des Relations

```
vendors (1) ────< (N) offers
  │
  │ (1)
  │
  └───< (N) subscriptions

offers (1) ────< (N) reservations

reservations (1) ──── (1) qr_codes

admins (isolé - pas de relations directes)
```

---

## Règles Métier

1. **QR Code unique :**
   - Chaque réservation génère un QR code unique
   - Un QR code ne peut être utilisé qu'une seule fois (`is_used = true`)
   - Une fois utilisé, le QR code ne peut plus être validé

2. **Abonnement vendeur :**
   - Un vendeur ne peut avoir qu'un seul abonnement actif à la fois
   - L'abonnement doit être actif pour que le vendeur puisse créer des offres
   - Contrôle applicatif : vérifier qu'il n'y a pas d'autre abonnement actif avant d'en créer un nouveau

3. **Pas de table client :**
   - Les réservations stockent directement les informations du client (nom, prénom, email)
   - Pas de compte client, pas d'authentification client
   - Les clients sont identifiés uniquement par leur email dans les réservations

4. **Statuts :**
   - Réservations : `pending` → `confirmed` → `used` ou `cancelled`
   - QR Codes : `is_used = false` → `is_used = true` (une fois scanné)
   - Abonnements : `active`, `cancelled`, `expired`
   - Vendeurs/Admins : `is_active = true/false`

---

## Index Recommandés

### Index de performance :
- `vendors.email` (UNIQUE) - authentification
- `offers.vendor_id` - filtrage par vendeur
- `offers.city` - recherche par ville
- `reservations.offer_id` - liste des réservations d'une offre
- `reservations.email` - recherche par email client
- `qr_codes.code` (UNIQUE) - validation rapide du QR code
- `subscriptions.vendor_id` + `status` - vérification abonnement actif
- `admins.email` (UNIQUE) - authentification

---

## Notes d'Implémentation

1. **UUID vs INTEGER :**
   - Utilisation d'UUID pour tous les IDs (sécurité, scalabilité)
   - Alternative : BIGSERIAL si préférence pour les IDs séquentiels

2. **Timestamps :**
   - `created_at` et `updated_at` gérés automatiquement (triggers ou ORM)
   - `updated_at` mis à jour automatiquement à chaque modification

3. **Soft Delete (optionnel) :**
   - Ajouter `deleted_at` TIMESTAMP NULL si besoin de soft delete
   - Actuellement, utilisation de `is_active` pour désactiver

4. **Validation QR Code :**
   - Le champ `code` contient un identifiant unique généré (UUID ou hash)
   - Le champ `data` contient les données JSON encodées dans le QR code
   - Validation : vérifier `is_used = false` et `expires_at > NOW()` si applicable

5. **Contrainte Abonnement Unique :**
   - Implémenter via trigger ou contrainte unique partielle
   - Ou validation applicative avant insertion







