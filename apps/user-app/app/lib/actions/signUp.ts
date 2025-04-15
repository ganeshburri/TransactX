"use server";
import db from "@repo/db/client";
import bcrypt from "bcrypt";

export async function signUp(username: string, phone: string, password: string) {
    try {
        // Check if the user already exists
        const existingUser = await findUserByPhone(phone);
        if (existingUser) {
            return { error: true, message: "User already exists! Please login." };
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create the user and initialize their balance
        const user = await createUser(username, phone, hashedPassword);
        await initializeUserBalance(user.id);

        // Return the response
        return {
            error: false,
            message: "User registered successfully.",
            phone: user.phone_number as string
        };
    } catch (error) {
        console.error("Error during sign-up:", error);
        return { error: true, message: "An unexpected error occurred. Please try again later." };
    }
}

// Helper function to find a user by phone number
async function findUserByPhone(phone: string) {
    try {
        return db.user.findUnique({
            where: {
                phone_number: phone
            }
        });
    } catch (error) {
        console.error("Error finding user by phone:", error);
        throw new Error("Failed to check if user exists.");
    }
}

// Helper function to hash the password
async function hashPassword(password: string) {
    try {
        return bcrypt.hash(password, 10);
    } catch (error) {
        console.error("Error hashing password:", error);
        throw new Error("Failed to hash password.");
    }
}

// Helper function to create a new user
async function createUser(username: string, phone: string, hashedPassword: string) {
    try {
        return db.user.create({
            data: {
                name: username,
                phone_number: phone,
                password: hashedPassword
            }
        });
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user.");
    }
}

// Helper function to initialize the user's balance
async function initializeUserBalance(userId: string) {
    try {
        return db.balance.create({
            data: {
                userId
            }
        });
    } catch (error) {
        console.error("Error initializing user balance:", error);
        throw new Error("Failed to initialize user balance.");
    }
}