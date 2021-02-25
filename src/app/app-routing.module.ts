import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetDeviceComponent } from './get-device/get-device.component';


const routes: Routes = [
  {
    path: 'pwa',
    component: GetDeviceComponent
  },
  {
    path: '',
    redirectTo: '/pwa',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/pwa'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
