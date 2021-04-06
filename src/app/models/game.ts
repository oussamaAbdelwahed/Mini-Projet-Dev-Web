import { Stadium } from './stadium';
import { Team } from "./team";
import { Tour } from "./tour";

export class Game {
    constructor(
        public id: number,
        public homeTeam: Team | undefined,
        public awayTeam: Team | undefined,
        public tour: Tour | undefined,
        public stadium: Stadium,
        public date?: Date,
        public score?:  string,
    )
    {}
}