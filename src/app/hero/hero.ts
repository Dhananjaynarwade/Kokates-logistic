import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild
} from '@angular/core';
import { Navbar } from "../navbar/navbar";


@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [Navbar],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero implements AfterViewInit {

  @ViewChild('heroScroll')
  heroScroll!: ElementRef<HTMLElement>;


  @ViewChild('ship')
  ship!: ElementRef<HTMLElement>;


  /*
    Ship width on desktop = 500px.

    -250 means exactly HALF of ship
    starts outside the left screen.
  */
  shipPosition = -250;


  ngAfterViewInit(): void {

    requestAnimationFrame(() => {
      this.updateShip();
    });

  }


  @HostListener('window:scroll')
  onScroll(): void {

    this.updateShip();

  }


  @HostListener('window:resize')
  onResize(): void {

    this.updateShip();

  }


  private updateShip(): void {

    if (!this.heroScroll || !this.ship) {
      return;
    }


    const wrapper =
      this.heroScroll.nativeElement;


    const ship =
      this.ship.nativeElement;


    const rect =
      wrapper.getBoundingClientRect();


    /*
      Total amount user can scroll
      while hero remains sticky.
    */
    const totalDistance =
      wrapper.offsetHeight -
      window.innerHeight;


    if (totalDistance <= 0) {
      return;
    }


    /*
      How much we have scrolled
      inside the hero-scroll wrapper.
    */
    const scrolled =
      Math.max(
        0,
        -rect.top
      );


    let progress =
      scrolled /
      totalDistance;


    /*
      Force progress:
      0 = beginning
      1 = end
    */
    progress =
      Math.max(
        0,
        Math.min(progress, 1)
      );


    /*
      Boat reaches the right edge
      at 90% of sticky scrolling.

      This is important:

      user scrolls
      ↓
      screen stays fixed
      ↓
      boat crosses
      ↓
      boat reaches right
      ↓
      small extra scroll
      ↓
      next section starts
    */
    const boatMovementEnd = 0.95


    let boatProgress =
      progress /
      boatMovementEnd;


    boatProgress =
      Math.max(
        0,
        Math.min(boatProgress, 1)
      );


    /*
      Get REAL ship width.

      Desktop = 500px
      Mobile = 340px
    */
    const shipWidth =
      ship.offsetWidth;


    /*
      START:
      Half of ship visible.
    */
    const startX =
      -(shipWidth / 2);


    /*
      END:
      Boat's front touches
      exactly the right edge.
    */
    const endX =
      window.innerWidth -
      shipWidth -
      30;


    /*
      Move ONLY horizontally.
    */
    this.shipPosition =
      startX +
      ((endX - startX) * boatProgress);

  }

}