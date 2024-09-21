Credentialist is a [Next.js](https://nextjs.org/) project.

## What it does
The idea behind Credentialist is to have an open source secure cloud based password manager. It is based on NextJS, uses hashing and JSON web tokens for login.  It stores the AES128 encrypted passwords in an MySQL database, queries to the database are done server side, and all encryption is done client side so neither encryption keys nor decrypted passwords are ever sent. It implements the experimental HTTPS NextJS option to encrypt the body in the requests. All requests run through the middleware where the session is checked and if it fails it cannot access protected routes. Even if the packets are intercepted the passwords are only sent one at a time and continue to be encrypted until the client decrypts it with their encryption key.

## Getting Started

First, copy this repository and install dependencies:

```bash
npm install
```

In case it's not already set, make sure your dev uses the experimental https

```bash
"scripts": {
    "dev": "next dev --experimental-https",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"}
```

## Setting up your environment

You need a MySQL database, and ideally a phpmyadmin access to make things easier. Here's a couple links on how to get that done if you don't know how to:
- [mysql](https://ubuntu.com/server/docs/install-and-configure-a-mysql-server)
- [phpmyadmin](https://ubuntu.com/server/docs/how-to-install-and-configure-phpmyadmin)

Now that that's done, set up the following tables on your database:
- credentials
- - id (INT)
- - service (TEXT)
- - username (TEXT)
- - password (TEXT)

- users
-  - id (INT)
-  - username (TEXT)
-  - hashedPassword (TEXT)

Finally, set up your enviroment variables in the .env.local file at the root of your project directory. It should look something like this:
```bash
JWT_SECRET='your-jwt-secret-key'
MYSQL_HOST='your-sql-address(most likely 127.0.0.1)'
MYSQL_PORT='your-sql-port(most likely 3306)'
MYSQL_DATABASE='your-sql-database-name'
MYSQL_USER='your-sql-user'
MYSQL_PASSWORD='your-sql-password'
```

To get it up and running just make sure the database is up and running and run (within the project folder):
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More
I'll add some diagrams further detailing how everything works in the future, but for now just keep in mind that there is a NECESSARY distinction between client side and server side react components (and libraries) to ensure no sensitive information gets routed through the internet.
