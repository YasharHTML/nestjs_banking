import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@app/security';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  // @UseGuards(AuthGuard)
  listUsers(
    @Body()
    { maxResults, pageToken }: { maxResults?: number; pageToken?: string },
  ) {
    return this.authService.listUsers(maxResults, pageToken);
  }

  @Put('/claims/:uid')
  // @UseGuards(AuthGuard)
  setCustomClaims(@Param('uid') uid: string, @Body() claims: any) {
    return this.authService.setCustomUserClaims(uid, claims);
  }
}
