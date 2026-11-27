-- Polylingo: tài khoản và tiến độ học (Cloudflare D1)
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  name TEXT NOT NULL DEFAULT '',
  password_hash TEXT NOT NULL,      -- PBKDF2-SHA256, base64
  password_salt TEXT NOT NULL,      -- base64
  password_iter INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,      -- SHA-256 của token trong cookie, không lưu token gốc
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL,      -- epoch ms
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);

CREATE TABLE IF NOT EXISTS progress (
  user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  data TEXT NOT NULL,               -- JSON: toàn bộ khóa localStorage của web
  version INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS login_attempts (
  key TEXT NOT NULL,                -- email (chữ thường) hoặc ip:<địa chỉ>
  at INTEGER NOT NULL               -- epoch ms
);
CREATE INDEX IF NOT EXISTS idx_login_attempts ON login_attempts(key, at);
