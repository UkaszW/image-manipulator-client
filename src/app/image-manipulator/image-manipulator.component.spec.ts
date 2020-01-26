import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageManipulatorComponent } from './image-manipulator.component';

describe('ImageManipulatorComponent', () => {
  let component: ImageManipulatorComponent;
  let fixture: ComponentFixture<ImageManipulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageManipulatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageManipulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
