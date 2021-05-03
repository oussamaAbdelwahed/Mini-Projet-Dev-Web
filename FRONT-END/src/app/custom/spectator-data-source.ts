import { SpectatorService } from 'src/app/services/spectator.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Spectator } from './../models/oussama/spectator';
import { catchError, finalize } from 'rxjs/operators';
export class SpectatorDataSource implements DataSource<Spectator> {

    constructor(private spectatorService: SpectatorService) {}

    private spectatorsSubject = new BehaviorSubject<Spectator[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public max=1000;

    public loading$ = this.loadingSubject.asObservable();

    connect(collectionViewer: CollectionViewer): Observable<Spectator[] | readonly Spectator[]> {
        return this.spectatorsSubject.asObservable();
    }

    loadSpectators(pageIndex: number,pageSize=2,gameId="",searchQuery="",fromSearch=false) {
        this.loadingSubject.next(true);

        this.spectatorService.getSpectatorsPage(pageIndex,pageSize,gameId,searchQuery)
        .pipe(
            catchError(() =>  of([])),
            finalize(() => {
                const  _this = this;
                setTimeout(function () {  _this.loadingSubject.next(false) }, 1000);
            })
        )
        .subscribe((data) => {
            if(Array.isArray(data) && data.length == 0 && !fromSearch) {
               this.max  = pageIndex + 2;
            }
            this.spectatorsSubject.next(data)
        });
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.spectatorsSubject.complete();
        this.loadingSubject.complete();
    }
}