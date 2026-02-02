-- Permite ca customer_email să fie NULL (email opțional la checkout)
ALTER TABLE orders
  ALTER COLUMN customer_email DROP NOT NULL;
