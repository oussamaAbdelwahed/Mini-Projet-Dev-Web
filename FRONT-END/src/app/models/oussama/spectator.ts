import { UserModel } from 'src/app/models/oussama/user';
export class Spectator extends UserModel {
    public setBirthDate(bd: Date | undefined) {
       this.dateNaiss = bd;
    }
}