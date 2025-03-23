# DotLink - Simple URL Shortener  

DotLink is a minimal URL shortener that allows only the owner to create shortened links using a password-based authentication system. Anyone can access shortened links, but only authorized users can create new ones.  

## 🚀 Features  
- Password-protected URL shortening  
- Custom aliases for shortened links  
- PostgreSQL database integration  
- Simple REST API with Express  

---

## 🛠️ Setup  

### 1️⃣ Clone the Repository  
```git clone https://github.com/YOUR_USERNAME/dotlink.git
cd dotlink```

### 2️⃣ Install Dependencies  
`npm install`  

### 3️⃣ Configure Environment Variables  

Create a `.env` file in the root directory and add the following:  
```PORT=3030
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@YOUR_HOST/YOUR_DATABASE```
