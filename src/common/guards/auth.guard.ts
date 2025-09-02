// auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    // 🔓 Agar route @Roles('public') bo'lsa — token talab qilinmaydi
    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (roles?.includes('public')) return true;

    const req = ctx.switchToHttp().getRequest();
    const auth = req.headers.authorization as string | undefined;
    console.log(auth);
    
    if (!auth?.startsWith('Bearer ')) throw new UnauthorizedException();

    const token = auth.slice(7);
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY || 'my-secret');
      req.user = payload; // { id, role, ... } bo'lishi kerak
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
