import { Field, InputType } from '@nestjs/graphql';
import { Prop  } from '@nestjs/mongoose';
@InputType()
export class CreatestudentInput {
  @Field(()=> String, {nullable: false})
  @Prop({type: String})
  username?: string;

 @Field(()=> Number, {nullable: true})
 @Prop({type: Number})
  age?: number;

@Field(()=> String, {nullable: true})
@Prop({type: String})
  @Field()
  address?: string;
}

@InputType()
export class studentid {
  @Field(()=> String, {nullable: false})
  @Prop({type: String})
  id?: string;
}

@InputType()
export class studentname{
  @Field(()=> String, {nullable: false})
  @Prop({type: String})
  username?: string;
}

@InputType()
export class UpdatestudentInput {
  @Field(()=> String, {nullable: false})
  @Prop({type: String})
  id?: string;
 @Field(()=> String, {nullable: false})
  @Prop({type: String})
  username?: string;

 @Field(()=> Number, {nullable: true})
 @Prop({type: Number})
  age?: number;

@Field(()=> String, {nullable: true})
@Prop({type: String})
  @Field()
  address?: string;
}

