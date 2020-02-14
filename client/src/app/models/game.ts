import { Answer } from './answer';

export class Game {
  public name: string;
  public description: string;
  public instructions: string;
  public answers: Answer[];

  constructor(name: string, description: string, instructions: string, answers: Answer[]) {
    this.name = name;
    this.description = description;
    this.instructions = instructions;
    this.answers = answers;
  }
}