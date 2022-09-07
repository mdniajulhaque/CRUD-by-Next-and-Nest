import {  Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppModule } from 'src/app.module';
import { StudentModule } from 'src/Student/student.modules';
import { StudentResolver } from 'src/Student/student.resolver';
import { StudentService } from 'src/Student/student.services';
import { Teacher, TeacherSchema } from './Entity/teacher.model';
import { TeacherResolver } from './teacher.resolver';
import { TeacherService } from './teacher.services';

@Module({
    imports: [MongooseModule.forFeature([{name: Teacher.name, schema: TeacherSchema}]),
    StudentModule
],
    providers: [TeacherService,TeacherResolver],
    exports: [TeacherService]
})

export class TeacherModule {}