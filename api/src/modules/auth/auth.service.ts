import { prisma } from "../../config/prisma";
import { hashPassword, comparePassword } from "../../utils/hash";
import { generateToken } from "../../utils/jwt";

interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

interface LoginDTO {
  email: string;
  password: string;
}

export class AuthService {

  async register(data: RegisterDTO) {

    const userExists = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    });

    if (userExists) {
      throw new Error("El correo ya está registrado");
    }

    const password = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password
      }
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

  }

  async login(data: LoginDTO) {

    const user = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    });

    if (!user) {
      throw new Error("Credenciales incorrectas");
    }

    const validPassword = await comparePassword(
      data.password,
      user.password
    );

    if (!validPassword) {
      throw new Error("Credenciales incorrectas");
    }

    const token = generateToken({
      id: user.id,
      role: user.role
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };

  }

}