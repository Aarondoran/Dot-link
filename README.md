# DotLink - Simple URL Shortener
DotLink is a minimal URL shortener that allows only the owner to create shortened links using a password-based authentication system. Anyone can access shortened links, but only authorized users can create new ones.

## Features
- Password-protected URL shortening

- Custom aliases for shortened links

- PostgreSQL database integration

- Simple REST API with Express

## Setup
1️. Clone the Repository
Use the following command:

``git clone https://github.com/YOUR_USERNAME/dotlink.git  
cd dotlink``

2️. Install Dependencies
Run the following command:

`npm install`

3️. Configure Environment Variables
Create a .env file in the root directory and add the following:

`PORT=3030  
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@YOUR_HOST/YOUR_DATABASE`

Replace the DATABASE_URL with your actual PostgreSQL connection string.

4️. Set Up the Database
Create a urls table in your PostgreSQL database:

`CREATE TABLE urls (  
    id SERIAL PRIMARY KEY,  
    short_id VARCHAR(255) UNIQUE NOT NULL,  
    original_url TEXT NOT NULL,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);`

5️. Start the Server
Run manually:

`node server.js`

OR

Run with PM2 (recommended for production):

`pm2 start server.js --name dotlink`

## API Endpoints
➤ Shorten a URL (Requires Password)
Endpoint:
POST /api/shorten

Request Body:
`{  
  "originalUrl": "https://example.com",  
  "customAlias": "myalias",  
}`
Response:
`{  
  "shortUrl": "http://yourdomain.com/myalias"  
}`

➤ Redirect to Original URL
Usage:
GET `/:short_id`

Example:
GET `http://yourdomain.com/myalias`

➤ Redirects to https://example.com

## License
This project is licensed under the MIT License.

