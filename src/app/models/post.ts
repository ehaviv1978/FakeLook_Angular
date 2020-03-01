import { PostLikes } from './postLikes';
export class Post{
    postId:number;
    description:string;
    picture:any;
    lat:number;
    long:number;
    timePosted:Date;
    firstName:string;
    lastName:string;
    userPic:string;
    postLikeAmount:number;
    liked:boolean;
}