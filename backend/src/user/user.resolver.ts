import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { GetUserArgs } from './dto/getUser.args';
import { User as UserModel } from './models/user.model';
import { Query } from '@nestjs/graphql';
import type { User } from '@prisma/client';
import { CreateUserInput } from './dto/createUser.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { UpdateUserInput } from './dto/updateUserInupt';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserModel, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<User | null> {
    return await this.userService.getUser(getUserArgs.email);
  }

  @Query(() => [UserModel])
  @UseGuards(JwtAuthGuard)
  async getUsers(): Promise<User[] | null> {
    return await this.userService.getUsers();
  }

  @Query(() => UserModel)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: User): Promise<User> {
    return await this.userService.me(user);
  }

  @Mutation(() => UserModel)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.createUser(createUserInput);
  }

  @Mutation(() => UserModel)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return await this.userService.updateUser(updateUserInput);
  }
}
