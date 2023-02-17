import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { Meta, SafeUrl, Title } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SwiperModule } from 'swiper/angular';

import SwiperCore, {FreeMode, Navigation, Thumbs, SwiperOptions} from 'swiper';
SwiperCore.use([FreeMode, Navigation, Thumbs]);

/**
 * The Showcase Component encapsulates Swiper.
 * Receives the gallery images as an input.
 */
@Component({
  selector: 'gz-showcase',
  standalone: true,
  templateUrl: 'showcase.component.html',
  styleUrls: ['showcase.component.scss', './swiper.scss'],
  imports: [
    CommonModule,
    FlexLayoutModule,
    SwiperModule,
    MatCardModule,
  ],
  encapsulation: ViewEncapsulation.None
})

export class ShowcaseComponent implements OnInit {

  /**
   * A reference to the thumbnail slider, to be used by the main slider.
   * It is changed by events in the thumbnail slider.
   */
  public thumbsSwiper: SwiperCore;

  /**
   * Configuration of the main slider.
   */
  public mainConfig: SwiperOptions = {
    spaceBetween: 0,
    navigation: true,
  };

  /**
   * Configuration of the thumbnails slider.
   */
  public thumbsConfig: SwiperOptions = {
    spaceBetween: 10,
    freeMode: true,
  };

  /**
   * The images to be displayed in the gallery.
   */
  public galleryImages: SafeUrl[] = [
    'assets/images/gallery/gallery_0.png',
    'assets/images/gallery/gallery_1.png',
    'assets/images/gallery/gallery_2.png',
    'assets/images/gallery/gallery_3.png',
    'assets/images/gallery/gallery_4.png',
    'assets/images/gallery/gallery_5.png',
    'assets/images/gallery/gallery_6.png',
  ];

  constructor(private titleService: Title, private meta: Meta) {
  }

  public ngOnInit(): void {
    this.titleService.setTitle('Showcase -- Gazebo');
    this.meta.updateTag({name: 'title', content: 'Showcase -- Gazebo'});
    this.meta.updateTag({name: 'description',
      content: 'Gazebo highlights and media'});

   this.thumbsConfig.slidesPerView = this.galleryImages.length;
  }
}
