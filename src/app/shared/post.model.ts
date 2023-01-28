export class Post {
  username: string;
  id: number;
  userId: number;
  timestamp : string;
  comment : string;

  constructor() {
    this.username='';
    this.id=0;
    this.userId=0;
    this.timestamp= new Date().toLocaleString();
    this.comment='';
  }
}
