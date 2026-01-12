# 🌱 Script de Seed Complet

Ce script (`seed-complet.sql`) crée des offres d'exemple pour **toutes les catégories** afin d'animer le site.

## 📋 Catégories incluses

1. **🍽️ Restauration** - 3 offres
2. **🏨 Hôtel** - 2 offres
3. **🥖 Boulangerie** - 3 offres
4. **💆 Spa & Bien-être** - 2 offres
5. **👙 Lingerie** - 2 offres
6. **💅 Beauté** - 3 offres
7. **💪 Coach Sportif** - 3 offres
8. **🎬 Loisir** - 2 offres
9. **📦 Autre** - 1 offre

**Total : 21 offres** réparties dans 9 catégories

## 🚀 Comment utiliser

### Méthode 1 : Via pgAdmin (Recommandé)

1. Ouvrez **pgAdmin**
2. Connectez-vous à votre serveur PostgreSQL
3. Sélectionnez la base de données **acheteroffert**
4. Ouvrez l'onglet **Query Tool** (icône avec un éclair ou **Alt+Shift+Q**)
5. Ouvrez le fichier `backend/database/seed-complet.sql`
6. Copiez tout le contenu et collez-le dans l'éditeur
7. Cliquez sur **▶ Execute** (ou appuyez sur **F5**)
8. Vérifiez que vous voyez le résumé avec le nombre d'offres créées

### Méthode 2 : Via psql (Ligne de commande)

```bash
cd backend
psql -U postgres -d acheteroffert -f database/seed-complet.sql
```

**Note** : Remplacez `postgres` par votre utilisateur PostgreSQL et ajoutez l'option `-W` pour être invité à saisir le mot de passe si nécessaire.

### Méthode 3 : Via DBeaver ou autre client SQL

1. Connectez-vous à PostgreSQL
2. Sélectionnez la base de données `acheteroffert`
3. Exécutez le contenu du fichier `seed-complet.sql`

### Méthode 4 : Via le script Node.js (Alternative)

Si vous préférez utiliser Node.js :

```bash
cd backend
node database/seed-complet.js
```

**Note** : Cette méthode nécessite que le fichier `.env` soit configuré avec les paramètres de connexion à la base de données.

## ✅ Vérification

Après avoir exécuté le script, vérifiez que les offres ont été créées :

```sql
-- Voir toutes les offres
SELECT id, title, category, city, is_featured FROM offers ORDER BY category, title;

-- Compter les offres par catégorie
SELECT category, COUNT(*) as nombre 
FROM offers 
GROUP BY category 
ORDER BY category;

-- Voir les offres mises en avant (Bons Plans)
SELECT title, category, city 
FROM offers 
WHERE is_featured = true;
```

## 📊 Données créées

### Vendeurs
- 9 vendeurs (un par catégorie)
- **Note sur les mots de passe** : Les vendeurs sont créés avec des hashs bcrypt. Pour les utiliser dans l'application, vous devrez créer les vendeurs via l'interface d'inscription ou réinitialiser leurs mots de passe. Les vendeurs sont créés uniquement pour avoir des `vendor_id` valides pour les offres.
- Tous situés à Saint-Denis
- Emails : `tacos@acheteroffert.com`, `hotel@acheteroffert.com`, `boulangerie@acheteroffert.com`, etc.

### Offres
- **Variété** : Offres variées avec différentes options
- **Horaires** : Jours et heures de validité différents
- **Prix** : Prix variés avec réductions
- **Bons Plans** : Certaines offres sont mises en avant
- **Images** : URLs d'images Unsplash pour l'affichage

## 🎯 Utilisation pour les tests

Ces offres permettent de :
- ✅ Tester l'affichage sur la page d'accueil
- ✅ Tester les filtres par catégorie
- ✅ Tester les filtres par ville
- ✅ Tester les "Bons Plans" (offres mises en avant)
- ✅ Animer le site avec du contenu varié
- ✅ Tester la création de réservations

## 🔄 Réinitialiser les données

Si vous voulez supprimer toutes les offres et recommencer :

```sql
-- Supprimer toutes les offres
DELETE FROM offers;

-- Puis réexécutez le script seed-complet.sql
```

**⚠️ Attention** : Cela supprimera toutes les offres créées manuellement aussi !

## 📝 Notes

- Les vendeurs sont créés avec `ON CONFLICT DO NOTHING`, donc si un vendeur existe déjà avec le même email, il ne sera pas dupliqué
- Les offres utilisent `gen_random_uuid()` pour générer des IDs uniques
- Toutes les offres sont actives par défaut (`is_active = true`)
- Les images utilisent des URLs Unsplash pour l'affichage
- Le script est idempotent : vous pouvez l'exécuter plusieurs fois sans problème (les vendeurs ne seront pas dupliqués)

---

Bon développement ! 🎉

