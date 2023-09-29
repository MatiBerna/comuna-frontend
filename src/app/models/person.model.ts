// export interface Person {
//   id: string;
//   dni: string;
//   firstName: string;
//   lastName: string;
//   phone: string | undefined;
//   email: string;
//   birthdate: Date;
// }

export class Person {
  constructor(
    public id: string,
    public dni: string,
    public firstName: string,
    public lastName: string,
    public phone: string | undefined,
    public email: string,
    public birthdate: Date
  ) {}
}
