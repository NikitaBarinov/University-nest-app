import { forwardRef, Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Grade } from './grade.model';
import { ProfileModule } from '../profile/profile.module';
import { AuthModule } from '../auth/auth.module';

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
