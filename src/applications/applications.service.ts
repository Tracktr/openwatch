import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ApplicationsService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async createApplication(
    name: string,
    user: { userId: string; email: string },
  ) {
    const application = await this.prisma.application.create({
      data: {
        name,
        user: { connect: { id: user.userId } },
      },
    });
    const apiKey = await this.authService.generateAuthKey(application.id);

    return {
      id: application.id,
      name: application.name,
      apiKey,
    };
  }
}
