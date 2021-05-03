export class Team {
    constructor(
       public id: number,
       public teamName: string,
       public photo?: string,
       public isWinner?: boolean | undefined

    ) {}
}