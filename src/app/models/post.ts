import { PostLikes } from './postLikes';
export class Post{
    postId:number;
    description:string;
    picture:string;
    lat:number;
    long:number;
    timePosted:Date;
    firstName:string;
    lastName:string;
    userPic:string;
    postLikes:PostLikes;
    userId: number;
    postTags:[];
    
    postLikeAmount:number;
    liked:boolean;
}

export class PostOutput{
    userId:number;
    description:string;
    picture:string;
    latGPS:number;
    longGPS:number;
}