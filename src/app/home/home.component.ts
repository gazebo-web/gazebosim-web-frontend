import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NgxGalleryOptions,
         NgxGalleryImage,
         NgxGalleryImageSize } from 'ngx-gallery';

@Component({
  selector: 'gz-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})

/**
 * Home Component contains the landing page.
 */
export class HomeComponent implements OnInit {

  /**
   * The gallery options. Determines the behavior of the gallery component.
   *
   * See https://github.com/lukasz-galka/ngx-gallery#ngxgalleryoptions for more details.
   */
  public galleryOptions: NgxGalleryOptions[];

  /**
   * The images to be displayed in the gallery.
   *
   * See https://github.com/lukasz-galka/ngx-gallery#ngxgalleryimage for more details.
   */
  public galleryImages: NgxGalleryImage[];

  constructor(private titleService: Title,
              private meta: Meta) {
  }

  public ngOnInit(): void {
    this.titleService.setTitle('Gazebo');
    this.meta.updateTag({name: 'title', content: 'Gazebo'});
    this.meta.updateTag({name: 'description',
      content: 'A robotics design, development, and simulation suite.'});

    this.galleryOptions = [{
      imageSize: NgxGalleryImageSize.Contain,
      thumbnailSize: NgxGalleryImageSize.Contain,
      width: '100%',
      height: '100%',
      thumbnailsColumns: 5,
      imageArrowsAutoHide: true,
      thumbnailsArrowsAutoHide: true,
      thumbnailsPercent: 15,
      arrowPrevIcon: 'gallery-ic_chevron_left circle-icon',
      arrowNextIcon: 'gallery-ic_chevron_right circle-icon',
      preview: false,
      imageAutoPlay: true,
      imageAutoPlayInterval: 3000
    }];

    this.galleryImages = [
      {
        medium: 'assets/images/gallery_0.png',
        small: 'assets/images/gallery_0.png',
      },
      {
        medium: 'assets/images/gallery_1.png',
        small: 'assets/images/gallery_1.png',
      },
      {
        medium: 'assets/images/gallery_2.png',
        small: 'assets/images/gallery_2.png',
      },
      {
        medium: 'assets/images/gallery_3.png',
        small: 'assets/images/gallery_3.png',
      },
      {
        medium: 'assets/images/gallery_4.png',
        small: 'assets/images/gallery_4.png',
      },
      {
        medium: 'assets/images/gallery_5.png',
        small: 'assets/images/gallery_5.png',
      },
      {
        medium: 'assets/images/gallery_6.png',
        small: 'assets/images/gallery_6.png',
      },
    ];
  }
}
