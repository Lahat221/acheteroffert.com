# 🔍 Vérifier pourquoi les offres ne s'affichent pas

## Étapes de vérification

### 1. Vérifier que le backend est démarré

Ouvrez votre navigateur et allez sur :
```
http://localhost:3001/offers?active=true
```

Vous devriez voir du JSON avec les offres. Si vous voyez une erreur ou rien, le backend n'est pas démarré ou il y a un problème.

### 2. Vérifier que les offres sont dans la base de données

Dans pgAdmin, exécutez cette requête :
```sql
SELECT id, title, category, is_active, city 
FROM offers 
ORDER BY created_at DESC 
LIMIT 5;
```

### 3. Vérifier les logs du backend

Regardez la console où le backend est démarré. Vous devriez voir les requêtes et les erreurs.

### 4. Vérifier la console du navigateur

Ouvrez la console du navigateur (F12) et allez sur la page d'accueil. Vérifiez les erreurs dans la console.

### 5. Vérifier le mapping des données

Le problème peut venir du mapping des champs. Vérifiez que :
- `validDays` est bien mappé depuis `valid_days`
- `validFromHour` est bien mappé depuis `valid_from_hour`
- `validUntilHour` est bien mappé depuis `valid_until_hour`
- `imageUrl` est bien mappé depuis `image_url`
- `isFeatured` est bien mappé depuis `is_featured`

## Solutions possibles

### Problème : Le backend n'est pas démarré
**Solution :** Démarrez le backend avec `npm run dev` dans le dossier `backend`

### Problème : Les offres ne sont pas actives
**Solution :** Vérifiez que `is_active = true` dans la base de données

### Problème : L'API retourne une erreur
**Solution :** Vérifiez les logs du backend pour voir l'erreur exacte

### Problème : Le mapping des données ne fonctionne pas
**Solution :** Vérifiez que les noms de colonnes dans la base correspondent aux noms dans le code

