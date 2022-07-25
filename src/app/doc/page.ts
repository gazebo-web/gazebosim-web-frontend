export class Page {
  public name: string = '';
  public title: string = '';
  public file: string = '';
  public description: string = '';
  public unlisted: boolean = false;
  public children?: Page[] = [];
  public link: string = '';
  public version: string = '';
}
