import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Grade } from './grade.mode';
// import { User } from 'src/users/users.model';

@Module({
  providers: [GradeService],
  controllers: [GradeController],
  imports: [
    SequelizeModule.forFeature([Grade]),
  ],
  exports: [
    GradeService
  ]
})
export class GradeModule {}
