import {Injectable} from '@angular/core';
import {SessionStorageService} from "angular-web-storage";
import {DomSanitizer} from "@angular/platform-browser";
import { saveAs } from 'file-saver';

export class Image {
  constructor(
    public id: number,
    public name: string,
    public type: string,
    public content: any,
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  KEY = 'image';

  image: Image = null;

  constructor(private session: SessionStorageService, private sanitizer: DomSanitizer) { }

  set(image: Image) {
    this.session.set(this.KEY, image);
  }

  remove() {
    this.session.remove(this.KEY);
  }

  get() {
    this.image = this.session.get(this.KEY);
  }

  clear() {
    this.session.clear();
  }

  downloadImage() {
    let b64toBlob = (b64Data, contentType='', sliceSize=512) => {
      let byteCharacters = atob(b64Data);
      let byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);

        let byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        let byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      return new Blob(byteArrays, {type: contentType});
    };

    let blob = b64toBlob(this.image.content, this.image.type);
    let blobUrl = window.URL.createObjectURL(blob);
    let filename : string = this.image.name;
    saveAs(blob, filename);
    window.open(blobUrl);
  }

}
