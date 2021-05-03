import { Referee } from "./referee";
import { Stadium } from "./stadium";
import { Team } from "./team";
import { Tour } from "./tour";

export class Game {
    id : number ;
    date : Date;
    score :string ;
    homeTeam : Team;
    awayTeam : Team;
    tour : Tour
    stadium : Stadium;
    referee :Referee;
    asistantReferee1 : Referee;
    asistantReferee2 : Referee;
    fourthOfficiel : Referee;

}