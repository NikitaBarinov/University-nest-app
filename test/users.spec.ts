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
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists
} = require('sequelize-test-helpers')
// const sequelize = 
require('dotenv').config();

// const UserModel = require('../src/models/User')
// const UserModel = require('../src/users/users.model')
const appModule = new AppModule()
describe("extra", () => {
  let usersService: UsersService;
  let usersController: UsersController;
  // let user1 = new User;
  
  console.log(appModule)

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
    const sequelize = new Sequelize('sqlite::memory:');
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }

    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
      imports: [
        SequelizeModule.forFeature([User]),
        forwardRef(() => ProfileModule),
        forwardRef(() => AuthModule),
    ],
    }).compile()
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