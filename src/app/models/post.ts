
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
}

export class PostOutput{
    userId:number;
    description:string;
    picture:string;
    latGPS:number;
    longGPS:number;
}