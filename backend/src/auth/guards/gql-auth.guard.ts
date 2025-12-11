import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class GqlAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    // GraphQLの場合、リクエスト情報が通常とは異なる場所に格納されているため、この変換が必要
    // ctxにはリクエストの情報(クエリ、引数、コンテキストなど)が含まれる。
    const ctx = GqlExecutionContext.create(context);

    // GraphQLのコンテキストオブジェクトを取得する。
    const context_req = ctx.getContext<{ req: Record<string, unknown> }>();

    // context_reqから実際のHTTPリクエストオブジェクト(req)を取り出す。
    // このリクエストオブジェクトにはヘッダー、ボディ、クッキーなどが含まれる。
    const request = context_req.req;

    // GraphQL mutationに渡された引数を取得する。
    // signInInput(emailとpassword)を取得する。
    const args = ctx.getArgs<{ signInInput: unknown }>();

    // PassportのLocalStrategyは通常、RESTAPIのreq.body.emailのように期待するので、request.bodyにコピーすることでPassportが理解できるようにする。
    request.body = args.signInInput;

    // 加工したリクエストオブジェクトを返す。
    // LocalStrategyのvalidateメソッドに渡される。
    return request;
  }
}
