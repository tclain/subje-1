/* base class for linked */
export class Linked<Payload = any> {
  public value: Payload;
  public next: Linked<Payload> = null;
  public previous: Linked<Payload> = null;

  constructor(
    value: Payload,
    previous: Linked<Payload> = null,
    next: Linked<Payload> = null
  ) {
    this.previous = previous;
    this.next = next;
    this.value = value;
  }

  replace = ({ value, next, previous }: Linked) => {
    if (value) this.value = value;
    if (next) this.next = next;
    if (previous) this.previous = previous;
  };
  link = (node: Linked<Payload>) => {
    node.previous = this;
    this.next = node;
  };
  isSingle = () => {
    return this.isHead() && this.isTail();
  };
  isHead = () => {
    return this.previous === null;
  };
  isTail = () => {
    return this.next === undefined || this.next === null;
  };
}
