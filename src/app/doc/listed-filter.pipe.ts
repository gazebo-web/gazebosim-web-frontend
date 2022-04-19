import { Page } from './page';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gzListedFilter'
})

/**
 * Filter that returns only pages that aren't set as unlisted.
 */
export class ListedFilterPipe implements PipeTransform {
  public transform(items: Page[], filter: Page): Page[] {
    if (!items || !filter) {
      return items;
    }
    return items.filter((item: Page) => !item.unlisted);
  }
}
