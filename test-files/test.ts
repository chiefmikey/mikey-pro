class TestClass {
  private value: number;

  constructor(value: number) {
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }
}

const testInstance = new TestClass(42);
console.log(testInstance.getValue());
