import { forwardRef, Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import {User} from "../users/users.model";
import {SequelizeModule} from "@nestjs/sequelize";
import { ProfileController } from './profile.controller';
import { Profile } from './profile.model';

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [
    SequelizeModule.forFeature([Profile]),
    forwardRef(() => User)
  ],
  exports: [
    ProfileService
  ]
})
export class ProfileModule {}
