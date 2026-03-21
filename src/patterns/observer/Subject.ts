export class Subject {
  private observers: any[] = [];

  subscribe(obs: any) {
    this.observers.push(obs);
  }

  notify(data: any) {
    this.observers.forEach(o => o.update(data));
  }
}