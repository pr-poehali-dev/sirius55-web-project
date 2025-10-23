CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    plan VARCHAR(20) NOT NULL CHECK (plan IN ('basic', 'premium', 'vip')),
    amount INTEGER NOT NULL,
    user_contact TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
