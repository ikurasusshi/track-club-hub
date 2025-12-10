import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInReponse } from './dto/signInReponse';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { SignInInput } from './dto/signIn.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignInReponse)
  @UseGuards(GqlAuthGuard)
  async signIn(
    @Args('signInInput') signInInput: SignInInput,
    @Context() context: any,
  ) {
    return await this.authService.signIn(context.req.user);
  }
}
