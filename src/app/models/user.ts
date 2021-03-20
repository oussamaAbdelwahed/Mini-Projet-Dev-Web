export class UserModel {
    constructor(
                  public firstName: string | undefined,
                  public lastName: string,
                  public email: string,
                  public role?: string,
                  public id?: number
    ) {}
}
