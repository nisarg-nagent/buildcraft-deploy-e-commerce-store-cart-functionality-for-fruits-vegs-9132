-- FreshCart Market hardcoded admin account seed
-- Keeps existing databases aligned with the login credentials shown in the UI.

INSERT INTO users (id, email, password, name, role)
VALUES
  ('user_admin', 'admin@freshcart.com', 'admin123', 'FreshCart Admin', 'admin'),
  ('user_demo_admin', 'demo@example.com', 'demo123', 'Demo Admin', 'admin')
ON CONFLICT (email) DO UPDATE SET
  password = EXCLUDED.password,
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  updated_at = NOW();
