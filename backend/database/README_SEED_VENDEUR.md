# 🌱 Script de Seed avec Votre Compte Vendeur

Ce script (`seed-offres-vendeur.sql`) crée des offres d'exemple en utilisant **VOTRE compte vendeur existant** au lieu de créer de nouveaux vendeurs.

## 📋 Ce que fait ce script

- ✅ Utilise votre compte vendeur existant (le premier vendeur actif trouvé)
- ✅ Crée **21 offres** pour toutes les catégories
- ✅ Associe toutes les offres à votre compte
- ✅ Utilise votre ville automatiquement

## 🚀 Comment utiliser

### Méthode 1 : Via pgAdmin (Recommandé)

1. **Connectez-vous d'abord à votre compte vendeur** sur le site (pour créer votre compte si nécessaire)
2. Ouvrez **pgAdmin**
3. Connectez-vous à votre serveur PostgreSQL
4. Sélectionnez la base de données **acheteroffert**
5. Ouvrez l'onglet **Query Tool** (icône avec un éclair ou **Alt+Shift+Q**)
6. Ouvrez le fichier `backend/database/seed-offres-vendeur.sql`
7. Copiez tout le contenu et collez-le dans l'éditeur
8. Cliquez sur **▶ Execute** (ou appuyez sur **F5**)
9. Vérifiez que vous voyez le message "21 offres créées avec succès"

### Méthode 2 : Via psql (Ligne de commande)

```bash
cd backend
psql -U postgres -d acheteroffert -f database/seed-offres-vendeur.sql
```

**Note** : Remplacez `postgres` par votre utilisateur PostgreSQL.

## 📊 Résultat attendu

Après l'exécution, vous devriez voir :
- Un message indiquant quel vendeur est utilisé
- Le nombre d'offres créées
- Un résumé par catégorie

## ✅ Vérification

Pour vérifier que les offres ont été créées avec votre compte :

```sql
-- Voir toutes vos offres
SELECT id, title, category, city, is_featured, created_at 
FROM offers 
ORDER BY category, title;

-- Compter vos offres par catégorie
SELECT category, COUNT(*) as nombre 
FROM offers 
GROUP BY category 
ORDER BY category;

-- Voir votre compte vendeur
SELECT id, email, company_name, city 
FROM vendors 
WHERE is_active = true;
```

## 🎯 Utilisation pour les tests

Ces offres permettent de :
- ✅ Voir vos offres sur la page d'accueil
- ✅ Tester l'affichage avec vos propres données
- ✅ Tester les filtres par catégorie
- ✅ Tester les "Bons Plans" (offres mises en avant)
- ✅ Animer le site avec du contenu varié
- ✅ Tester la création de réservations

## 🔄 Réinitialiser les données

Si vous voulez supprimer toutes vos offres et recommencer :

```sql
-- Récupérer votre ID de vendeur (remplacez par votre email)
SELECT id FROM vendors WHERE email = 'VOTRE_EMAIL';

-- Supprimer toutes vos offres (remplacez par votre ID)
DELETE FROM offers WHERE vendor_id = 'VOTRE_ID';

-- Puis réexécutez le script seed-offres-vendeur.sql
```

## 📝 Notes importantes

- **Le script utilise automatiquement le premier vendeur actif trouvé dans la base**
- **Toutes les offres sont créées avec `is_active = true`** donc elles apparaîtront sur le site
- **La ville des offres est automatiquement remplie avec la ville de votre compte vendeur**
- **Le script peut être exécuté plusieurs fois** (mais créera des doublons)
- **Les offres utilisent des images Unsplash** pour l'affichage

## 🆚 Différence avec seed-complet.sql

| Feature | seed-complet.sql | seed-offres-vendeur.sql |
|---------|------------------|------------------------|
| Crée des vendeurs | ✅ Oui (9 vendeurs) | ❌ Non |
| Utilise votre compte | ❌ Non | ✅ Oui |
| Nombre d'offres | 21 offres | 21 offres |
| Idéal pour | Tests avec plusieurs vendeurs | Utilisation avec votre compte |

---

Bon développement ! 🎉

