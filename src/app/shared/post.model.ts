export class Post {
  id?: string;
  userId: string;
  timestamp : Date;
  comment : string;

  constructor() {
    this.id='';
    this.userId='';
    this.timestamp=new Date();
    this.comment='';
  }
}
