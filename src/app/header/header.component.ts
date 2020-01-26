import {Component, Inject, OnInit} from '@angular/core';
import {DataService} from "../shared/data.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../image-manipulator/image-manipulator.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'image-manipulator-client';

  constructor(private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDownloadDialog(): void {
    const dialogRef = this.dialog.open(ImageDownloadDialog, {
      width: '250px'
    });
  }

}

@Component({
  selector: 'dialog-image-download',
  templateUrl: '../header/imageDownloadDialog.html',
})
export class ImageDownloadDialog {

  fileName : string;

  constructor(
    public dialogRef: MatDialogRef<ImageDownloadDialog>,
    private snackBar: MatSnackBar, private dataService: DataService) {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  download(): void {
    if (this.fileName != undefined) {
      this.dialogRef.close();
      this.dataService.downloadImage(this.fileName);
    } else {
      this.snackBar.open("File name is required!", "OK", {
        duration: 2000
      });
    }
  }

}
