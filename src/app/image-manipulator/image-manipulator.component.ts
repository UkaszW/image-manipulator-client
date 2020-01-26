import {Component, OnInit} from '@angular/core';
import {ManipulatorService} from "../shared/image/manipulator.service";
import {ActivatedRoute} from "@angular/router";
import {DataService, Image} from "../shared/data.service";

@Component({
  selector: 'app-image-manipulator',
  templateUrl: './image-manipulator.component.html',
  styleUrls: ['./image-manipulator.component.css']
})
export class ImageManipulatorComponent implements OnInit {

  image: any;

  constructor(private manipulatorService: ManipulatorService, private route: ActivatedRoute, private dataService: DataService) {
  }

  ngOnInit() {
    this.fetchImageFromDataService()
  }

  fetchImageFromDataService() {
    this.dataService.get();
    let imageDB : Image = this.dataService.image;
    this.image='data:' + imageDB.type + ';base64,' + imageDB.content;
  }

}
