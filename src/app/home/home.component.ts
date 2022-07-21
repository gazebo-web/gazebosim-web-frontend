import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'gz-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})

/**
 * Home Component contains the landing page.
 */
export class HomeComponent implements OnInit {


  constructor(private titleService: Title,
              private meta: Meta) {
  }

  public ngOnInit(): void {
    this.titleService.setTitle('Gazebo');
    this.meta.updateTag({name: 'title', content: 'Gazebo'});
    this.meta.updateTag({name: 'description',
      content: 'A robotics design, development, and simulation suite.'});
  }
}
