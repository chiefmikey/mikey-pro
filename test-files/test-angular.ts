import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-component',
  template: `
    <div class="test-component">
      <h1>{{ title }}</h1>
      <p>{{ message }}</p>
      <button (click)="increment()">Count: {{ count }}</button>
    </div>
  `,
  styles: [
    `
      .test-component {
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
      }

      h1 {
        color: #333;
        margin-bottom: 10px;
      }

      button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
      }

      button:hover {
        background-color: #0056b3;
      }
    `,
  ],
})
export class TestComponent implements OnInit {
  @Input() title: string = 'Default Title';
  @Input() message: string = 'Hello World';
  @Output() countChanged = new EventEmitter<number>();

  count: number = 0;

  ngOnInit(): void {
    console.log('Component initialized');
  }

  increment(): void {
    this.count++;
    this.countChanged.emit(this.count);
  }
}
