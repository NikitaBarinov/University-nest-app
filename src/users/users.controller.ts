import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("Пользователи")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: "Изменение пользователя" })
  @ApiResponse({ status: 201, type: User })
  @UseGuards(JwtAuthGuard)
  @Post('/update')
  update(@Req() request: any) {
    console.log(request.user);
    
    return this.usersService.updateUser(request.body, request.user.userId);
  }

  @ApiOperation({ summary: "Получить всех пользователей" })
  @ApiResponse({ status: 200, type: [User] })
  // @UseGuards(JwtAuthGuard)
  @Get('/getAll')
  getAll() {
    return this.usersService.getAllUsers();
  }
}
