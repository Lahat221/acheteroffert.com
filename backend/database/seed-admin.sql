-- Script SQL pour créer un administrateur de test
-- 
-- IMPORTANT: Ce script nécessite un hash bcrypt valide pour le mot de passe.
-- Pour générer un hash valide, utilisez le script Node.js: create-admin.js
-- 
-- Usage recommandé:
--   cd backend/database
--   node create-admin.js
--
-- Ou utilisez l'API directement:
--   POST http://localhost:3001/auth/admin/register
--   Body: {
--     "email": "admin@acheteroffert.com",
--     "password": "admin123456",
--     "firstName": "Admin",
--     "lastName": "Principal",
--     "role": "super_admin"
--   }

-- Note: Le hash bcrypt doit être généré avec Node.js/bcrypt
-- Exemple de hash (pour "admin123456"): $2b$10$... (généré dynamiquement)

-- Pour créer l'admin via SQL, vous devez d'abord générer le hash avec create-admin.js

