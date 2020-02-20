import { picture } from './picture';

export interface User{
    userId:number;
    firstName:string;
    lastName:string;
    password:string;
    birthDate:Date;
    address:string;
    job:string;
    datejoined:Date;
    picture:any;
}