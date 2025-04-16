-- Create database
CREATE DATABASE IF NOT EXISTS century21_db;
USE century21_db;

-- Users table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role ENUM('admin', 'agent', 'client') NOT NULL,
    phone VARCHAR(20),
    profile_image VARCHAR(255),
    bio TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- Projects (Properties) table
CREATE TABLE projects (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(12, 2) NOT NULL,
    property_type ENUM('Apartment', 'House', 'Villa', 'Commercial', 'Land', 'Condo', 'Townhouse') NOT NULL,
    status ENUM('For Sale', 'For Rent', 'Sold', 'Rented', 'Under Contract', 'Off Market') NOT NULL,
    bedrooms INT,
    bathrooms INT,
    area DECIMAL(10, 2),
    area_unit VARCHAR(10) DEFAULT 'sqft',
    year_built INT,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    zip_code VARCHAR(20),
    country VARCHAR(100) NOT NULL,
    neighborhood VARCHAR(100),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    youtube_url VARCHAR(255),
    featured BOOLEAN DEFAULT FALSE,
    owner_id INT,
    primary_agent_id INT,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (owner_id) REFERENCES users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (primary_agent_id) REFERENCES users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);

-- Project Images table
CREATE TABLE project_images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    binary_data LONGBLOB,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

-- Project Features table
CREATE TABLE project_features (
    feature_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    feature_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

-- Project Agents junction table
CREATE TABLE project_agents (
    project_id INT NOT NULL,
    user_id INT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    assigned_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (project_id, user_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Subscribers table
CREATE TABLE subscribers (
    subscriber_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP NULL
);

-- Newsletter subscribers table (used by the newsletter component)
CREATE TABLE newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP NULL
);

-- Property Views table - Fixed UNIQUE KEY constraint
CREATE TABLE property_views (
    view_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    user_id INT NULL,
    view_date DATE NOT NULL,
    view_count INT DEFAULT 1,
    UNIQUE KEY (project_id, view_date, user_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

-- Appointments table
CREATE TABLE appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    client_id INT NOT NULL,
    agent_id INT NOT NULL,
    appointment_date DATETIME NOT NULL,
    status ENUM('upcoming', 'completed', 'cancelled', 'rescheduled') DEFAULT 'upcoming',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (agent_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Property Reports table
CREATE TABLE property_reports (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    client_id INT NOT NULL,
    agent_id INT NOT NULL,
    visit_date DATE NOT NULL,
    visitor_name VARCHAR(100),
    visitor_contact VARCHAR(100),
    impression TEXT NOT NULL,
    feedback TEXT NOT NULL,
    notes TEXT,
    status ENUM('draft', 'submitted', 'reviewed') DEFAULT 'submitted',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (agent_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Insert admin users with hashed passwords (example using bcrypt)
INSERT INTO users (username, password_hash, email, first_name, last_name, role, phone, bio) VALUES
('century21_admin', '$2a$12$eI3Ub/y3MeN69Y5.WI7ZI.BfPFAqXHrEh.bQrAt.Oi.1EGh5XlTIS', 'admin1@century21.com', 'Admin', 'User', 'admin', '+1234567890', 'Main administrator for Century 21 platform'),
('admin_century21', '$2a$12$KpXyoE.ECr1ywI0UmQIEEOiPL7QQF.JJCBCz4fPY4VZSAaDOFzWHe', 'admin2@century21.com', 'System', 'Administrator', 'admin', '+1987654321', 'System administrator with full access'),
('c21superuser', '$2a$12$9Qx1Xz3dyOYbJCuPif5Wn.wB0FQnHQJwMm/5YIBLXZof.41Envz1C', 'superuser@century21.com', 'Super', 'User', 'admin', '+1122334455', 'Super user with elevated privileges');
