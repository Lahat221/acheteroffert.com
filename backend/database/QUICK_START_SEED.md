# 🚀 Guide Rapide : Créer des offres avec votre compte vendeur

Ce guide vous explique comment créer rapidement des offres d'exemple avec **votre propre compte vendeur**.

## 📋 Étapes rapides

### 1️⃣ Vérifier que vous avez un compte vendeur

Si vous n'avez pas encore de compte :
1. Allez sur http://localhost:3000/vendeur/register
2. Créez votre compte vendeur
3. Connectez-vous

### 2️⃣ Exécuter le script SQL

#### Option A : Via pgAdmin (Plus facile)

1. **Ouvrez pgAdmin**
2. **Connectez-vous** à PostgreSQL
3. **Sélectionnez** la base de données `acheteroffert`
4. **Ouvrez** Query Tool (icône éclair ou `Alt+Shift+Q`)
5. **Ouvrez** le fichier `backend/database/seed-offres-vendeur.sql`
6. **Copiez-collez** tout le contenu
7. **Cliquez** sur ▶ Execute (ou `F5`)
8. **Vérifiez** le message "21 offres créées avec succès"

#### Option B : Via ligne de commande

```bash
cd backend
psql -U postgres -d acheteroffert -f database/seed-offres-vendeur.sql
```

### 3️⃣ Vérifier sur le site

1. **Allez** sur http://localhost:3000
2. **Vous devriez voir** vos 21 offres sur la page d'accueil
3. **Testez** les filtres par catégorie

## ✅ Vérification rapide

Dans pgAdmin, exécutez cette requête pour voir vos offres :

```sql
SELECT title, category, city, is_featured 
FROM offers 
ORDER BY category, title;
```

## 🐛 Problèmes courants

### Les offres ne s'affichent pas ?

1. **Vérifiez que le backend est démarré** : http://localhost:3001
2. **Vérifiez que vous avez un compte vendeur** dans la base
3. **Vérifiez que les offres sont créées** : Exécutez la requête ci-dessus
4. **Vérifiez les logs du backend** pour voir les erreurs
5. **Rafraîchissez** la page d'accueil (Ctrl+F5 pour forcer)

### Le script ne trouve pas votre compte vendeur ?

1. **Vérifiez que votre compte est actif** :
   ```sql
   SELECT id, email, is_active FROM vendors WHERE is_active = true;
   ```
2. Si aucun vendeur n'est actif, **créez-en un via l'interface web**
3. **Réessayez** le script

### Erreur "Aucun vendeur actif trouvé" ?

1. **Créez un compte vendeur** sur le site
2. **Vérifiez** qu'il est bien dans la base :
   ```sql
   SELECT * FROM vendors;
   ```
3. **Réessayez** le script

## 📊 Résultat attendu

Après l'exécution, vous devriez avoir :
- ✅ 21 offres créées
- ✅ Toutes associées à votre compte vendeur
- ✅ Réparties dans 9 catégories
- ✅ Visibles sur la page d'accueil

## 🎯 Catégories créées

1. 🍽️ **Restauration** - 3 offres
2. 🏨 **Hôtel** - 2 offres
3. 🥖 **Boulangerie** - 3 offres
4. 💆 **Spa** - 2 offres
5. 👙 **Lingerie** - 2 offres
6. 💅 **Beauté** - 3 offres
7. 💪 **Coach** - 3 offres
8. 🎬 **Loisir** - 2 offres
9. 📦 **Autre** - 1 offre

**Total : 21 offres** 🎉

---

**Besoin d'aide ?** Consultez [README_SEED_VENDEUR.md](./README_SEED_VENDEUR.md) pour plus de détails.

