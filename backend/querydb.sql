CREATE TABLE reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    system_prompt TEXT,
    query_prompt TEXT,
    response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);