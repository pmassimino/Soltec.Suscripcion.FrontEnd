export interface ErrorItem {
    key: string;
    message: string;
  }
  
  class BackEndError extends Error {
    constructor(message: string, public errors: ErrorItem[]) {
      super(message);
      this.name = 'BackEndError';
      Object.setPrototypeOf(this, BackEndError.prototype);
    }
  }
  
  export default BackEndError;
  