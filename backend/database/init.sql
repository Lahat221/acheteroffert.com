-- Script d'initialisation de la base de données acheteroffert
-- 
-- Ce script crée la base de données et active l'extension UUID
-- 
-- Pour exécuter ce script :
-- 1. Connectez-vous à PostgreSQL (via pgAdmin, DBeaver, ou psql)
-- 2. Exécutez ce script en tant qu'utilisateur avec les droits de création de base de données
--    (généralement l'utilisateur 'postgres')

-- Créer la base de données
CREATE DATABASE acheteroffert;

-- Se connecter à la base de données (nécessaire pour créer l'extension)
\c acheteroffert

-- Activer l'extension UUID
-- Cette extension est nécessaire pour générer des UUID automatiquement
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Vérification : Afficher les extensions installées
SELECT * FROM pg_extension WHERE extname = 'uuid-ossp';








