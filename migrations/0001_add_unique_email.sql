-- Add UNIQUE constraint to email column to prevent duplicates
-- Note: If the table already has duplicate emails, you'll need to clean them up first

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_unique ON Users(email);