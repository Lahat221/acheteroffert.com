# ✅ Vérification de l'enregistrement des offres dans la base de données

## 🔍 Vérifications à effectuer

### 1. Vérifier que les migrations sont exécutées

Assurez-vous que la table `offers` existe dans votre base de données PostgreSQL :

```sql
-- Connectez-vous à PostgreSQL (via pgAdmin ou psql)
-- Sélectionnez la base de données acheteroffert

-- Vérifier que la table existe
SELECT * FROM information_schema.tables 
WHERE table_name = 'offers' AND table_schema = 'public';

-- Vérifier la structure de la table
\d offers

-- Ou en SQL
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'offers';
```

**Si la table n'existe pas**, exécutez les migrations :

```bash
cd backend
npm run migration:run
```

### 2. Vérifier que le backend est connecté à la base de données

Vérifiez dans les logs du serveur backend :

```bash
# Démarrez le serveur backend
npm run dev
```

Vous devriez voir un message indiquant que la connexion à PostgreSQL est réussie.

### 3. Vérifier que les offres sont bien enregistrées

#### Option A : Via pgAdmin

1. Ouvrez pgAdmin
2. Connectez-vous à votre base de données `acheteroffert`
3. Naviguez vers : **Schemas** → **public** → **Tables** → **offers**
4. Clic droit → **View/Edit Data** → **All Rows**
5. Vous devriez voir toutes les offres créées

#### Option B : Via SQL

```sql
-- Voir toutes les offres
SELECT id, title, vendor_id, city, category, created_at 
FROM offers 
ORDER BY created_at DESC;

-- Compter les offres
SELECT COUNT(*) FROM offers;

-- Voir les détails d'une offre récente
SELECT * FROM offers ORDER BY created_at DESC LIMIT 1;
```

### 4. Vérifier les logs du backend

Lors de la création d'une offre, vous devriez voir dans les logs du terminal :

```
✅ Offre créée avec succès: {
  id: '...',
  title: '...',
  vendorId: '...'
}
```

### 5. Tester la création d'une offre

1. Connectez-vous en tant que vendeur sur le site
2. Allez dans le dashboard
3. Cliquez sur "Créer une nouvelle offre"
4. Remplissez le formulaire et soumettez
5. Vérifiez dans la base de données que l'offre est bien créée

## 🐛 Dépannage

### Erreur : "relation 'offers' does not exist"

**Solution** : La table n'existe pas. Exécutez les migrations :

```bash
cd backend
npm run migration:run
```

### Erreur : "foreign key constraint fails"

**Solution** : Le `vendorId` fourni n'existe pas dans la table `vendors`. Vérifiez que :
- Le vendeur est bien créé dans la base de données
- Le `vendorId` envoyé depuis le frontend correspond à un vendeur existant

### Erreur : "connection timeout" ou erreur de connexion

**Solution** : Vérifiez la connexion à PostgreSQL :
- PostgreSQL est démarré
- Les identifiants dans `.env` sont corrects
- La base de données `acheteroffert` existe

### Les offres ne s'affichent pas dans le dashboard

**Solution** : Vérifiez que :
- L'API retourne bien les offres : `GET http://localhost:3001/offers`
- Le `vendorId` dans le localStorage correspond bien à celui des offres
- Le filtrage par `vendorId` fonctionne dans le backend (si implémenté)

## 📋 Checklist de vérification

- [ ] Les migrations ont été exécutées (`npm run migration:run`)
- [ ] La table `offers` existe dans la base de données
- [ ] Le backend se connecte correctement à PostgreSQL
- [ ] Le fichier `.env` contient les bonnes informations de connexion
- [ ] Au moins un vendeur existe dans la table `vendors`
- [ ] Le serveur backend fonctionne sur `http://localhost:3001`
- [ ] Les logs montrent "✅ Offre créée avec succès" lors de la création
- [ ] Les offres apparaissent dans la base de données après création

## ✅ Test rapide

Pour tester rapidement si l'enregistrement fonctionne :

1. Créez une offre via le formulaire
2. Immédiatement après, vérifiez dans la base de données :

```sql
SELECT * FROM offers ORDER BY created_at DESC LIMIT 1;
```

Si vous voyez l'offre que vous venez de créer, tout fonctionne correctement ! 🎉

