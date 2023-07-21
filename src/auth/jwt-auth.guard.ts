import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();

      const authHeader = req.headers.authorization;

      const type = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (type !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Not authorized' });
      }

      const user = this.jwtService.verify(token);

      req.user = user;

      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'Not authorized' });
    }
  }
}
