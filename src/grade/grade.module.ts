import { forwardRef, Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Grade } from './grade.model';
import { User } from 'src/users/users.model';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/profile.model';
import { ProfileModule } from 'src/profile/profile.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [GradeService],
  controllers: [GradeController],
  imports: [
    SequelizeModule.forFeature([Grade]),
    forwardRef(() => AuthModule),
    ProfileModule
  ],
  exports: [
    GradeService
  ]
})
export class GradeModule {}
