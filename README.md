
**Replace** the `DATABASE_URL` with your actual PostgreSQL connection string.  

### 4️⃣ Set Up the Database  

Create a `urls` table in your PostgreSQL database:  

```sql
CREATE TABLE urls (  
    id SERIAL PRIMARY KEY,  
    short_id VARCHAR(255) UNIQUE NOT NULL,  
    original_url TEXT NOT NULL,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);```
