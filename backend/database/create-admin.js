/**
 * Script Node.js pour créer un administrateur avec un hash bcrypt valide
 * 
 * Usage: node create-admin.js
 * 
 * Ce script génère un hash bcrypt valide pour le mot de passe
 * et l'insère dans la base de données
 */

const bcrypt = require('bcrypt');
const { Client } = require('pg');

async function createAdmin() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '3720', // Remplacez par votre mot de passe PostgreSQL
    database: 'acheteroffert',
  });

  try {
    await client.connect();
    console.log('✅ Connecté à la base de données');

    // Génère le hash bcrypt pour le mot de passe "admin123456"
    const password = 'admin123456';
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insère l'administrateur
    const result = await client.query(`
      INSERT INTO admins (id, email, password_hash, first_name, last_name, role, is_active, created_at, updated_at)
      VALUES (
        gen_random_uuid(),
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        NOW(),
        NOW()
      )
      ON CONFLICT (email) DO NOTHING
      RETURNING id, email, first_name, last_name, role;
    `, [
      'admin@acheteroffert.com',
      passwordHash,
      'Admin',
      'Principal',
      'super_admin',
      true,
    ]);

    if (result.rows.length > 0) {
      console.log('✅ Administrateur créé avec succès !');
      console.log('Email: admin@acheteroffert.com');
      console.log('Mot de passe: admin123456');
    } else {
      console.log('ℹ️  Un administrateur avec cet email existe déjà');
    }

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await client.end();
  }
}

createAdmin();




