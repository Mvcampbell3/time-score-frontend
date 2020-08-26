import { Answer } from './answer';

export interface Game {
  title: string;
  input_placeholder: string;
  description: string;
  instructions: string;
  answers: Answer[];
  plays: number,
  total_score: number,
  username: string,
  id?: string;
  highscores?: any;
}

// export class Game {
//   public name: string;
//   public inputPlaceholder: string;
//   public description: string;
//   public instructions: string;
//   public answers: Answer[];

//   constructor(name: string, inputPlaceholder: string, description: string, instructions: string, answers: Answer[]) {
//     this.name = name;
//     this.inputPlaceholder = inputPlaceholder;
//     this.description = description;
//     this.instructions = instructions;
//     this.answers = answers;
//   }
// }


