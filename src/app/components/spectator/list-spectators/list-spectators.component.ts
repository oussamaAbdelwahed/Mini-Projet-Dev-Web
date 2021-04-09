import { Router } from '@angular/router';
import { GameService } from '../../../services/game.service';
import { SpectatorDataSource } from '../../../custom/spectator-data-source';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SpectatorService } from 'src/app/services/spectator.service';
import { Spectator } from 'src/app/models/spectator';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-list-spectators',
  templateUrl: './list-spectators.component.html',
  styleUrls: ['./list-spectators.component.css']
})
export class ListSpectatorsComponent implements OnInit,AfterViewInit {

  public dataSource!: SpectatorDataSource;
  public spectators : Spectator[]  = []; 
  public columns: string[] = ["firstname","lastname","email","cin","dateNaiss","sex","actions"];
  private gameId="";
  public pageSize=2;
  public filterValue=""

  public games: Game[]= [];


  //@ViewChild(MatSort,{static:true}) sort: MatSort | null = null;
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator ;
  @ViewChild('input') input!: ElementRef;

 
  constructor(
           public spectatorService: SpectatorService,
           private gameService: GameService,
           private router: Router
    ) { }
  onChooseGame(event: any) {
   this.gameId = event.target.value;
   this.dataSource.loadSpectators(this.paginator!.pageIndex,this.paginator!.pageSize,this.gameId,this.filterValue,true);

  }


  ngOnInit(): void {
    this.gameService.gamesSubject.subscribe((data:Game[])=>{
       this.games = data;
    },(error)=>{
      console.log(error)
    });

    this.gameService.getAllGames();
    this.dataSource = new SpectatorDataSource(this.spectatorService);

    this.dataSource.loadSpectators(0,this.pageSize,this.gameId);
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement,'keyup')
    .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
            this.filterValue =  this.input.nativeElement.value.trim().toLowerCase();
            this.paginator.pageIndex = 0;
            this.dataSource.loadSpectators(this.paginator!.pageIndex,this.paginator!.pageSize,this.gameId,this.filterValue,true);

        })
    )
    .subscribe();

    this.paginator?.page
        .pipe(
            tap(() => {
              this.dataSource.loadSpectators(this.paginator!.pageIndex,this.paginator!.pageSize,this.gameId,this.filterValue);
            })
        )
        .subscribe();
  }

  public applyFilter(event:any) {
    
  
     this.paginator.pageIndex = 0;
     this.dataSource.loadSpectators(this.paginator!.pageIndex,this.paginator!.pageSize,this.gameId,this.filterValue,true);
     //this.loadLessonsPage();
     //here must seek to to first page and show filtering results
     //this.dataSource.filter = 
  }


  public onEdit(spectatorId:number) {
    const spect  = this.spectators.find(spec => spec!.id == spectatorId);
    this.router.navigate(["spectator/edit",spectatorId], { state: { spectator: spect} });
   
  }

  public onDelete(spectatorId:number) {
    console.log(spectatorId);
  }

  public onMoreInfo(spectatorId:number) {
     //besoin de cette methode pour passer l obj spectator en snaphsot.data
    console.log(spectatorId)
  }

}
