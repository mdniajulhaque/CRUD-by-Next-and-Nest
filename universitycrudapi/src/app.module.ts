import {  Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';

import { StudentModule } from './Student/student.modules';
import { TeacherModule } from './Teacher/teacher.module';
import { TeacherSchema } from './Teacher/Entity/teacher.model';
import { CommonModule } from './CommonModule/common.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL),
CommonModule,
 TeacherModule,
 StudentModule
],

})
export class AppModule {}
