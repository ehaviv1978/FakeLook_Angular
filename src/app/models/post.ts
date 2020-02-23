import { picture } from './picture';

export interface Post{
    postId:number;
    description:string;
    picture:string
    lat:number;
    long:number;
    timePosted:Date;
    firstName:string;
    lastName:string;
    userPic:string;
}