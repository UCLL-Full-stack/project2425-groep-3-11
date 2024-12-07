export class User {
    private id?: number;
    private username: string;
    private email: string;
    private password: string;

    constructor(user:{id?: number, username: string, email: string, password: string}) {
        this.validate(user);
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
    }

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
    validate(user :{
        username: string,
        email: string,
        password: string,
    }) {
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
    }
    equals(user: User): boolean {
        return (
            this.id === user.getId() &&
            this.username === user.getUsername() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword()
        )
    }
}