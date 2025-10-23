-- Create users table for registration system
CREATE TABLE IF NOT EXISTS t_p13322342_sirius55_web_project.users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add user_id to orders table
ALTER TABLE t_p13322342_sirius55_web_project.orders 
ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES t_p13322342_sirius55_web_project.users(id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON t_p13322342_sirius55_web_project.users(email);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON t_p13322342_sirius55_web_project.orders(user_id);