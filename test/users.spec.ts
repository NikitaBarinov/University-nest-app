import { forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Test, TestingModule } from "@nestjs/testing";
import { ProfileModule } from "../src/profile/profile.module";
import { AuthModule } from "../src/auth/auth.module";
import { UsersController } from "../src/users/users.controller";
import { User } from "../src/users/users.model";
import { UsersService } from "../src/users/users.service";
import { AppModule } from "../src/app.module";
import { Sequelize } from "sequelize-typescript";
import { Profile } from "../src/profile/profile.model";
import { Grade } from "../src/grade/grade.model";
import { join } from "path";
import { NestFactory } from "@nestjs/core";
// const {
//   sequelize,
//   dataTypes,
//   checkModelName,
//   checkUniqueIndex,
//   checkPropertyExists
// } = require('sequelize-test-helpers')
let sequelize: Sequelize;
const dotenv = require("dotenv");

const fs = require("fs")
console.log(process.env.POSTGRESS_PASSWORD)
// const UserModel = require('../src/models/User')
// const UserModel = require('../src/users/users.model')
// const appModule = new AppModule()
let envConfig = dotenv.parse(fs.readFileSync(`.development.env`));
    for (let parameter in envConfig) {
      process.env[parameter] = envConfig[parameter];
    }
describe("extra", () => {
  let usersService: UsersService;
  let usersController: UsersController;
  // let user1 = new User;
  
  // console.log(appModule)

  // console.log(UserModel.init())
  // let userModel: User
  // const user = new UserModel()
  // console.log(user)

  // const user = new User()
  // checkModelName(User)('User')
  // let testAppModule: UsersModule = await Test.createTestingModule(
  //   {controllers: [UsersController],
  //     providers: [UsersService],
  //     imports: [
  //         SequelizeModule.forFeature([User]),
  //         forwardRef(() => ProfileModule),
  //         forwardRef(() => AuthModule),
  //     ],
  //     exports: [
  //       UsersService,
  //   ]}
  // ).compile();

  beforeEach(async () => {
    let models = [
      User,
      Profile,
      Grade
    ]
  
    
  
    sequelize = new Sequelize('sqlite::memory:', {
      models,
      logging: false,
      password: "postgres",
      sync: {
        force: true,
        alter: false,
      },
    })
    
    await sequelize.sync()
    
    const app = await  NestFactory.create(AppModule);
    
    await app.listen(5432);
    let server = app.getHttpServer();
    await app.init();
    // const sequelize = new Sequelize('sqlite::memory:');
    // try {
    //   await sequelize.authenticate();
    //   console.log('Connection has been established successfully.');
    // } catch (error) {
    //   console.error('Unable to connect to the database:', error);
    // }
    // console.log(sequelize)
    // console.log(await sequelize.showAllSchemas());
    console.log(sequelize.models);
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
      imports: [
        SequelizeModule.forFeature([User, Profile, Grade]),
        // SequelizeModule.forRoot({
        //   database: 'test',
        //   dialect: 'postgres',
        //   logging: false,
        //   username: 'postgres',
        //   password: 'postgres',
        //   host: '0.0.0.0',
        //   port: 5432,
        //   synchronize: true,
        //   autoLoadModels: true,
        //   retryAttempts: 2,
        //   retryDelay: 1000,
        // }),
        // SequelizeModule.forRoot(
        // ),
        // sequelize,
        // User,
        forwardRef(() => ProfileModule),
        forwardRef(() => AuthModule),
    ]
    }).compile()
    // const app = moduleRef.createNestApplication();
    // const sequelize1 = moduleRef.get<Sequelize>(Sequelize);
    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);
    // userModel = moduleRef.get<User>(User);
    console.log(usersController)
  });

  afterEach(() => {});

  test("adds 1 + 2 to equal 3", () => {
    expect(1 + 2).toBe(3);
  });
});
test("adds 1 + 2 to equal 3", () => {
  expect(1 + 2).toBe(3);
});