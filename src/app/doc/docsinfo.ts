import { Page } from './page';
import { Version } from './version';

export class DocsInfo {
  public versions: Version[] = [];
  public pages: Map<string, Page[]> = new Map<string, Page[]>();
}
