-- Create the user with a password
CREATE USER '${ENV_MYSQL_USER}'@'%' IDENTIFIED BY '${ENV_MYSQL_PASSWORD}';

-- Grant all privileges to the user
GRANT ALL PRIVILEGES ON *.* TO '${ENV_MYSQL_USER}'@'%' WITH GRANT OPTION;

-- Flush privileges to apply changes
FLUSH PRIVILEGES;
