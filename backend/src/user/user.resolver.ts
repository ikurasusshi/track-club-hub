import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { GetUserArgs } from './dto/getUser.args';
import { User as UserModel } from './models/user.model';
import { Query } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CreateUserInput } from './dto/createUser.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserModel, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<User | null> {
    return await this.userService.getUser(getUserArgs.email);
  }

  @Mutation(() => UserModel)
  @UseGuards(JwtAuthGuard)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.createUser(createUserInput);
  }
}
