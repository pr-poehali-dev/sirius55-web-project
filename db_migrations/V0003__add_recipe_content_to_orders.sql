-- Add recipe_content field to orders table
ALTER TABLE t_p13322342_sirius55_web_project.orders 
ADD COLUMN IF NOT EXISTS recipe_content TEXT;