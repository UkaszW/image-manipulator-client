import { Component, OnInit } from '@angular/core';
import {DataService} from "../shared/data.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'image-manipulator-client';

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

}
