import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ImageManipulatorComponent} from "./image-manipulator/image-manipulator.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'manipulate', component: ImageManipulatorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
