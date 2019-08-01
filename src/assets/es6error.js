import ExtendableError from "es6-error";

class MyError extends ExtendableError {
  // constructor is optional; you should omit it if you just want a custom error
  // type for inheritance and type checking
  constructor(message = "Default message") {
    super(message);
  }
}

export default MyError;
