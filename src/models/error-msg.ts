export class ServerRes {
  data: any;
  errorcode: number;
  errormsg: string;

  constructor(data: any, errorcode?: number, errormsg?: string) {
    this.data = data;
    this.errorcode = errorcode || 0;
    this.errormsg = errormsg || '';
  }
}