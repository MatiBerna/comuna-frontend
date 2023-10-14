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
    public _id: string | null,
    public dni: string | null,
    public firstName: string | null,
    public lastName: string | null,
    public phone: string | undefined | null,
    public email: string | null,
    public birthdate: Date | null
  ) {}
}
