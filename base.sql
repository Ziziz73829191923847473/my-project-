CREATE DATABASE IF NOT EXISTS migration_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE migration_db;

-- Таблица пользователей (регистрация)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(191) NOT NULL UNIQUE,
    phone VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица заявок
CREATE TABLE IF NOT EXISTS applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    app_number VARCHAR(50) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    passport VARCHAR(50) NOT NULL,
    service_type VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'В обработке',
    notification TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);