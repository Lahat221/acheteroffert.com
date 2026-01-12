# Guide pour ajouter des données de test (Seed)

> 📖 **Retour à l'index** : [README.md](./README.md)

---

## Méthode 1 : Via pgAdmin (Recommandé)

1. Ouvrez pgAdmin
2. Connectez-vous au serveur PostgreSQL
3. Sélectionnez la base de données `acheteroffert`
4. Cliquez sur l'icône "Query Tool" (ou appuyez sur `F5`)
5. Ouvrez le fichier `backend/database/seed.sql`
6. Copiez tout le contenu et collez-le dans l'éditeur de requêtes
7. Cliquez sur "Execute" (ou appuyez sur `F5`)

## Méthode 2 : Via la ligne de commande

Si vous avez `psql` installé et dans votre PATH :

```bash
cd backend
psql -U postgres -d acheteroffert -f database/seed.sql
```

## Vérification

Après avoir exécuté le script, vous pouvez vérifier que les données ont été créées :

### Dans pgAdmin :
```sql
-- Voir tous les vendeurs
SELECT id, email, company_name, city FROM vendors;

-- Voir toutes les offres
SELECT id, title, city, category, is_featured FROM offers;
```

### Via l'API :
```bash
# Toutes les offres
GET http://localhost:3001/offers

# Offres à Saint-Denis
GET http://localhost:3001/offers?city=Saint-Denis

# Bons plans
GET http://localhost:3001/offers?featured=true
```

## Données créées

Le script crée :

### 3 Vendeurs :
- **Tacos Saint-Denis** (restauration)
- **Hôtel Central** (hôtel)
- **Boulangerie du Centre** (boulangerie)

### 5 Offres :
1. **1 tacos acheté = 1 tacos offert** (restauration, bon plan)
   - Valable lundi à jeudi après 23h
   
2. **Menu du soir à moitié prix** (restauration)
   - Tous les soirs après 22h
   
3. **2 nuits achetées = 1 nuit offerte** (hôtel, bon plan)
   - Valable lundi et mardi
   
4. **Gâteaux et viennoiseries à -50%** (boulangerie, bon plan)
   - Tous les jours après 18h
   
5. **Baguettes du jour à 1€** (boulangerie)
   - Tous les jours après 19h

## Notes

- Les mots de passe des vendeurs sont hashés avec bcrypt (mot de passe de test : "password")
- Les IDs sont générés automatiquement avec `gen_random_uuid()`
- Les dates sont générées automatiquement avec `NOW()`
- Le script utilise `ON CONFLICT DO NOTHING` pour éviter les doublons si vous l'exécutez plusieurs fois

---

> 📖 **Retour à l'index** : [README.md](./README.md)




