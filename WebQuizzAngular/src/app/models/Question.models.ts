export class Question {
    id!: number;
    titre!: string;
    reponse!: string;
    points!: number;
    passed: boolean = false;
}