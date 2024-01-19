import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.interface';
import { Model } from 'mongoose';
@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll() : Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findOneById(id: string): Promise<User> {
   
    return( this.userModel.findOne({_id : id}).exec());
  }
  async findOne(email: string): Promise<User> {
   
    return( this.userModel.findOne({email : email}).exec());
  }

  async updateToken(email : string, dataUpdate : object) {
    return await this.userModel.findOneAndUpdate({ email : email }, dataUpdate).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findOneAndUpdate({_id : id},updateUserDto).exec();
  }

  remove(id: string) {
    
    return this.userModel.deleteOne({_id : id});
  
  }
}
