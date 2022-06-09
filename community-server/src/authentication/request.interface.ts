import { Request } from "express";

export interface RequestWithUser extends Request{
    user:UserRequest

}
class UserRequest{
    name:string;
    email:string;
    iat:string;
    exp:string;
}