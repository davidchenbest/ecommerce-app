# Routes

1. auth:
   - post:
     - /register
     - /registerAdmin
     - /login
2. user:
   - get:
     - /profile
   - post:
     - /editProfile
3. admin:
   - get:
     - /users
   - delete:
     - /deleteUser/:id
