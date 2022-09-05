import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ProfileService } from "../profile/profile.service";
import { createGradeDto } from "./dto/create-grade.dto";
import { GetAverageGradeDto } from "./dto/get-average-grade.dto";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import { Grade } from "./grade.model";

@Injectable()
export class GradeService {
  constructor(
    @InjectModel(Grade) private gradeRepository: typeof Grade,
    private profileService: ProfileService
  ) {}

  async createGrade(dto: createGradeDto, userId: number) {
    const teacherProfile = await this.profileService.getProfileById(
      dto.teacherId
    );
    const studentProfile = await this.profileService.getProfileById(
      dto.studentId
    );

    this.haveAccess(userId, teacherProfile.userId);

    if (!studentProfile.group) {
      throw new HttpException(
        "The profile does not belong to a student",
        HttpStatus.FORBIDDEN
      );
    }

    this.compareValues(studentProfile.university, teacherProfile.university);
    this.compareValues(studentProfile.faculty, teacherProfile.faculty);

    const grade = await this.gradeRepository.create(dto);

    return grade;
  }

  async updateGrade(dto: UpdateGradeDto, userId: number) {
    let grade = await this.gradeRepository.findByPk(dto.gradeId);
    const teacherProfile = await this.profileService.getProfileById(
      grade.teacherId
    );

    this.haveAccess(userId, teacherProfile.userId);

    grade.grade = dto.grade;

    await grade.save();
    return grade;
  }

  async getAverageGradeByStudent(dto: GetAverageGradeDto, userId: number) {
    let studentId = dto.studentId;
    const grades: number[] = await this.getGrades(studentId.toString());
    let averageGrade = this.calcAverage(grades);

    const senderProfile = await this.profileService.getProfileById(
      dto.senderId
    );
    if (!dto.studentId || senderProfile.userId !== userId) {
      throw new HttpException(
        "Invalid input data",
        HttpStatus.FORBIDDEN
      );
    }
    
    const studentProfile = await this.profileService.getProfileById(
      dto.studentId
    );

    if(!senderProfile.group){
      if(senderProfile.university !== studentProfile.university || 
        senderProfile.faculty !== studentProfile.faculty ) {
          throw new HttpException(
            "Invalid faculty",
            HttpStatus.FORBIDDEN
          );
        }
    } else if(senderProfile.userId !== studentProfile.userId) {
      throw new HttpException(
        "The profile does not belong to a student",
        HttpStatus.FORBIDDEN
      );
    }

    return averageGrade;
  }

  async getAverageGradeByFaculty(dto: GetAverageGradeDto, userId: number) {
    if (!dto.faculty) {
      throw new HttpException(
        "The profile does not belong to a student",
        HttpStatus.FORBIDDEN
      );
    }
    const grades: number[] = await this.getGradesByFaculty(
      dto.faculty.toString()
    );
    let averageGrade = this.calcAverage(grades);
    const teacherProfile = await this.profileService.getProfileById(
      dto.senderId
    );

    if (
      teacherProfile.userId !== userId &&
      dto.faculty !== teacherProfile.faculty &&
      !teacherProfile.group
    ) {
      throw new HttpException(
        "Invalid dto",
        HttpStatus.FORBIDDEN
      );
    }

    return averageGrade;
  }

  async getAverageGradeByGroup(dto: GetAverageGradeDto, userId: number) {
    const teacherProfile = await this.profileService.getProfileById(
      dto.senderId
    );

    if (teacherProfile.group || teacherProfile.userId !== userId) {
      throw new HttpException(
        "The profile does not belong to a teacher",
        HttpStatus.FORBIDDEN
      );
    }

    const grades: number[] = await this.getGradesByGroup(
      dto.group.toString(),
      teacherProfile.faculty.toString(),
      teacherProfile.university.toString()
    );

    let averageGrade = this.calcAverage(grades);

    return averageGrade;
  }

  async getAverageGradeByLesson(dto: GetAverageGradeDto, userId: number) {
    const grades: number[] = await this.getGradesByLesson(
      dto.lesson,
      dto.senderId
    );
    let averageGrade = this.calcAverage(grades);
    const studentProfile = await this.profileService.getProfileById(
      dto.senderId
    );
    if (
      studentProfile.userId !== userId ||
      !studentProfile.group ||
      !dto.lesson
    ) {
      throw new HttpException(
        "The profile does not belong to a student",
        HttpStatus.FORBIDDEN
      );
    }

    return averageGrade;
  }

  async getGradesByProfileAndLesson(dto: GetAverageGradeDto, userId: number) {
    const grades: number[] = await this.getGradesByLesson(
      dto.lesson,
      dto.senderId
    );

    const studentProfile = await this.profileService.getProfileById(
      dto.senderId
    );

    if (
      studentProfile.userId !== userId ||
      !studentProfile.group ||
      !dto.lesson
    ) {
      throw new HttpException(
        "The profile does not belong to a student",
        HttpStatus.FORBIDDEN
      );
    }

    return grades;
  }

  //Works with Grade repository
  private async getGradesByLesson(lesson: string, studentId: number) {
    const rows = await this.gradeRepository.findAll({
      where: {
        lesson: lesson,
        studentId: studentId,
      },
    });

    let grades: number[] = [];
    for (let index = 0; index < rows.length; index++) {
      grades.push(rows[index].getDataValue("grade"));
    }

    return grades;
  }

  private async getGrades(studentId: string) {
    const rows = await this.gradeRepository.findAll({
      where: {
        studentId: studentId,
      },
    });

    let grades: number[] = [];
    for (let index = 0; index < rows.length; index++) {
      grades.push(rows[index].getDataValue("grade"));
    }

    return grades;
  }

  //Works with Profile service
  private async getGradesByGroup(
    group: string,
    faculty: string,
    university: string
  ) {
    const profiles = await this.profileService.getProfileByGroup(
      group,
      faculty,
      university
    );
    const grades = await this.getGradesFromProfiles(profiles);
    return grades;
  }

  private async getGradesByFaculty(faculty: string) {
    const profiles = await this.profileService.getProfileByFaculty(faculty);
    const grades = await this.getGradesFromProfiles(profiles);

    return grades;
  }

  private async getGradesFromProfiles(profiles: any) {
    let grades: number[] = [];
    for (let index = 0; index < profiles.rows.length; index++) {
      let studentId = profiles.rows[index].getDataValue("id");
      grades = grades.concat(await this.getGrades(studentId.toString()));
    }

    return grades;
  }

  private calcAverage(array: number[]) {
    let average: number = 0;
    for (let index = 0; index < array.length; index++) {
      average += array[index];
    }
    average = average / array.length;
    return average;
  }

  private haveAccess(userId: number, profileUserId: number) {
    if (userId != profileUserId) {
      throw new HttpException("Have not access", HttpStatus.FORBIDDEN);
    }
    return true;
  }

  private compareValues(studentValue: string, teacherValue: string) {
    if (teacherValue != studentValue) {
      throw new HttpException(
        "Invalid university or faculty",
        HttpStatus.BAD_REQUEST
      );
    }
    return true;
  }
}
