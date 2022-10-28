import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

type AuthConfig = {
  jwt: {
    secretKey: string;
  };
};

type DatabaseConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  db: string;
};

interface DB {
  [dbType: string]: DatabaseConfig;
}

type AWSServices = {
  restApiUrl: string;
  restApiKey: string;
  region: string;
  secretAccessKey: string;
  accessKeyId: string;
};

@Injectable()
export class ConfigService {
  public readonly auth: AuthConfig;
  public readonly aws: AWSServices;
  public readonly db: DB;
  public readonly isDev = process.env.NODE_ENV !== 'production';

  constructor(configService: NestConfigService) {
    this.auth = {
      jwt: {
        secretKey: configService.get('JWT_SECRET') ?? 'secret',
      },
    };

    this.db = {
      postgres: {
        host: configService.get('JWT_SECRET') ?? 'secret',
        port: configService.get('PG_PORT') ?? 5432,
        user: configService.get('PG_USER') ?? 'postgres',
        password: configService.get('PG_PASSWORD') ?? 'admin',
        db: configService.get('PG_DB') ?? 'minibus',
      },
    };

    this.aws = {
      restApiUrl: process.env.AWS_REST_API_URL || '',
      restApiKey: process.env.AWS_REST_API_KEY || '',
      region: process.env.AWS_REGION || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    };
  }
}
