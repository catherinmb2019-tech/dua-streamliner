import { Controller, Get, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { UsersService } from '../../application/users.service';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { UserRole } from '../../domain/entities/user-role.enum';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';
import { AuthenticatedUser } from '../../../auth/domain/interfaces/authenticated-user.interface';

/**
 * Presentation layer for user management.
 * Exposes endpoints for reading and deactivating user accounts.
 * Only ADMINs can deactivate users; regular users can view their own profile.
 */
@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get the authenticated user profile' })
  async getMe(@CurrentUser() user: AuthenticatedUser) {
    return this.usersService.findByCognitoSub(user.sub);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get a user by ID (admin only)' })
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deactivate a user account (admin only)' })
  async deactivate(@Param('id') id: string): Promise<void> {
    return this.usersService.deactivateUser(id);
  }
}
