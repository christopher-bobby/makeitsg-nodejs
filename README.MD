# Problem Statement:
- Create a small CRUD application. Where user can login, see product list, and upon clicking will be redirected to product detail page.
- Admin will have ability to add product.


# How test: 
- Ensure that you have Node js version > 18.0.0 installed.
- npm install or npm install --force
- npm start


# Tech used:
- Node JS
- Postgre SQL 


# Things to consider:
- This has to be run with separate React Native app and be run on same machine / IP.
- The API is tested on React Native code that was made earlier in separate repository. 

# Future improvement:
- Add relevant feature like registration.
- Add relevant handler like reading password type, email type etc.
- Add documentation like swagger.
- Better coverage at tests.


# Hardcoded Users:
admin	admin@makeitsg.com  password
user	user@makeitsg.com	password


# .env:
DB_HOST=127.0.0.1
DB_USER=postgres
DB_PASSWORD=311223
DB_DATABASE=makeitsg
DB_PORT=5432
JWT_SECRET=makeitsg_secret
PORT=3300
