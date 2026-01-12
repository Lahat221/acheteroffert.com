# 🐛 Débogage : Les offres ne s'affichent pas

## ✅ Vérifications effectuées

1. **Les offres sont dans la base de données** ✓
   - 7 offres visibles dans pgAdmin
   - Toutes avec `is_active = true`
   - Catégories variées : restauration, hotel, boulangerie

## 🔍 Prochaines étapes de débogage

### 1. Tester l'API directement

Ouvrez votre navigateur et allez sur :
```
http://localhost:3001/offers?active=true
```

**Résultat attendu :** Vous devriez voir du JSON avec vos offres.

**Si vous voyez une erreur :**
- Vérifiez que le backend est démarré
- Regardez les logs du backend pour voir l'erreur exacte

### 2. Vérifier la console du navigateur

1. Ouvrez la console (F12)
2. Allez sur http://localhost:3000
3. Regardez les erreurs dans la console

**Erreurs possibles :**
- `Failed to fetch` → Le backend n'est pas démarré
- `CORS error` → Problème de configuration CORS
- `TypeError` → Problème de mapping des données

### 3. Vérifier les logs du backend

Regardez la console où le backend est démarré. Vous devriez voir :
- Les requêtes SQL
- Les erreurs éventuelles

### 4. Test rapide : Vérifier que l'API fonctionne

Dans la console du navigateur (F12), exécutez :
```javascript
fetch('http://localhost:3001/offers?active=true')
  .then(r => r.json())
  .then(data => console.log('Offres:', data))
  .catch(err => console.error('Erreur:', err));
```

**Résultat attendu :** Vous devriez voir un objet avec `offers` et `total`.

## 🔧 Corrections appliquées

1. **Désactivation temporaire de la jointure avec reservations**
   - La relation `reservations` pourrait causer une erreur si la table n'existe pas
   - Correction dans `products.service.ts`

2. **Simplification du mapping des réservations**
   - Le frontend utilise maintenant `currentReservations: 0` par défaut
   - Correction dans `api.ts`

## 📝 Actions à faire

1. **Redémarrer le backend** pour appliquer les corrections
2. **Tester l'API** : http://localhost:3001/offers?active=true
3. **Rafraîchir la page d'accueil** (Ctrl+F5)
4. **Vérifier la console** pour les erreurs

## 🆘 Si ça ne fonctionne toujours pas

Envoyez-moi :
1. Ce que vous voyez sur http://localhost:3001/offers?active=true
2. Les erreurs dans la console du navigateur (F12)
3. Les logs du backend

