import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  show = false;

  constructor() { }

  ngOnInit() {
  }

  toggleCollapse() {
    this.show = !this.show;
  }

}
