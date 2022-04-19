import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { markParentViewsForCheckProjectedViews } from '@angular/core/src/view/util';

@Component({
  selector: 'gz-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.scss']
})

export class AboutComponent implements OnInit {

  constructor(private titleService: Title, private meta: Meta) {
  }

  public ngOnInit(): void {
    this.titleService.setTitle('About -- Gazebo');
    this.meta.updateTag({name: 'title', content: 'About -- Gazebo'});
    this.meta.updateTag({name: 'description',
      content: 'What is Gazebo and its history.'});
  }
}
