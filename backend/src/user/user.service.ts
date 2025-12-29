import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/createUser.input';
import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from './dto/updateUserInupt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUser(email: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async getUsers(): Promise<User[] | null> {
    return await this.prismaService.user.findMany();
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { name, email, password, block, grade } = createUserInput;
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        block,
        grade,
      },
    });
  }

  async updateUser(updateUserInput: UpdateUserInput): Promise<User> {
    const { id, name, grade, block } = updateUserInput;
    return await this.prismaService.user.update({
      where: { id },
      data: {
        name,
        grade,
        block,
      },
    });
  }
}
