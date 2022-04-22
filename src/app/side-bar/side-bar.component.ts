import { SideBarService } from './side-bar.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  constructor(public SideBarService:SideBarService) { }

  ngOnInit(): void {
  }

}
