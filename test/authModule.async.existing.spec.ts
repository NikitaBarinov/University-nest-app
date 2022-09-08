import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Server } from "http";
import { Sequelize } from "sequelize-typescript";
import * as request from "supertest";
import { Grade } from "../src/grade/grade.model";
import { Profile } from "../src/profile/profile.model";
import { User } from "../src/users/users.model";
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

let user1 = {
  username: "student02",
  email: "student02@mail.ru",
  password: "password2",
  phone: "8923000002",
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
      .expect((res) => {
        if (res.body.username !== user0.username)
          throw new Error("invalid name");
        if (res.body.email !== user0.email) throw new Error("invalid email");
        if (res.body.phone !== user0.phone) throw new Error("invalid phone");
        if (res.body.sex !== user0.sex) throw new Error("invalid sex");
      });
  });

  it(`should return created entity`, async () => {
    await request(server)
      .post("/auth/registration")
      .expect("Content-Type", /json/)
      .send(user0);
    return request(server)
      .post("/auth/registration")
      .expect("Content-Type", /json/)
      .send(user0)
      .expect(400)
      .expect((res) => {
        if (
          res.body.message !==
          "User with same username or email or phone number exists"
        )
          throw new Error("User with same name created");
      });
  });

  it(`should login by user`, async () => {
    await request(server)
      .post("/auth/registration")
      .expect("Content-Type", /json/)
      .send(user0);

    return request(server)
      .post("/auth/login")
      .expect("Content-Type", /json/)
      .send(user0)
      .expect(201)
      .expect((res) => {
        if (!res.body.token) throw new Error("Invalid user");
      });
  });

  it(`should be reverted with message`, async () => {
    await request(server)
      .post("/auth/registration")
      .expect("Content-Type", /json/)
      .send(user0);

    return request(server)
      .post("/auth/login")
      .expect("Content-Type", /json/)
      .send(user1)
      .expect(401)
      .expect((res) => {
        if (res.body.message !== "Invalid email or password")
          throw new Error("Invalid login test in service");
      });
  });

  it(`should update user info`, async () => {
    await request(server)
      .post("/auth/registration")
      .expect("Content-Type", /json/)
      .send(user0);

    let response = await request(server)
      .post("/auth/login")
      .expect("Content-Type", /json/)
      .send(user0);

    let TOKEN = response.body.token;
    console.log(TOKEN);

    return request(server)
      .post("/users/update")
      .expect("Content-Type", /json/)
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(user1)
      .expect(201)
      .expect((res) => {
        if (
          res.body.username !== user1.username ||
          res.body.email !== user1.email ||
          res.body.password !== user1.password ||
          res.body.phone !== user1.phone ||
          res.body.dateOfBirth !== user1.dateOfBirth ||
          res.body.sex !== user1.sex
        ) {
          throw new Error("User successfully updated");
        }
      });
  });

  it(`should update user info`, async () => {
    await request(server)
      .post("/auth/registration")
      .expect("Content-Type", /json/)
      .send(user0);

    await request(server)
      .post("/auth/registration")
      .expect("Content-Type", /json/)
      .send(user1);

    return request(server)
      .get("/users/getAll")
      .expect((res) => {
        if (
          res.body[0].username !== user0.username &&
          res.body[1].username !== user1.username
        )
          throw new Error("Invalid users returned");
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
