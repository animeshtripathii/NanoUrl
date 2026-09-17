package com.url.shortner.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DatabaseInitializer.class);
    private final JdbcTemplate jdbcTemplate;

    public DatabaseInitializer(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) {
        try {
            logger.info("Ensuring PostgreSQL database tables exist in Neon DB...");

            jdbcTemplate.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    id BIGSERIAL PRIMARY KEY,
                    email VARCHAR(255) UNIQUE,
                    username VARCHAR(255) UNIQUE,
                    password VARCHAR(255),
                    role VARCHAR(255) DEFAULT 'ROLE_USER'
                );
            """);

            jdbcTemplate.execute("""
                CREATE TABLE IF NOT EXISTS url_mapping (
                    id BIGSERIAL PRIMARY KEY,
                    original_url TEXT,
                    short_url VARCHAR(255) UNIQUE,
                    click_count INT DEFAULT 0,
                    created_date TIMESTAMP,
                    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE
                );
            """);

            jdbcTemplate.execute("""
                CREATE TABLE IF NOT EXISTS click_event (
                    id BIGSERIAL PRIMARY KEY,
                    click_date TIMESTAMP,
                    url_mapping_id BIGINT REFERENCES url_mapping(id) ON DELETE CASCADE
                );
            """);

            logger.info("Database tables initialized successfully!");
        } catch (Exception e) {
            logger.error("Error initializing database tables: {}", e.getMessage(), e);
        }
    }
}
