import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { createGradeDto } from "./dto/create-grade.dto";
import { Grade } from "./grade.mode";

@Injectable()
export class GradeService {
  constructor(@InjectModel(Grade) private profileRepository: typeof Grade) {}

  async createGrade(dto: createGradeDto, userId: number) {
    // this.haveAccess(userId, dto.userId);
    const profile = await this.profileRepository.create(dto);

    return profile;
  }
}
