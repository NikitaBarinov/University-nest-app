import { forwardRef, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Server } from "http";
import { Sequelize } from "sequelize-typescript";
import * as request from "supertest";
import { AsyncOptionsFactoryModule } from "./src/async.options.module";
import { Grade } from "../src/grade/grade.model";
import { Profile } from "../src/profile/profile.model";
import { User } from "../src/users/users.model";
import { AuthModule } from "../src/auth/auth.module";
import { ProfileModule } from "../src/profile/profile.module";
import { UsersModule } from "../src/users/users.module";
import { SequelizeModule } from "@nestjs/sequelize";

let sequelize: Sequelize;

let user0 = {
  username: "student01",
  email: "student01@mail.ru",
  password: "password1",
  phone: "8923000001",
  dateOfBirth: "1999-06-15",
  sex: "male",
};

describe("Sequelize (async configuration)", () => {
  let server: Server;
  let app: INestApplication;

  beforeEach(async () => {
    let models = [User, Profile, Grade];

    sequelize = new Sequelize("sqlite::memory:", {
      models,
      host: "127.0.0.1",
      port: 5432,
      username: "postgres",
      password: "postgres",
      logging: false,
      sync: {
        force: true,
        alter: true,
      },
    });

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          models: models,
          dialect: "sqlite",
          host: "localhost",
          port: 3307,
          username: "root",
          password: "root",
          database: "test",
          storage: ":memory:",
          sync: {
            force: true,
            alter: true,
          },
        }),
        UsersModule,
      ],
    }).compile();
    await sequelize.sync({ force: true });
    app = moduleFixture.createNestApplication();
    server = await app.getHttpServer();
    await app.init();
  });

  it(`should return created entity`, () => {
    return request(server)
      .post("/auth/registration")
      .expect("Content-Type", /json/)
      .send(user0)
      .expect(201)
      .expect(res => {
        if (res.body.username !== user0.username) throw new Error('invalid name');
        if (res.body.email !== user0.email) throw new Error('invalid email');
        if (res.body.phone !== user0.phone) throw new Error('invalid phone');
        if (res.body.sex !== user0.sex) throw new Error('invalid sex');
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
