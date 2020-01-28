import {Component, OnInit} from '@angular/core';
import {ManipulatorService} from "../shared/image/manipulator.service";
import {ActivatedRoute} from "@angular/router";
import {DataService, Image} from "../shared/data.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BlockUI, NgBlockUI} from "ng-block-ui";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Dimensions, ImageCroppedEvent, ImageTransform} from "ngx-image-cropper";

export interface DialogData {
  fileName: string;
}

enum FILTERS {
  Grayscale = "Grayscale",
  Sepia = "Sepia",
  Invert = "Invert"
}

@Component({
  selector: 'app-image-manipulator',
  templateUrl: './image-manipulator.component.html',
  styleUrls: ['./image-manipulator.component.css']
})
export class ImageManipulatorComponent implements OnInit {

  ROTATE_URL: string = '/manipulation/rotate/';
  GRAYSCALE_URL: string = '/manipulation/grayscale/';
  SEPIA_URL: string = '/manipulation/sepia/';
  BRIGHTNESS_URL: string = '/manipulation/brightness/';
  RESIZE_URL: string = '/manipulation/resize/';
  INVERT_URL: string = '/manipulation/invert/';
  ANGLE_LEFT = '-90';
  ANGLE_RIGHT = '90';

  image: any;

  @BlockUI() blockUI: NgBlockUI;

  constructor(private manipulatorService: ManipulatorService, private route: ActivatedRoute,
              private dataService: DataService, private http: HttpClient, private snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchImageFromDataService()
  }

  fetchImageFromDataService() {
    this.dataService.get();
    let imageDB: Image = this.dataService.image;
    this.image = 'data:' + imageDB.type + ';base64,' + imageDB.content;
  }

  rotateImage(angle: string) {
    this.blockUI.start();
    this.dataService.get();
    let imageDB: Image = this.dataService.image;

    let params = new HttpParams().set('angle', angle);
    this.http.put<Image>(this.ROTATE_URL + imageDB.id, params).subscribe((data) => {
      this.dataService.clear();
      this.dataService.set(data);
      this.blockUI.stop();
      this.ngOnInit();
    }, (error) => {
      this.blockUI.stop();
      console.log(error);
      this.snackBar.open("Error occurred - code: " + error.status, "OK", {
        duration: 2000
      });
    });
  }

  toGrayscale() {
    this.blockUI.start();
    this.dataService.get();
    let imageDB: Image = this.dataService.image;

    this.http.put<Image>(this.GRAYSCALE_URL + imageDB.id, null).subscribe((data) => {
      this.dataService.clear();
      this.dataService.set(data);
      this.blockUI.stop();
      window.location.reload();
      //this.ngOnInit();
    }, (error) => {
      this.blockUI.stop();
      console.log(error);
      this.snackBar.open("Error occurred - code: " + error.status, "OK", {
        duration: 2000
      });
    });
  }

  toSepia(sepiaIntensity: string) {
    this.blockUI.start();
    this.dataService.get();
    let imageDB: Image = this.dataService.image;

    let params = new HttpParams().set('sepiaIntensity', sepiaIntensity);
    this.http.put<Image>(this.SEPIA_URL + imageDB.id, params).subscribe((data) => {
      this.dataService.clear();
      this.dataService.set(data);
      this.blockUI.stop();
      window.location.reload();
      //this.ngOnInit();
    }, (error) => {
      this.blockUI.stop();
      console.log(error);
      this.snackBar.open("Error occurred - code: " + error.status, "OK", {
        duration: 2000
      });
    });
  }

  toInvert() {
    this.blockUI.start();
    this.dataService.get();
    let imageDB: Image = this.dataService.image;

    this.http.put<Image>(this.INVERT_URL + imageDB.id, null).subscribe((data) => {
      this.dataService.clear();
      this.dataService.set(data);
      this.blockUI.stop();
      window.location.reload();
      //this.ngOnInit();
    }, (error) => {
      this.blockUI.stop();
      console.log(error);
      this.snackBar.open("Error occurred - code: " + error.status, "OK", {
        duration: 2000
      });
    });
  }

  changeBrightness(factor: string) {
    this.blockUI.start();
    this.dataService.get();
    let imageDB: Image = this.dataService.image;

    let params = new HttpParams().set('factor', factor);
    this.http.put<Image>(this.BRIGHTNESS_URL + imageDB.id, params).subscribe((data) => {
      this.dataService.clear();
      this.dataService.set(data);
      this.blockUI.stop();
      window.location.reload();
      //this.ngOnInit();
    }, (error) => {
      this.blockUI.stop();
      console.log(error);
      this.snackBar.open("Error occurred - code: " + error.status, "OK", {
        duration: 2000
      });
    });
  }

