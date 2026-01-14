/**
 * Migration initiale : Création du schéma de base de données
 * 
 * Cette migration crée toutes les tables nécessaires pour le MVP :
 * - vendors (vendeurs)
 * - offers (offres)
 * - reservations (réservations)
 * - qr_codes (QR codes)
 * - subscriptions (abonnements)
 * - admins (administrateurs)
 * 
 * Pour exécuter cette migration :
 * npm run migration:run
 */
import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class InitialSchema1700000000000 implements MigrationInterface {
  /**
   * Méthode up : Crée les tables et les relations
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    /**
     * Table : vendors (Vendeurs)
     */
    await queryRunner.createTable(
      new Table({
        name: 'vendors',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password_hash',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'company_name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'first_name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'last_name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'address',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'postal_code',
            type: 'varchar',
            length: '10',
            isNullable: true,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    /**
     * Table : offers (Offres)
     */
    await queryRunner.createTable(
      new Table({
        name: 'offers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'vendor_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'image_url',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'original_price',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
            isNullable: false,
          },
          {
            name: 'valid_from',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'valid_until',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'max_reservations',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'category',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'valid_days',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'valid_from_hour',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'valid_until_hour',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'is_featured',
            type: 'boolean',
            default: false,
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    /**
     * Table : reservations (Réservations)
     */
    await queryRunner.createTable(
      new Table({
        name: 'reservations',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'offer_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'first_name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'last_name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            length: '20',
            default: "'pending'",
            isNullable: false,
          },
          {
            name: 'reserved_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'used_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'reservation_code',
            type: 'varchar',
            length: '50',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    /**
     * Table : qr_codes (QR Codes)
     */
    await queryRunner.createTable(
      new Table({
        name: 'qr_codes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'reservation_id',
            type: 'uuid',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'code',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'data',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'is_used',
            type: 'boolean',
            default: false,
            isNullable: false,
          },
          {
            name: 'used_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'expires_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    /**
     * Table : subscriptions (Abonnements)
     */
    await queryRunner.createTable(
      new Table({
        name: 'subscriptions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'vendor_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'plan_type',
            type: 'varchar',
            length: '50',
            default: "'standard'",
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            length: '20',
            default: "'active'",
            isNullable: false,
          },
          {
            name: 'starts_at',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'ends_at',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'payment_status',
            type: 'varchar',
            length: '20',
            default: "'pending'",
            isNullable: false,
          },
          {
            name: 'payment_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    /**
     * Table : admins (Administrateurs)
     */
    await queryRunner.createTable(
      new Table({
        name: 'admins',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password_hash',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'first_name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'last_name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'varchar',
            length: '50',
            default: "'admin'",
            isNullable: false,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
            isNullable: false,
          },
          {
            name: 'last_login_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    /**
     * Clés étrangères
     */

    // offers.vendor_id → vendors.id
    await queryRunner.createForeignKey(
      'offers',
      new TableForeignKey({
        columnNames: ['vendor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vendors',
        onDelete: 'CASCADE',
      }),
    );

    // reservations.offer_id → offers.id
    await queryRunner.createForeignKey(
      'reservations',
      new TableForeignKey({
        columnNames: ['offer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'offers',
        onDelete: 'CASCADE',
      }),
    );

    // qr_codes.reservation_id → reservations.id
    await queryRunner.createForeignKey(
      'qr_codes',
      new TableForeignKey({
        columnNames: ['reservation_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'reservations',
        onDelete: 'CASCADE',
      }),
    );

    // subscriptions.vendor_id → vendors.id
    await queryRunner.createForeignKey(
      'subscriptions',
      new TableForeignKey({
        columnNames: ['vendor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vendors',
        onDelete: 'CASCADE',
      }),
    );

    /**
     * Index pour améliorer les performances
     */

    // Index sur offers
    await queryRunner.createIndex(
      'offers',
      new TableIndex({
        name: 'idx_offers_vendor_id',
        columnNames: ['vendor_id'],
      }),
    );
    await queryRunner.createIndex(
      'offers',
      new TableIndex({
        name: 'idx_offers_city',
        columnNames: ['city'],
      }),
    );

    // Index sur reservations
    await queryRunner.createIndex(
      'reservations',
      new TableIndex({
        name: 'idx_reservations_email',
        columnNames: ['email'],
      }),
    );
    await queryRunner.createIndex(
      'reservations',
      new TableIndex({
        name: 'idx_reservations_offer_id',
        columnNames: ['offer_id'],
      }),
    );
    await queryRunner.createIndex(
      'reservations',
      new TableIndex({
        name: 'idx_reservations_status',
        columnNames: ['status'],
      }),
    );

    // Index sur qr_codes
    await queryRunner.createIndex(
      'qr_codes',
      new TableIndex({
        name: 'idx_qr_codes_is_used',
        columnNames: ['is_used'],
      }),
    );

    // Index sur subscriptions
    await queryRunner.createIndex(
      'subscriptions',
      new TableIndex({
        name: 'idx_subscriptions_vendor_id',
        columnNames: ['vendor_id'],
      }),
    );
    await queryRunner.createIndex(
      'subscriptions',
      new TableIndex({
        name: 'idx_subscriptions_status',
        columnNames: ['status'],
      }),
    );
  }

  /**
   * Méthode down : Supprime les tables (rollback)
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    // Supprime les tables dans l'ordre inverse (pour respecter les dépendances)
    await queryRunner.dropTable('qr_codes', true);
    await queryRunner.dropTable('reservations', true);
    await queryRunner.dropTable('subscriptions', true);
    await queryRunner.dropTable('offers', true);
    await queryRunner.dropTable('admins', true);
    await queryRunner.dropTable('vendors', true);
  }
}









