/// <reference lib="webworker" />

import { Notification } from './notification.model';

addEventListener('message', ({ data }) => {
  queue.enqueue(data);
});

setInterval(() => {
  const notification = queue.dequeue();

  if (notification) {
    postMessage(notification);
  }
}, 5300);

class Queue {
  first: ListNode | null;
  last: ListNode | null;
  length: number;
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  enqueue(val: Notification) {
    const newNode = new ListNode(val);
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last!.next = newNode;
      this.last = newNode;
    }
    this.length++;
    return true;
  }
  dequeue() {
    if (!this.first) return null;

    const temp = this.first;
    if (this.length === 1) {
      this.last = null;
    }

    this.first = this.first.next;
    this.length--;
    return temp.val;
  }
}

class ListNode {
  val: Notification;
  next: ListNode | null;

  constructor(val: Notification) {
    this.val = val;
    this.next = null;
  }
}

const queue = new Queue();
