import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team';
import { Player } from '../models/player'
import { Staff } from '../models/staff';
import { Stadium } from '../models/stadium';
import { Referee } from '../models/referee';
import { Spectator } from '../models/spectator';
import { Tour } from '../models/tour';
import { Game } from '../models/game';
import { AppGlobals } from './../globals/app-globals';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient,private globals: AppGlobals) { }

  //Http Requests for Team Management
  public getAllTeams():Observable<Team[]> {
    return this.http.get<[Team]>(this.globals.ApiBaseUrl+'/admin/teams');
  }
  public getTeamByWinner(bool: boolean):Observable<Team[]> {
    return this.http.get<[Team]>(this.globals.ApiBaseUrl+`/admin/teamsByState/${bool}`);
  }
  public createTeam(team:Team):Observable<Team> {
      return this.http.post<Team>(this.globals.ApiBaseUrl+'/admin/teams/add',team);
    }
  
  public updateTeam(teamId: number , team: Team):Observable<Team> {
    return this.http.put<Team>(this.globals.ApiBaseUrl+`/admin/teams/update/${teamId}`,team);
  }
  public deleteTeam(teamId : number):Observable<void> {
    return this.http.delete<void>(this.globals.ApiBaseUrl+`/admin/teams/delete/${teamId}`);
  }

  //Http Requests for Player Management
  public getAllPlayers():Observable<Player[]> {
    return this.http.get<[Player]>(this.globals.ApiBaseUrl+'/admin/players');
  }
  public createPlayer(player:Player):Observable<Player> {
   return  this.http.post<Player>(this.globals.ApiBaseUrl+'/admin/players/add',player);
  }
  public updatePlayer(playerId : number , player :Player):Observable<Player> {
    return this.http.put<Player>(this.globals.ApiBaseUrl+`/admin/players/update/${playerId}`,player);
  }
  public updatePlayerTeam(playerId : number , player :Player):Observable<Player> {
    return this.http.put<Player>(this.globals.ApiBaseUrl+`/admin/players/updateTeam/${playerId}`,player);
  }
  public deletePlayer(playerId:number):Observable<void> {
    return this.http.delete<void>(this.globals.ApiBaseUrl+`/admin/players/delete/${playerId}`);
  }

  //HTTP Requests for Staff Management
  public getAllStaffMembers():Observable<Staff[]> {
    return this.http.get<[Staff]>(this.globals.ApiBaseUrl+'/admin/staffs');
  }
  public createStaffMember(staff:Staff):Observable<Staff> {
   return  this.http.post<Staff>(this.globals.ApiBaseUrl+'/admin/staffs/add',staff);
  }
  public updateStaffMember(staffId : number , staff :Staff):Observable<Staff> {
    return this.http.put<Staff>(this.globals.ApiBaseUrl+`/admin/staffs/update/${staffId}`,staff);
  }
  public updateStaffMemberTeam(staffId : number , staff :Staff):Observable<Staff> {
    return this.http.put<Staff>(this.globals.ApiBaseUrl+`/admin/staffs/updateTeam/${staffId}`,staff);
  }
  public deleteStaffMember(staffId:number):Observable<void> {
    return this.http.delete<void>(this.globals.ApiBaseUrl+`/admin/staffs/delete/${staffId}`);
  }

  //HTTP Requests for Stadium Management
  public getAllStadiums():Observable<Stadium[]> {
    return this.http.get<[Stadium]>(this.globals.ApiBaseUrl+'/admin/stadiums');
  }
  public createStadium(stadium:Stadium):Observable<Stadium> {
   return  this.http.post<Stadium>(this.globals.ApiBaseUrl+'/admin/stadiums/add',stadium);
  }
  public updateStadium(stadiumId : number , stadium :Stadium):Observable<Stadium> {
    return this.http.put<Stadium>(this.globals.ApiBaseUrl+`/admin/stadiums/update/${stadiumId}`,stadium);
  }
  public deleteStadium(stadiumId:number):Observable<void> {
    return this.http.delete<void>(this.globals.ApiBaseUrl+`/admin/stadiums/delete/${stadiumId}`);
  }

  //HTTP Requests for Referee Management
  public getAllReferees():Observable<Referee[]> {
    return this.http.get<[Referee]>(this.globals.ApiBaseUrl+'/admin/referees');
  }
  public getRefereesByType(type:string):Observable<Referee[]> {
    return this.http.get<[Referee]>(this.globals.ApiBaseUrl+`/admin/refereesByType/${type}`);
  }
  public createReferee(referee:Referee):Observable<Referee> {
   return  this.http.post<Referee>(this.globals.ApiBaseUrl+'/admin/referees/add',referee);
  }
  public updateReferee(refereeId : number , referee :Referee):Observable<Referee> {
    return this.http.put<Referee>(this.globals.ApiBaseUrl+`/admin/referees/update/${refereeId}`,referee);
  }
  public deleteReferee(refereeId:number):Observable<void> {
    return this.http.delete<void>(this.globals.ApiBaseUrl+`/admin/referees/delete/${refereeId}`);
  }
  //HTTP Requests for Spectator Management
  public getAllSpectators():Observable<Spectator[]> {
    return this.http.get<[Spectator]>(this.globals.ApiBaseUrl+'/admin/spectators');
  }
  public createSpectator(spectator:Spectator):Observable<Spectator> {
   return  this.http.post<Spectator>(this.globals.ApiBaseUrl+'/admin/spectators/add',spectator);
  }
  public updateSpectator(spectatorId : number , spectator :Spectator):Observable<Spectator> {
    return this.http.put<Spectator>(this.globals.ApiBaseUrl+`/admin/spectators/update/${spectatorId}`,spectator);
  }
  public deleteSpectator(spectatorId:number):Observable<void> {
    return this.http.delete<void>(this.globals.ApiBaseUrl+`/admin/spectators/delete/${spectatorId}`);
  }

  //HTTP Requests for Tour brief Managements
  public getAllTours():Observable<Tour[]> {
    return this.http.get<[Tour]>(this.globals.ApiBaseUrl+'/admin/tours');
  }
  public getTourById(tourId:number):Observable<Tour> {
    return this.http.get<Tour>(this.globals.ApiBaseUrl+`/admin/tours/${tourId}`);
  }
  public createTour(tour:Tour):Observable<Tour> {
   return  this.http.post<Tour>(this.globals.ApiBaseUrl+'/admin/tours/add',tour);
  }
  public updateTour(tourId : number , tour :Tour):Observable<Tour> {
    return this.http.put<Tour>(this.globals.ApiBaseUrl+`/admin/tours/update/${tourId}`,tour);
  }
  public deleteTour(tourId:number):Observable<void> {
    return this.http.delete<void>(this.globals.ApiBaseUrl+`/admin/tours/delete/${tourId}`);
  }

  //Request for games management 
  public getGamesForTour(tourId:number):Observable<Game[]> {
    return this.http.get<[Game]>(this.globals.ApiBaseUrl+`/admin/games/${tourId}`);
  }
  public createGameWithEmbededTour(game:Game):Observable<Game> {
    return this.http.post<Game>(this.globals.ApiBaseUrl+'/admin/games/add',game);
  }
  public deleteGame(gameId:number):Observable<void> {
    return this.http.delete<void>(this.globals.ApiBaseUrl+`/admin/games/delete/${gameId}`);
  }
  public updateGame(gameId:number,game:Game):Observable<Game> {
    return this.http.put<Game>(this.globals.ApiBaseUrl+`/admin/games/update/${gameId}`,game);
  }

}
