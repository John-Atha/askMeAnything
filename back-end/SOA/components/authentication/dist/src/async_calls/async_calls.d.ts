import { CreateUserDto } from "../user/dto/create-user.dto";
import { UpdateUserDto } from "../user/dto/update-user.dto";
export declare const getAllUsers: () => any;
export declare const getOneUser: (params: any) => any;
export declare const getOneUserWithPass: (params: any) => any;
export declare const updateUser: (id: number, updateUserDto: UpdateUserDto) => any;
export declare const deleteUser: (id: number) => any;
export declare const createUser: (createUserDto: CreateUserDto) => any;
