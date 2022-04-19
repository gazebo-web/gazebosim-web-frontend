export class Version {
  public major: number;
  public minor: number;
  public patch: number;
  public releaseDate: Date;

  constructor() {
    this.major = 0;
    this.minor = 0;
    this.patch = 0;
    this.releaseDate = new Date();
  }
}
