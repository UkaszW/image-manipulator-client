import {Component, ElementRef, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {Router} from "@angular/router";
import {DataService, Image} from "../shared/data.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  static UPLOAD_URL = "/base/upload";

  @ViewChild('fileInput') fileInput: ElementRef;

  uploader: FileUploader;
  isDropOver: boolean;

  image: Image;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    const headers = [{name: 'Accept', value: 'application/json'}];
    this.uploader = new FileUploader({url: FileUploadComponent.UPLOAD_URL, autoUpload: true, headers: headers});
    this.uploader.response.subscribe( res => {
      this.image = JSON.parse(res);
    } );
    this.uploader.onCompleteAll = () => this.gotoManipulate();
  }

  ngOnDestroy() {
    this.dataService.set(this.image);
  }

  fileOverAnother(e: any): void {
    this.isDropOver = e;
  }

  fileClicked() {
    this.fileInput.nativeElement.click();
  }

  gotoManipulate() {
    this.router.navigate(['../manipulate']);
  }
}
