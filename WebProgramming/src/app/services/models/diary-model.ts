import {TagModel} from './tag-model';

export class DiaryModel {
  src: string;
  likes: number;
  content: string;
  username: string;
  tags: TagModel[];

  constructor(src: string, likes: number, content: string, username: string, tags: TagModel[]) {
    this.src = src;
    this.likes = likes;
    this.content = content;
    this.username = username;
    this.tags = tags;
  }
}
