export class Hero {
  id: number;
  name: string;
  skills: string[];

  constructor(id?: number, name?: string, skills?: string[]){
    this.id = id || 0 ;
    this.name = name || '' ;
    this.skills = skills || [] ;
  }
}
