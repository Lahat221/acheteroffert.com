# 📸 Comment ajouter le logo

## 📍 Étape 1 : Placer l'image

Placez votre fichier image du logo dans ce dossier (`frontend/public/`) avec le nom :
- **`logo.jpeg`** (recommandé)
- ou `logo.png`
- ou `logo.svg`

## 📝 Étape 2 : Vérifier le nom du fichier

Le composant Logo cherche automatiquement `/logo.jpeg`

Si votre fichier a un autre nom, modifiez `frontend/src/components/Logo.tsx` :
```tsx
src="/votre-nom-de-fichier.jpeg"
```

## ✅ Vérification

Une fois l'image placée :
1. Redémarrez le serveur Next.js si nécessaire
2. Le logo devrait s'afficher automatiquement
3. Si l'image n'est pas trouvée, le logo CSS sera affiché en fallback

## 🔍 Emplacement exact

```
acheteroffert/
  └── frontend/
      └── public/
          └── logo.jpeg  ← Placez votre image ici
```

## 💡 Note

Le composant Logo a un système de fallback : si l'image n'est pas trouvée, il affichera automatiquement le logo en CSS.

