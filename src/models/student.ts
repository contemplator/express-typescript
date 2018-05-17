import { GenderType } from "./enum";

export class Student {
  id: number;
  name: string;
  birthday: string;
  gender: GenderType;

  constructor(){
    this.id = 0;
    this.name = '';
    this.birthday = '';
    this.gender = 0;
  }
}