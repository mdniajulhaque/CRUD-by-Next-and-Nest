import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';

export type StudentDocument = Student & Document
@ObjectType()
@Schema()
export class Student {
  @Field(()=> String, {nullable: false})
  _id?: string;
  @Field(()=> String, {nullable: false})
  @Prop({type: String})
  username?: string;

  @Field(()=> Number, {nullable: true})
  @Prop({type: Number})
  age?: number;

  @Field(()=> String, {nullable: true})
  @Prop({type: String})
  address?: string;
}


export const StudentSchema = SchemaFactory.createForClass(Student)