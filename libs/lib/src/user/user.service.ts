import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@indigolabs/crud-typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ReplaceUserDto } from './dtos/replace-user.dto';

@Injectable()
export class UserService extends TypeOrmCrudService<
  User,
  CreateUserDto,
  ReplaceUserDto,
  UpdateUserDto
> {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    @InjectMapper()
    readonly mapper: Mapper,
  ) {
    super(repository, mapper);
  }
}
