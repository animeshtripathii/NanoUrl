CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(255) DEFAULT 'ROLE_USER'
);

CREATE TABLE IF NOT EXISTS url_mapping (
    id BIGSERIAL PRIMARY KEY,
    original_url TEXT,
    short_url VARCHAR(255),
    click_count INT DEFAULT 0,
    created_date TIMESTAMP,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS click_event (
    id BIGSERIAL PRIMARY KEY,
    click_date TIMESTAMP,
    url_mapping_id BIGINT REFERENCES url_mapping(id) ON DELETE CASCADE
);
