import { User as UserPrisma } from '@prisma/client';
import { Role } from '../types';

export class User {
    private id?: number;
    private username: string;
    private email: string;
    private password: string;
    private role: Role;

    constructor(user: {
        id?: number;
        username: string;
        email: string;
        password: string;
        role: Role;
    }) {
        this.validate(user);
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    // Getters
    public getId(): number | undefined {
        return this.id;
    }

    public getUsername(): string {
        return this.username;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getRole(): Role {
        return this.role;
    }

    // Setters
    // public setUsername(username: string): void {
    //     this.validate({ username, email: this.email, password: this.password });
    //     this.username = username;
    // }

    // public setEmail(email: string): void {
    //     this.validate({ username: this.username, email, password: this.password });
    //     this.email = email;
    // }

    // public setPassword(password: string): void {
    //     this.validate({ username: this.username, email: this.email, password});
    //     this.password = password;
    // }

    // public setId(id: number): void {
    //     if (id <= 0) {
    //         throw new Error('ID must be a positive number');
    //     }
    //     this.id = id;
    // }
    // dont need a setter for setid?

    validate(user: { username: string; email: string; password: string; role: Role }) {
        if (!user.username?.trim()) {
            throw new Error('Username is required');
        }
        if (!user.email?.trim()) {
            throw new Error('Email is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
        if (user.username.length < 3) {
            throw new Error('Username must be at least 3 characters long');
        }
        if (user.password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }
        if (!user.email.includes('@')) {
            throw new Error('Email must be valid');
        }
        if (!user.role) {
            throw new Error('Role is required');
        }
    }

    equals(user: User): boolean {
        return (
            this.id === user.getId() &&
            this.username === user.getUsername() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.role === user.getRole()
        );
    }

    static from({ id, username, email, password, role }: UserPrisma): User {
        return new User({ id, username, email, password, role: role as Role });
    }
}
