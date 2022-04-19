import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'gzSafeHtml', pure: false })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  public transform(content) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
