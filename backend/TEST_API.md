# 🧪 Tester l'API des offres

## Test rapide

Ouvrez votre navigateur et allez sur :
```
http://localhost:3001/offers?active=true
```

## Ce que vous devriez voir

Vous devriez voir du JSON comme :
```json
{
  "offers": [
    {
      "id": "uuid",
      "title": "1 tacos acheté = 1 tacos offert",
      "description": "...",
      "imageUrl": "...",
      "city": "Saint-Denis",
      "category": "restauration",
      "validDays": [1, 2, 3, 4],
      "validFromHour": 23,
      "validUntilHour": null,
      "isFeatured": true,
      "maxReservations": 30,
      ...
    }
  ],
  "total": 21
}
```

## Si vous voyez une erreur

1. **Vérifiez que le backend est démarré** : `npm run dev` dans le dossier `backend`
2. **Vérifiez les logs du backend** pour voir l'erreur exacte
3. **Vérifiez que la base de données est accessible**

## Si vous voyez un tableau vide

Vérifiez dans pgAdmin :
```sql
SELECT COUNT(*) FROM offers WHERE is_active = true;
```

Si le résultat est 0, les offres ne sont pas actives ou n'existent pas.

