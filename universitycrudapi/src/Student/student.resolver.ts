import { GraphQLModule,Resolver,Query,Args, Mutation, Int, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { CreatestudentInput, studentid, studentname, UpdatestudentInput } from './dto/student.input';
import { Student } from './Entity/student.model';
import { StudentService } from './student.services';
@Resolver((of) => Student)
export class StudentResolver {

  constructor(private readonly StudentService: StudentService) {}
  
  @Mutation(returns => Student)
  async createStudent(@Args('input') input: CreatestudentInput) {
    return await this.StudentService.createStudent(input);
  }

  @Query(returns => [Student])
  async getAllStudent(){
    return await this.StudentService.readStudent()
  }

  @Query(returns => [Student])
  async getAllStudentbyname(@Args('readstudent') readstudent: studentname){
    return await this.StudentService.readStudentbyname(readstudent)
  }


@Mutation(returns => Student)
async updateStudent(@Args('updatestudent') updatestudent: UpdatestudentInput){
  return await this.StudentService.updateStudent(updatestudent)
}


@Mutation(returns => Student)
async deleteStudentbyid(@Args('postId') postId: studentid){
  return await this.StudentService.deleteStudent(postId.id)
  }
}