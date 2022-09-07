import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { GraphQLModule,Resolver,Query,Args, Mutation, Int, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { UpdatestudentInput } from 'src/Student/dto/student.input';
import { Student } from 'src/Student/Entity/student.model';
import { StudentService } from 'src/Student/student.services';
import { CreateteacherInput,UpdateteacherInput,teacherid } from './dto/teacher.input';

import { Teacher } from './Entity/teacher.model';

import { TeacherService } from './teacher.services';



@Resolver((of) => Teacher)
export class TeacherResolver {

  constructor(private readonly TeacherService: TeacherService, readonly StudentService:StudentService) {}
  
  @Mutation(returns => Teacher)
  async createTeacher(@Args('input') input: CreateteacherInput) {
    return await this.TeacherService.createTeacher(input);
  }

  @Query(returns => [Teacher])
  async getAllTeachers(){
    return await this.TeacherService.readTeacher()
  }


@Mutation(returns => Teacher)
async updateTeacher(@Args('updateteacher') updateteacher: UpdateteacherInput){
  return await this.TeacherService.updateTeacher(updateteacher)
}

@Mutation(returns => Student)
async updateStudentbyteacher(@Args('updatestudent') updatestudent: UpdatestudentInput){
  return await this.StudentService.updateStudent(updatestudent)
}



@Mutation(returns => Teacher)
async deleteTeacherbyid(@Args('postId') postId: teacherid){
  return await this.TeacherService.deleteTeacher(postId.id)
  }
}