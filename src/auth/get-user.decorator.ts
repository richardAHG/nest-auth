import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// Esta funcion se conecta con el jwt-startegy y atraves del metodo valdiator retorna el user
export const GetUser = createParamDecorator((_data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
