import { User } from '@prisma/client';
import { FastifyRequest } from 'fastify';

interface RequestWithUser extends FastifyRequest {
  user: User;
}

export default RequestWithUser;
