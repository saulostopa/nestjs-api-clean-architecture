import { Controller, Get, Post, Patch, Put, Delete, Param, Body, HttpCode } from '@nestjs/common';
import { CreateUserService } from '@modules/users/application/use-cases/create-user.use-case';
import { ListUsersService } from '@modules/users/application/use-cases/find-all-user.use-case';
import { GetUserByIdService } from '@modules/users/application/use-cases/find-by-id-user.use-case';
import { UpdateUserService } from '@modules/users/application/use-cases/update-user.use-case';
import { ReplaceUserService } from '@modules/users/application/use-cases/replace-user.use-case';
import { DeleteUserService } from '@modules/users/application/use-cases/delete-user.use-case';
import { IUserObject } from '@users/domain/entities/user.interface';
import { StatusCode } from '@shared/infra/http/status';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUser: CreateUserService,
    private readonly listUsers: ListUsersService,
    private readonly findById: GetUserByIdService,
    private readonly updateUser: UpdateUserService,
    private readonly replaceUser: ReplaceUserService,
    private readonly deleteUser: DeleteUserService, 
  ) {}

  @Post()
  @HttpCode(StatusCode.Created)
  async create(@Body() body: IUserObject) {
    return this.createUser.execute(body);
  }

  @Get()
  @HttpCode(StatusCode.Ok)
  async findAll() {
    return this.listUsers.execute();
  }

  @Get(':id')
  @HttpCode(StatusCode.Ok)
  async findUserById(@Param('id') id: string) {
    return this.findById.execute(id);
  }

  @Patch(':id')
  @HttpCode(StatusCode.Ok)
  async update(@Param('id') id: string, @Body() body: IUserObject) {
    return this.updateUser.execute(id, body);
  }

  @Put(':id')
  @HttpCode(StatusCode.Ok)
  async replace(@Param('id') id: string, @Body() body: IUserObject) {
    return this.replaceUser.execute(id, body);
  }

  @Delete(':id')
  @HttpCode(StatusCode.NoContent)
  async delete(@Param('id') id: string) {
    return this.deleteUser.execute(id);
  }
}
