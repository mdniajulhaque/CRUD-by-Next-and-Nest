import { Field, InputType } from '@nestjs/graphql';
import { Prop  } from '@nestjs/mongoose';
@InputType()
export class CreateteacherInput {
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
export class teacherid {
  @Field(()=> String, {nullable: false})
  @Prop({type: String})
  id?: string;
}

@InputType()
export class UpdateteacherInput {
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

