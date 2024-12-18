import { User } from "@types";

const registerUser = async (userData:User) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), 
      });
  
      if (!response.ok) {
        throw new Error(`Failed to add review: ${response.statusText}`);
      }
  
      return await response.json(); 
    } catch (error) {
      console.error(error);
      return null; 
    }
  };

const loginUser = async(name:string, password:string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: name, password: password }),
        });

        if (!response.ok) {
            throw new Error(`Failed to login: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

const UserService = {
    registerUser,
    loginUser,
};

export default UserService;