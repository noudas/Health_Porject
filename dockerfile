# Use the official MySQL image as the base image
FROM mysql:latest

# Copy the init.sql file to the container
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the MySQL port (optional, already handled by Docker Compose)
EXPOSE 3306
