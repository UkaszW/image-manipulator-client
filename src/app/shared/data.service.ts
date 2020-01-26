import {Injectable} from '@angular/core';
import {SessionStorageService} from "angular-web-storage";

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

  image: Image;

  constructor(private session: SessionStorageService) { }

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

}
