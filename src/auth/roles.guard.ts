import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Role } from 'src/roles/roles.model';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles: string[] = this.reflector.getAllAndOverride(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (!requiredRoles) {
        return true;
      }

      const req = context.switchToHttp().getRequest();

      const authHeader = req.headers.authorization;

      const type = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (type !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Not authorized' });
      }

      const user = this.jwtService.verify(token);

      req.user = user;

      return user.roles.some((role: Role) => requiredRoles.includes(role.name));
    } catch (e) {
      throw new HttpException('No access', HttpStatus.FORBIDDEN);
    }
  }
}
