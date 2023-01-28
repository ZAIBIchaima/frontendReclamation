import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ListComponent } from './reclamations/list/list.component';
import { AddComponent } from './reclamations/add/add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef, } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ListInfractionsComponent } from './infractions/list-infractions/list-infractions.component';
import { AddInfractionComponent } from './infractions/add-infraction/add-infraction.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListEmployeComponent } from './employes/list-employe/list-employe.component';
import { AddEmployeComponent } from './employes/add-employe/add-employe.component';
import { LoginComponent } from './user/login/login.component';
import { DatePipe } from '@angular/common';
import { AddDepartementComponent } from './departement/add-departement/add-departement.component';
import { ListDepartementComponent } from './departement/list-departement/list-departement.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';


const materialModules = [
  MatIconModule,
  MatDialogModule,
  MatToolbarModule,
];
const appRoutes: Routes = [
  {
    path: '', component: MenuComponent, children: [

      //{ path: 'reclamation', component: ListReclamationComponent },
    ]
  }
]
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ListComponent,
    AddComponent,
    ListInfractionsComponent,
    AddInfractionComponent,
    ListEmployeComponent,
    AddEmployeComponent,
    LoginComponent,
    AddDepartementComponent,
    ListDepartementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    materialModules,
    HttpClientModule,
    NgxPaginationModule,

  ],
  providers: [DatePipe, { provide: MAT_DIALOG_DATA, useValue: {}, },
    { provide: MatDialogRef, useValue: {} }, authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule { }
