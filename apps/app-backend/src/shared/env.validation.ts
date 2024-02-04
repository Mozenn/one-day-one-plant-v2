import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsString()
  DATABASE_URL: string;
  @IsNumber()
  DRAW_COOLDOWN_MS: number;
  @IsString()
  FRONTEND_URL: string;
  @IsNumber()
  APPLICATION_PORT: number;
  @IsString()
  DEFAULT_PLANT_NAME: string;
  @IsString()
  JWT_SECRET: string;
  @IsNumber()
  JWT_EXPIRATION_TIME: number;
  @IsString()
  EMAIL_SERVICE: string;
  @IsString()
  EMAIL_USER: string;
  @IsString()
  EMAIL_PASSWORD: string;
  @IsString()
  EMAIL_CONFIRMATION_URL: string;
  @IsNumber()
  JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: number;
  @IsNumber()
  SCORE_ON_DRAW_COMMON: number;
  @IsNumber()
  SCORE_ON_DRAW_UNCOMMON: number;
  @IsNumber()
  SCORE_ON_DRAW_RARE: number;
  @IsNumber()
  SCORE_ON_DRAW_ULTRA_RARE: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
