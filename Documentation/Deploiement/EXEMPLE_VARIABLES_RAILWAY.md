# 🔧 Exemple de Variables d'Environnement pour Railway

## Variables à ajouter dans Railway

Une fois que vous avez trouvé vos informations Supabase, ajoutez ces variables dans Railway :

### 📋 Copier-coller ces variables

```env
NODE_ENV=production
PORT=3001
DB_HOST=db.pdeeieqmgrjldwkkdzqy.supabase.co
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=votre-mot-de-passe-supabase
DB_DATABASE=postgres
FRONTEND_URL=https://votre-projet.vercel.app
JWT_SECRET=changez-moi-par-une-cle-aleatoire-longue
```

### 🔍 Comment trouver chaque valeur

1. **DB_HOST** : 
   - Supabase → Settings → Database
   - Cherchez "Connection string" ou "Connection info"
   - C'est la partie `db.xxxxx.supabase.co` dans l'URL
   - Exemple : `db.pdeeieqmgrjldwkkdzqy.supabase.co`

2. **DB_PASSWORD** :
   - C'est le mot de passe que vous avez créé lors de la création du projet Supabase
   - Si vous l'avez oublié : Settings → Database → "Reset database password"

3. **FRONTEND_URL** :
   - Mettez d'abord une URL temporaire : `https://placeholder.vercel.app`
   - Après avoir déployé sur Vercel, remplacez par l'URL réelle

4. **JWT_SECRET** :
   - Générez une clé aléatoire longue
   - Exemple : `ma-cle-secrete-super-longue-et-aleatoire-123456789`

---

## ⚠️ Important

- Remplacez `db.pdeeieqmgrjldwkkdzqy.supabase.co` par VOTRE host Supabase
- Remplacez `votre-mot-de-passe-supabase` par VOTRE mot de passe
- Remplacez `FRONTEND_URL` après avoir déployé sur Vercel

