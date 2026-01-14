# 🔍 Où trouver le Host Supabase - Guide Visuel

## Vous êtes actuellement sur : "Database Settings"

Cette page contient les **paramètres** de la base de données, mais **PAS** les informations de connexion.

---

## ✅ Où trouver le Host (3 méthodes)

### Méthode 1 : Via "Connection String" (La plus simple)

1. **Restez dans Settings** (vous y êtes déjà)
2. Dans le menu de gauche, vous voyez "Database" → Cliquez dessus
3. Vous verrez plusieurs onglets/sections :
   - **Connection string** ← Cliquez ici !
   - Connection pooling
   - Connection info
4. Dans "Connection string", vous verrez une URL comme :

```
postgresql://postgres:[YOUR-PASSWORD]@db.pdeeieqmgrjldwkkdzqy.supabase.co:5432/postgres
```

**Le Host est** : `db.pdeeieqmgrjldwkkdzqy.supabase.co`

---

### Méthode 2 : Via "Connection Info"

1. Dans **Settings** → **Database**
2. Cherchez la section **"Connection Info"** ou **"Database URL"**
3. Vous verrez un tableau avec :
   - **Host** : `db.xxxxx.supabase.co`
   - **Port** : `5432`
   - **Database** : `postgres`
   - **User** : `postgres`

---

### Méthode 3 : Via "Connection Pooling"

1. Dans **Settings** → **Database**
2. Cliquez sur l'onglet **"Connection Pooling"**
3. Vous verrez une URL de connexion avec le host

---

## 📍 Navigation exacte

```
Supabase Dashboard
  └─ Settings (⚙️) ← Vous êtes ici
      └─ Database ← Cliquez ici
          ├─ Connection string ← Le Host est ici !
          ├─ Connection info
          └─ Connection pooling
```

---

## 🎯 D'après votre URL

Votre projet Supabase a l'ID : `pdeeieqmgrjldwkkdzqy`

Donc votre Host devrait être :
```
db.pdeeieqmgrjldwkkdzqy.supabase.co
```

**Pour confirmer :**
1. Allez dans **Settings** → **Database**
2. Cherchez **"Connection string"** ou **"Connection info"**
3. Vous devriez voir cette URL quelque part

---

## 💡 Astuce rapide

Si vous ne trouvez toujours pas :

1. Dans **Settings** → **Database**
2. Cherchez un bouton **"Copy connection string"** ou **"Show connection string"**
3. Cliquez dessus → Cela affichera toutes les informations
4. Le Host sera dans l'URL affichée

---

## 📝 Ce que vous devez noter

Une fois trouvé, notez :

```
Host : db.pdeeieqmgrjldwkkdzqy.supabase.co
Port : 5432
Database : postgres
User : postgres
Password : (celui que vous avez créé lors de la création du projet)
```

---

## ⚠️ Si vous ne trouvez toujours pas

1. Essayez de cliquer sur **"Reset database password"** dans Database Settings
2. Cela vous montrera aussi les informations de connexion
3. Ou cherchez un onglet **"API"** dans Settings → il contient aussi les infos de connexion


