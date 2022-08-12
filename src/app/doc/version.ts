export class Version {
  public name: string = '';
  public lts: boolean = false;
  public eol: boolean = false;
  public description: string = ''; 
  public libraries: LibraryVersion[] = [];
}

export class LibraryVersion {
  public name: string = '';
  public version: number = 0;
}
