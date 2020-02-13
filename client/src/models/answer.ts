export class Answer {
  public display_value: string;
  public accepted_values: string[];
  public guessed: boolean;

  constructor(display_value: string, accepted_values: string[]) {
    this.display_value = display_value;
    this.accepted_values = accepted_values;
    this.guessed = false;
  }

  public checkAnswer(text: string): boolean {
    for (let i = 0; i < this.accepted_values.length; i++) {
      if (this.accepted_values[i] === text) {
        this.guessed = true;
        return true
      }
    }
    return false;
  }
}