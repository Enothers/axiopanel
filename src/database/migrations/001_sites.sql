CREATE TABLE IF NOT EXISTS sites (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(255) NOT NULL,

    domain VARCHAR(255) NOT NULL,

    docker_container VARCHAR(255),

    docker_image VARCHAR(255),

    github VARCHAR(255),

    branch VARCHAR(255),

    ssl_enabled BOOLEAN DEFAULT FALSE,

    status ENUM(
        'online',
        'offline',
        'building'
    ) DEFAULT 'offline',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);