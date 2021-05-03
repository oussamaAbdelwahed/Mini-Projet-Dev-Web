import { Team } from "./team";

export class Player {
    id : number ;
    lastname : string;
    firstname:string;
    sex:string;
    cin : number;
    dateNaiss : Date;
    position : string;
    number : number;
    teamOfPlayer : Team
}