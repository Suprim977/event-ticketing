import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Create Sequelize instance with DB credentials
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres', // other options: mysql, sqlite, mssql
    logging: false, // disable logging for cleaner console
  }
);

// Initialize and sync database
export const db = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");

    // Sync models (use { alter: true } for dev, avoid in prod)
    await sequelize.sync({ alter: true });
    console.log("📦 Models synchronized with the database.");

  } catch (error) {
    console.error("❌ Failed to connect or sync with the database:", error.message);
  }
};
