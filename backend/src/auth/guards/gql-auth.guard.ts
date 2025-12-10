import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class GqlAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const context_req = ctx.getContext<{ req: Record<string, unknown> }>();
    const request = context_req.req;
    const args = ctx.getArgs<{ signInInput: unknown }>();
    request.body = args.signInInput;
    return request;
  }
}
