-- Mã khôi phục (thay cho email "quên mật khẩu"): lưu SHA-256 của mã, mã gốc chỉ hiện cho người dùng một lần.
ALTER TABLE users ADD COLUMN recovery_hash TEXT;
