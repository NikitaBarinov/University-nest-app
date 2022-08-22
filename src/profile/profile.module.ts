import { forwardRef, Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import {User} from "../users/users.model";
import {SequelizeModule} from "@nestjs/sequelize";
import { ProfileController } from './profile.controller';
import { Profile } from './profile.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [
    SequelizeModule.forFeature([Profile]),
    forwardRef(() => User),
    forwardRef(() => AuthModule),
  ],
  exports: [
    ProfileService
  ]
})
export class ProfileModule {}
