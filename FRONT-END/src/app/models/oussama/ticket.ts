import { Game } from './game';
import { UserModel } from './user';
export class Ticket {
    constructor(
        public type: string,
        public game: Game,
        public price?: number | undefined,
        public spectator?: UserModel  |undefined,
        
        public nbrBuyedTickets?: number,
        public reference?: number  ,
    ) {}
}