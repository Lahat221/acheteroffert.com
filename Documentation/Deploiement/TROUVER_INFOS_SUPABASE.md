# 📍 Où trouver les informations de connexion Supabase

## Méthode 1 : Via "Project Settings" → "Database" (Recommandé)

1. Dans votre projet Supabase, cliquez sur l'icône **⚙️ Settings** (en bas à gauche de la sidebar)
2. Dans le menu de gauche, cliquez sur **"Database"**
3. Vous verrez une section **"Connection string"** ou **"Connection info"**
4. Les informations sont affichées sous plusieurs formats :

### Format "URI" (Connection String)
```
postgresql://postgres:[YOUR-PASSWORD]@db.pdeeieqmgrjldwkkdzqy.supabase.co:5432/postgres
```

Dans cette URL, vous pouvez extraire :
- **Host** : `db.pdeeieqmgrjldwkkdzqy.supabase.co`
- **Port** : `5432`
- **Database** : `postgres`
- **User** : `postgres`
- **Password** : (celui que vous avez créé lors de la création du projet)

### Format "Session mode" ou "Transaction mode"
Vous verrez aussi des informations similaires.

---

## Méthode 2 : Via "Connection Pooling"

1. Dans **Settings** → **Database**
2. Cherchez la section **"Connection Pooling"**
3. Vous verrez une URL de connexion avec le host

---

## Méthode 3 : Via "Connection Info" (Section dédiée)

1. Dans **Settings** → **Database**
2. Cherchez la section **"Connection Info"** ou **"Database URL"**
3. Vous verrez :
   - **Host** : `db.xxxxx.supabase.co`
   - **Port** : `5432`
   - **Database name** : `postgres`
   - **User** : `postgres`
   - **Password** : (masqué, mais c'est celui que vous avez créé)

---

## 📝 Exemple avec votre projet

D'après l'URL que je vois dans votre navigateur (`pdeeieqmgrjldwkkdzqy`), votre host devrait être :

```
db.pdeeieqmgrjldwkkdzqy.supabase.co
```

**Pour confirmer :**

1. Allez dans **Settings** (⚙️) → **Database**
2. Cherchez la section **"Connection string"** ou **"Connection info"**
3. Vous devriez voir une URL qui contient `db.pdeeieqmgrjldwkkdzqy.supabase.co`

---

## 🔑 Informations complètes à noter

Une fois que vous avez trouvé la section, notez :

```env
DB_HOST=db.pdeeieqmgrjldwkkdzqy.supabase.co
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=votre-mot-de-passe-cree-lors-de-la-creation-du-projet
DB_DATABASE=postgres
```

---

## 💡 Astuce

Si vous ne trouvez toujours pas :
1. Cliquez sur **"Reset database password"** dans Database Settings
2. Cela vous montrera aussi les informations de connexion
3. Ou cherchez un bouton **"Copy connection string"** qui affichera toutes les infos

---

## 🔍 Où chercher exactement

Dans Supabase Dashboard :
1. **Settings** (icône ⚙️ en bas à gauche)
2. **Database** (dans le menu de gauche)
3. Cherchez :
   - "Connection string"
   - "Connection info"
   - "Database URL"
   - "Connection pooling" (section avec l'URL)

Toutes ces sections contiennent le host `db.xxxxx.supabase.co` !


