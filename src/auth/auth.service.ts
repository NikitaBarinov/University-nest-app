import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { User } from "../users/users.model";
import { LoginUserDto } from "../users/dto/login-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidateByEmail = await this.userService.getUserByEmail(
        userDto.email
      );
    const candidateByPhone = await this.userService.getUserByPhone(
      userDto.phone
    );
    const candidateByUsername = await this.userService.getUserByUsername(
      userDto.username
    );
    if (candidateByUsername || candidateByPhone || candidateByEmail) {
      throw new HttpException(
        "User with same username or email or phone number exists",
        HttpStatus.BAD_REQUEST
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    
    return user;
  }

  private async generateToken(user: User) {
    const payload = { email: user.getDataValue('email'), userId: user.getDataValue('userId'), phone: user.getDataValue('phone') };
    
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    
    if(user){
      const passwordEquals = await bcrypt.compare(
        userDto.password,
        user.getDataValue("password")
      );
      if (passwordEquals) {
        return user;
      }
    }

    throw new UnauthorizedException({
      message: "Invalid email or password",
    });
  }
}