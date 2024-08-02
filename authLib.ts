import { hash } from "bcrypt-ts";
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.JWT_SECRET;
const hashedPass = process.env.HASHED_PASS;

export async function login(formData: FormData) {
      
    const credentials = { 
        username: formData.get("username"),
        password: formData.get("password")
        };
    
}
