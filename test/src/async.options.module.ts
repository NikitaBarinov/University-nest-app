import { Module } from '@nestjs/common';
import { User } from '../../src/users/users.model';
import { UsersModule } from '../../src/users/users.module';
import { SequelizeModule } from "@nestjs/sequelize";
import { Grade } from '../../src/grade/grade.model';
import { Profile } from '../../src/profile/profile.model';
import { ProfileModule } from '../../src/profile/profile.module';
import { GradeModule } from '../../src/grade/grade.module';
import { AuthModule } from '../../src/auth/auth.module';
import { UsersService } from '../../src/users/users.service';
import { UsersController } from '../../src/users/users.controller';
import { AuthService } from '../../src/auth/auth.service';

@Module({
  // controllers: [UsersController],
  providers:[AuthService],
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'sqlite',
        logging: false,
        host: '127.0.0.1',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'test',
        entities: [User, Grade, Profile],
        models: [User, Grade, Profile],
        synchronize: true,
        storage: ':memory:',
        // sync: {
        //   force: true,
        //   alter: true,
        // },
        retryAttempts: 2,
        retryDelay: 1000,
        repositoryMode: true,
      }),
    }),
    // SequelizeModule.forRoot({
    //   name: 'connection_2',
    //   dialect: 'sqlite',
    //   logging: false,
    //   host: '127.0.0.1',
    //   port: 5432,
    //   storage: ':memory:',
    //   username: 'postgres',
    //   password: 'postgres',
    //   database: 'test',
    //   // sync: {
    //   //   force: true,
    //   //   alter: true,
    //   // },
    //   repositoryMode: true,
    //   models: [User, Grade, Profile],
    //   // synchronize: true,
    //   retryAttempts: 2,
    //   retryDelay: 1000,
    // }),
    UsersModule,
    AuthModule,
    // ProfileModule,
    // GradeModule
  ],
})
export class AsyncOptionsFactoryModule {}