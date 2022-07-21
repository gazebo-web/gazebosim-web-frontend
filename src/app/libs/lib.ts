import { Version } from './version';

export class Library {
  public name: string = '';
  public versions: Version[] = [];
  public repo: string = '';
  public reporaw: string = '';
  public api: string = '';
  public description: string = '';
  public released: boolean = true;

  constructor() {
    this.name = 'Unknown';
    this.versions = [{major: 0, minor: 0, patch: 0, releaseDate: new Date()}];
    this.repo = '';
    this.reporaw = 'Unknown';
    this.api = '';
    this.description = 'Unknown';
  }
}
