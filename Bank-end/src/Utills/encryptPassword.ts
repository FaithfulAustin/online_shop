import bcrypt from "bcrypt"

class encryptPassword{


public static encryptPassword = async (password: string): Promise<string> => {
    const saltRounds = 10; // Higher the salt rounds, the more secure but slower the hashing process

  const salt = await bcrypt.genSalt(saltRounds); // Generate salt
  const hashedPassword = await bcrypt.hash(password, salt); // Hash the password using the salt
  return hashedPassword;
};

public static checkPassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword); // Compares the plain password with the hashed password
    return isMatch;
  };
}

export default encryptPassword;