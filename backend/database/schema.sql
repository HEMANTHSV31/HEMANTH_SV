-- Tree Donation Database Schema

-- Create database
CREATE DATABASE IF NOT EXISTS tree_donation;
USE tree_donation;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- NGOs table
CREATE TABLE IF NOT EXISTS ngos (
    ngo_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    address TEXT,
    contact_email VARCHAR(255),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trees table
CREATE TABLE IF NOT EXISTS trees (
    tree_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    ngo_id INT NOT NULL,
    donor_name VARCHAR(255) NOT NULL,
    donor_email VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    location TEXT NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (ngo_id) REFERENCES ngos(ngo_id) ON DELETE CASCADE
);

-- Insert sample NGOs for testing
INSERT INTO ngos (name, latitude, longitude, address, contact_email, phone) VALUES
('Green Earth Foundation', 12.9716, 77.5946, 'Bangalore, Karnataka, India', 'contact@greenearth.org', '+91-9876543210'),
('Tree Plantation Society', 19.0760, 72.8777, 'Mumbai, Maharashtra, India', 'info@treeplantation.org', '+91-9876543211'),
('Nature Conservation Trust', 13.0827, 80.2707, 'Chennai, Tamil Nadu, India', 'support@natureconservation.org', '+91-9876543212'),
('Eco Warriors NGO', 28.7041, 77.1025, 'New Delhi, India', 'hello@ecowarriors.org', '+91-9876543213'),
('Save Trees Initiative', 22.5726, 88.3639, 'Kolkata, West Bengal, India', 'contact@savetrees.org', '+91-9876543214');

-- Insert sample users for testing
INSERT INTO users (name, email) VALUES
('John Doe', 'john.doe@example.com'),
('Jane Smith', 'jane.smith@example.com'),
('Raj Kumar', 'raj.kumar@example.com');