import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeComponent } from './employes/add-employe/add-employe.component';
import { ListEmployeComponent } from './employes/list-employe/list-employe.component';
import { AddInfractionComponent } from './infractions/add-infraction/add-infraction.component';
import { ListInfractionsComponent } from './infractions/list-infractions/list-infractions.component';
import { MenuComponent } from './menu/menu.component';
import { AddComponent } from './reclamations/add/add.component';
import { ListComponent } from './reclamations/list/list.component';
import { DatePipe } from '@angular/common';
import { ListDepartementComponent } from './departement/list-departement/list-departement.component';
import { AddDepartementComponent } from './departement/add-departement/add-departement.component';
import { LoginComponent } from './user/login/login.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },

  //{ path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'admin', component: MenuComponent, children: [
      { path: 'reclamations', component: ListComponent },
      { path: 'reclamation', component: AddComponent },
      { path: 'infractions', component: ListInfractionsComponent },
      { path: 'infraction', component: AddInfractionComponent },
      { path: 'employes', component: ListEmployeComponent },
      { path: 'employe', component: AddEmployeComponent },
      { path: 'departements', component: ListDepartementComponent },
      { path: 'departement', component: AddDepartementComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
