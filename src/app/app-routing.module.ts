import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonsComponent } from './pages/persons/persons.component';

const routes: Routes = [
  { path: 'persons', title: 'Persons', component: PersonsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
