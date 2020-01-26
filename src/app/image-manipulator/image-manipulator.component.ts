import {Component, OnInit} from '@angular/core';
import {ManipulatorService} from "../shared/image/manipulator.service";
import {ActivatedRoute} from "@angular/router";
import {DataService, Image} from "../shared/data.service";
import {HttpClient} from "@angular/common/http";

export interface DialogData {
  fileName: string;
}

@Component({
  selector: 'app-image-manipulator',
  templateUrl: './image-manipulator.component.html',
  styleUrls: ['./image-manipulator.component.css']
})
export class ImageManipulatorComponent implements OnInit {

  ROTATE_URL : string = 'http://localhost:8080/manipulation/rotate/';

  image: any;

  constructor(private manipulatorService: ManipulatorService, private route: ActivatedRoute,
              private dataService: DataService, private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchImageFromDataService()
  }

  fetchImageFromDataService() {
    this.dataService.get();
    let imageDB: Image = this.dataService.image;
    this.image = 'data:' + imageDB.type + ';base64,' + imageDB.content;
  }

  rotateImage() {
    this.dataService.get();
    let imageDB: Image = this.dataService.image;
    this.http.post<Image>(this.ROTATE_URL + imageDB.id, null).subscribe(data => {
      this.dataService.clear();
      let newImage : Image = data;
      this.dataService.set(newImage);
      window.location.reload();
    })
  }

}