  resize(width: string, height: string) {
    this.blockUI.start();
    this.dataService.get();
    let imageDB: Image = this.dataService.image;

    let params = new HttpParams().set('width', width).set('height', height);
    this.http.put<Image>(this.RESIZE_URL + imageDB.id, params).subscribe((data) => {
      this.dataService.clear();
      this.dataService.set(data);
      this.blockUI.stop();
      window.location.reload();
      //this.ngOnInit();
    }, (error) => {
      this.blockUI.stop();
      console.log(error);
      this.snackBar.open("Error occurred - code: " + error.status, "OK", {
        duration: 2000
      });
    });
  }

  openFiltersDialog(): void {
    const dialogRef = this.dialog.open(FiltersDialog, {
      width: '250px'
    });
  }

  openTuningDialog(): void {
    const dialogRef = this.dialog.open(TuningDialog, {
      width: '250px'
    });
  }

  openResizeDialog(): void {
    const dialogRef = this.dialog.open(ResizeDialog, {
      width: '250px'
    });
  }

  openTransformDialog(): void {
    const dialogRef = this.dialog.open(TransformDialog, {
      width: '550px'
    });
  }

}


@Component({
  selector: 'dialog-filters',
  templateUrl: './dialog/filtersDialog.html',
  providers: [ImageManipulatorComponent]
})
export class FiltersDialog {

  filters = FILTERS;
  keys;
  selectedFilter;

  constructor(
    public dialogRef: MatDialogRef<FiltersDialog>,
    private snackBar: MatSnackBar, private dataService: DataService, private component: ImageManipulatorComponent ) {
    this.keys = Object.keys(this.filters);
    this.selectedFilter == undefined;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  goFilter(): void {
    if (this.selectedFilter != undefined) {
      this.dialogRef.close();
      this.runFilter(this.selectedFilter);
    } else {
      this.snackBar.open("File name is required!", "OK", {
        duration: 2000
      });
    }
  }

  runFilter(selectedFilter) {
    if (selectedFilter == FILTERS.Grayscale){
      this.component.toGrayscale();
    } else if (selectedFilter == FILTERS.Sepia) {
      this.component.toSepia('80');
    } else if (selectedFilter == FILTERS.Invert) {
      this.component.toInvert()
    }
  }

}

@Component({
  selector: 'dialog-tuning',
  templateUrl: './dialog/tuningDialog.html',
  providers: [ImageManipulatorComponent]
})
export class TuningDialog {

  factor: string;

  constructor(
    public dialogRef: MatDialogRef<FiltersDialog>,
    private snackBar: MatSnackBar, private dataService: DataService, private component: ImageManipulatorComponent) {
  }

  updateSetting(event) {
    console.log(event.value);
    this.factor = event.value;
    console.log(this.factor);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  tuning(): void {
    if (this.factor != undefined) {
      this.dialogRef.close();
      this.component.changeBrightness(this.factor)
    } else {
      this.snackBar.open("Factor is required!", "OK", {
        duration: 2000
      });
    }
  }

}


@Component({
  selector: 'dialog-resize',
  templateUrl: './dialog/resizeDialog.html',
  providers: [ImageManipulatorComponent]
})
export class ResizeDialog {

  width;
  height;

  constructor(
    public dialogRef: MatDialogRef<ResizeDialog>,
    private snackBar: MatSnackBar, private dataService: DataService, private component: ImageManipulatorComponent) {
    this.width = undefined;
    this.height = undefined;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  resize(): void {
    console.log(this.width);
    console.log(this.height);
    if (this.width != undefined && this.height != undefined) {
      this.dialogRef.close();
      this.component.resize(this.width, this.height);
    } else {
      this.snackBar.open("Width and height is required!", "OK", {
        duration: 2000
      });
    }
  }

}



@Component({
  selector: 'dialog-transform',
  templateUrl: './dialog/transformDialog.html',
  providers: [ImageManipulatorComponent],
  styleUrls: ['./image-manipulator.component.css']
})
export class TransformDialog {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = true;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  imageBaseA() : string {
    this.dataService.get();
    let imageDB: Image = this.dataService.image;
    return  'data:' + imageDB.type + ';base64,' + imageDB.content;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(event);
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }


  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation
    };
  }

  constructor(
    public dialogRef: MatDialogRef<TransformDialog>,
    private snackBar: MatSnackBar, private dataService: DataService, private component: ImageManipulatorComponent) {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  crop(): void {
    // if (this.fileName != undefined) {
    //   this.dialogRef.close();
    //   this.dataService.downloadImage(this.fileName);
    // } else {
    //   this.snackBar.open("File name is required!", "OK", {
    //     duration: 2000
    //   });
    // }
  }

}
