export class UserModel {
    constructor(
                  public firstname: string | undefined,
                  public lastname: string,
                  public email: string,
                  public role?: string,
                  public id?: number,
                  public cin?:number,
                  public dateNaiss?: Date,
                  public sex?: string,
                  public password?: string
    ) {}
}
