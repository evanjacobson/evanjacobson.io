-- Create Users table for email subscriptions
CREATE TABLE IF NOT EXISTS Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON Users(email);