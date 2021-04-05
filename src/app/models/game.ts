import { Stadium } from './stadium';
import { Team } from "./team";
import { Tour } from "./tour";

export class Game {
    constructor(
        public id: number,
        public homeTeam: Team,
        public awayTeam: Team,
        public tour: Tour,
        public statdium: Stadium,
        public date?: Date,
        public score?:  string,
    )
    {}
}