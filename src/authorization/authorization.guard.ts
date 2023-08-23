import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'util';
import { GetVerificationKey, expressjwt } from 'express-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private AUTH0_AUDIENCE: string;
  private AUTH0_DOMAIN: string;
  constructor(private readonly configService: ConfigService) {
    this.AUTH0_AUDIENCE = this.configService.get<string>('AUTH0_AUDIENCE');
    this.AUTH0_DOMAIN = this.configService.get<string>('AUTH0_DOMAIN');
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.getArgByIndex(0);
    const res = context.getArgByIndex(1);

    const verifyJwt = promisify(
      expressjwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json`,
        }) as GetVerificationKey,
        audience: this.AUTH0_AUDIENCE,
        issuer: this.AUTH0_DOMAIN,
        algorithms: ['RS256'],
      }),
    );

    try {
      await verifyJwt(req, res);
      return true;
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }
}
