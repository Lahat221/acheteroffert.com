# 🐘 Installation de PostgreSQL sur Windows

> 📖 **Retour à l'index** : [README.md](./README.md)

---

## 🔍 Vérification

Si vous obtenez une erreur "connection timeout" dans pgAdmin, cela signifie généralement que :
1. PostgreSQL n'est pas installé
2. Le service PostgreSQL n'est pas démarré
3. PostgreSQL est installé mais sur un autre port

---

## 📥 Option 1 : Installer PostgreSQL (si pas encore installé)

### Téléchargement

1. Allez sur : https://www.postgresql.org/download/windows/
2. Cliquez sur **"Download the installer"**
3. Téléchargez la dernière version (ex: PostgreSQL 16)

### Installation

1. **Lancez l'installateur** téléchargé
2. **Choisissez les composants** :
   - ✅ PostgreSQL Server (obligatoire)
   - ✅ pgAdmin 4 (déjà installé, mais vous pouvez le garder)
   - ✅ Command Line Tools (utile)
   - ✅ Stack Builder (optionnel)

3. **Choisissez le répertoire d'installation** :
   - Par défaut : `C:\Program Files\PostgreSQL\16` (ou version actuelle)
   - Gardez la valeur par défaut

4. **Configuration des données** :
   - Répertoire des données : `C:\Program Files\PostgreSQL\16\data`
   - Gardez la valeur par défaut

5. **⚠️ IMPORTANT : Mot de passe du superutilisateur**
   - **Username** : `postgres` (par défaut)
   - **Password** : **CHOISISSEZ UN MOT DE PASSE ET RETENEZ-LE !**
     - Ce mot de passe sera demandé dans pgAdmin
     - Notez-le dans un endroit sûr
   - ⚠️ **Ne laissez pas le champ vide !**

6. **Port** : `5432` (gardez la valeur par défaut)

7. **Locale** : `French, France` ou `Default locale`

8. **Terminez l'installation**

### Après l'installation

- Le service PostgreSQL devrait démarrer automatiquement
- pgAdmin devrait s'ouvrir (ou relancez-le)

---

## 🔧 Option 2 : Démarrer le service PostgreSQL (si déjà installé)

### Méthode 1 : Via les Services Windows

1. Appuyez sur **Windows + R**
2. Tapez : `services.msc` et appuyez sur **Entrée**
3. Cherchez **"postgresql"** dans la liste
4. Vous devriez voir un service comme :
   - `postgresql-x64-16` (ou version similaire)
5. **Clic droit** sur le service → **Démarrer**
6. Vérifiez que le **Statut** passe à **"En cours d'exécution"**

### Méthode 2 : Via PowerShell (en tant qu'administrateur)

1. Ouvrez **PowerShell en tant qu'administrateur**
2. Exécutez :
   ```powershell
   # Trouver le service PostgreSQL
   Get-Service | Where-Object {$_.DisplayName -like "*PostgreSQL*"}
   
   # Démarrer le service (remplacez le nom par celui trouvé)
   Start-Service postgresql-x64-16
   ```

### Méthode 3 : Via l'invite de commandes (en tant qu'administrateur)

1. Ouvrez **Invite de commandes en tant qu'administrateur**
2. Exécutez :
   ```cmd
   net start postgresql-x64-16
   ```
   (Remplacez par le nom exact de votre service)

---

## 🔑 Option 3 : Réinitialiser le mot de passe PostgreSQL

Si PostgreSQL est installé mais que vous ne connaissez pas le mot de passe :

### Méthode 1 : Via pgAdmin (si vous pouvez vous connecter)

1. Connectez-vous à pgAdmin
2. Développez **Servers** → votre serveur → **Login/Group Roles**
3. **Clic droit** sur **postgres** → **Properties**
4. Onglet **Definition** → Changez le mot de passe
5. Cliquez sur **Save**

### Méthode 2 : Via la ligne de commande

1. Ouvrez **Invite de commandes** en tant qu'administrateur
2. Allez dans le répertoire bin de PostgreSQL :
   ```cmd
   cd "C:\Program Files\PostgreSQL\16\bin"
   ```
   (Remplacez 16 par votre version)

3. Connectez-vous à PostgreSQL :
   ```cmd
   psql -U postgres
   ```
   (Si ça demande un mot de passe, passez à la méthode 3)

4. Changez le mot de passe :
   ```sql
   ALTER USER postgres PASSWORD 'votre_nouveau_mot_de_passe';
   \q
   ```

### Méthode 3 : Modifier le fichier pg_hba.conf (avancé)

1. Trouvez le fichier `pg_hba.conf` :
   - Généralement : `C:\Program Files\PostgreSQL\16\data\pg_hba.conf`

2. Ouvrez-le avec un éditeur de texte (en tant qu'administrateur)

3. Trouvez la ligne :
   ```
   host    all             all             127.0.0.1/32            scram-sha-256
   ```

4. Remplacez `scram-sha-256` par `trust` :
   ```
   host    all             all             127.0.0.1/32            trust
   ```

5. **Sauvegardez** le fichier

6. **Redémarrez** le service PostgreSQL

7. Connectez-vous sans mot de passe et changez-le :
   ```cmd
   psql -U postgres
   ALTER USER postgres PASSWORD 'votre_nouveau_mot_de_passe';
   \q
   ```

8. **Remettez** `scram-sha-256` dans `pg_hba.conf` et redémarrez

---

## ✅ Vérification

Une fois PostgreSQL installé et démarré :

1. **Vérifiez le service** :
   - Services Windows → Cherchez PostgreSQL → Statut = "En cours d'exécution"

2. **Testez la connexion dans pgAdmin** :
   - Ouvrez pgAdmin
   - Ajoutez un serveur avec :
     - Host: `localhost`
     - Port: `5432`
     - Username: `postgres`
     - Password: votre mot de passe
   - Si la connexion réussit, vous êtes prêt !

---

## 🐛 Dépannage

### Erreur : "Le service spécifié n'existe pas"
- PostgreSQL n'est pas installé → Installez-le (Option 1)

### Erreur : "connection timeout"
- Le service n'est pas démarré → Démarrez-le (Option 2)
- Vérifiez le port (par défaut 5432)

### Erreur : "password authentication failed"
- Mot de passe incorrect → Réinitialisez-le (Option 3)

### Le service ne démarre pas
- Vérifiez les logs dans : `C:\Program Files\PostgreSQL\16\data\log\`
- Vérifiez que le port 5432 n'est pas utilisé par un autre programme

---

## 📝 Notes

- **Mot de passe par défaut** : Il n'y a **pas** de mot de passe par défaut. Vous devez en définir un lors de l'installation.
- **Si vous avez oublié le mot de passe** : Utilisez la Méthode 3 (modifier pg_hba.conf)
- **Port alternatif** : Si le port 5432 est occupé, PostgreSQL peut utiliser un autre port (vérifiez dans les paramètres)

---

Une fois PostgreSQL installé et démarré, revenez au guide [GUIDE_PGADMIN.md](./GUIDE_PGADMIN.md) pour créer la base de données ! 🚀

---

> 📖 **Retour à l'index** : [README.md](./README.md)







