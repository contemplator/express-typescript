export const  Heroes = [
    {id: 1, name: 'Leo', level: 1, skills: ['預測未來']},
    {id: 2, name: 'Mylio', level: 1, skills: ['透視', '飛行']},
    {id: 3, name: 'May', level: 1, skills: ['把水變熱', '高壓水柱']},
    {id: 4, name: 'Ken', level: 1, skills: ['飛葉快刀', '寄生']},
    {id: 5, name: 'Brown', level: 1, skills: ['復活']}
];

export class Hero {
    id: number;
    name: string;
    level: number;
    skills: string[];

    constructor(id: number, name: string, level: number, skills: string[]) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.skills = skills;
    }
}