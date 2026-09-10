import { Component, HostListener } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Hero } from '../hero/hero';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero,Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  shipPosition = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {

    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    this.shipPosition = scrollTop * 0.8;
  }
}