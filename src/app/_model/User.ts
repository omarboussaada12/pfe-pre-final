import { Role } from "./Role";

export class User {
    id?: number;

    username?:String;

    Firstname?:String;

	lastname?:String;

    phone?:String;

	address?:String;

    email?:String;

    password?:String;

    roles!:[Role]
  }