export class Answer {
  public display_value: string;
  public accepted_values: string[];
  public guessed: boolean;

  constructor(display_value: string, accepted_values: string[]) {
    this.display_value = display_value;
    this.accepted_values = accepted_values;
    this.guessed = false;
  }
}