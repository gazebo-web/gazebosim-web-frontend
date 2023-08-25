import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/**
 * NotFound Component contains the landing page.
 */
export class NotFoundComponent implements OnInit {
  constructor(private titleService: Title, private meta: Meta) {
  }

  public ngOnInit(): void {
    this.titleService.setTitle('Page Not Found');
    this.meta.updateTag({name: 'title', content: 'Page Not Found'});
    this.meta.updateTag({name: 'description',
      content: 'The page is not found.'});
  }
}
