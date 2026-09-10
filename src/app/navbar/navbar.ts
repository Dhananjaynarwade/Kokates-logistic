import { Component, HostListener } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  navMoveX = 0;

  @HostListener('window:scroll')
  onScroll(): void {

    const scroll = window.scrollY;

    // move only horizontally to the LEFT
    this.navMoveX =
      -Math.min(scroll * 0.20, 700);
  }
}