import { Controller, Injectable } from '@nestjs/common';
import {Model} from 'mongoose';
var mongoose = require('mongoose');
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './Entity/student.model';

@Injectable()
export class StudentService {
  constructor(
 @InjectModel(Student.name) private  studentModel: Model<StudentDocument>){}

  //  creating a user 
  async createStudent(student): Promise<Student>{
     const newstudent = await new this.studentModel(student)
     return newstudent.save()
  }

  //  reading the user collection 
  async readStudent():Promise<Student[]>{
    return await this.studentModel.find({});
  }

  async readStudentbyname(data):Promise<Student[]>{
    return await this.studentModel.find(data);
  }

  async updateStudent(data):Promise<Student>{
    const _id = mongoose.Types.ObjectId(data.id);
    return await this.studentModel.findByIdAndUpdate(_id,data,{new:true});
    //filter_.id = _id;
    //filter_.username = data.username;
    //filter_.age = data.age;
    //filter_.address=data.address;

    //return  filter_.save()
  
  }

  // deleting the data 
  async deleteStudent(id:string):Promise<Student>{
    const _id = mongoose.Types.ObjectId(id);
    return await this.studentModel.findByIdAndDelete(_id)
  }
}
