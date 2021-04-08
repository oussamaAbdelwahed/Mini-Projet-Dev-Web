import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { SpectatorService } from 'src/app/services/spectator.service';
import { Spectator } from 'src/app/models/spectator';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-list-spectators',
  templateUrl: './list-spectators.component.html',
  styleUrls: ['./list-spectators.component.css']
})
export class ListSpectatorsComponent implements OnInit,AfterViewInit {

  public dataSource!: MatTableDataSource<Spectator>;
  public spectators : Spectator[]  = []; 
  public columns: string[] = ["firstname","lastname","email","cin","dateNaiss","sex","actions"];
  private currentBESpectPageIndex = 0;
  private initLoad = true;

  @ViewChild(MatSort,{static:true}) sort: MatSort | null = null;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator | null = null;

 
  constructor(public spectatorService: SpectatorService) { 
    
  }

  public c1(event: any) {
    console.log(event);
  }

  public c2(event: any) {
    console.log(event);
  }

  ngOnInit(): void {
    this.spectatorService.spectatorSubject.subscribe((data: Spectator[])=> {
      if(Array.isArray(data)) {
        this.spectators = data;
        this.spectators.push(new Spectator("","",""));
        if(this.initLoad) {
          this.dataSource = new MatTableDataSource(this.spectators);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }else {
          this.dataSource = new MatTableDataSource(this.spectators);
        }
        this.spectators.pop();
      }
    },(error)=>{
         console.log(error);
    });

    this.spectatorService.getSpectatorsPage(0);
  }

  ngAfterViewInit() {
    this.paginator?.page
        .pipe(
            tap(() => {
              //here a test
              if(this.paginator!.pageIndex > 0){
                this.initLoad = false;
              }
              this.spectatorService.getSpectatorsPage(this.paginator!.pageIndex);
            })
        )
        .subscribe();
  }

  public applyFilter(event:any) {
     const filterValue = event.target.value;
     this.dataSource.filter = filterValue.trim().toLowerCase()
  }

}
