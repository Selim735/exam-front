import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomBookingComponent } from './room-booking/room-booking.component';

const routes: Routes = [
  { path: 'room-booking', component: RoomBookingComponent }, 
  { path: '', redirectTo: 'room-booking', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
