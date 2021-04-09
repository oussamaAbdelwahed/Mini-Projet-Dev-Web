import { UserModel } from 'src/app/models/user';
export class Spectator extends UserModel {
    public setBirthDate(bd: Date | undefined) {
       this.dateNaiss = bd;
    }
}