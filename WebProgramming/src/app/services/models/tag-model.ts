export class TagModel {
  constructor(content: string, hot: number, amount: number) {
    this.content = content;
    this.hot = hot;
    this.amount = amount;
}

content: string;
hot: number;
amount: number;
}
