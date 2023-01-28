import { Component, Inject, OnInit } from '@angular/core';
import { Validator, ReactiveFormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Departement } from 'src/app/models/departement';
import { DepartementService } from 'src/app/services/departement.service';
import { AddDepartementComponent } from '../add-departement/add-departement.component';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from "@angular/core";

@Component({
  selector: 'app-list-departement',
  templateUrl: './list-departement.component.html',
  styleUrls: ['./list-departement.component.css']
})
export class ListDepartementComponent {
  p: number = 1;
  departement: Departement;
  control: FormControl = new FormControl('');
  constructor(public crudApi: DepartementService, public toastr: ToastrService, private router: Router,
    public fb: FormBuilder, private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddDepartementComponent>,) { }
  ngOnInit() {
    this.getData();
  }
  addDep() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.matDialog.open(AddDepartementComponent, dialogConfig);

  }
  getData() {
    this.crudApi.getAll().subscribe(
      Response => { this.crudApi.listData = Response; }
    );
  }
  removeData(id: number) {
    if (window.confirm("are you sure you want to delete this departement?")) {
      this.crudApi.deleteData(id).subscribe(
        data => {
          console.log(data);
          this.toastr.success('Data successfuly deleted');
          this.getData();
        },
        error => console.log(error)
      );
    }
  }
  selectData(item: Departement) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";

    this.matDialog.open(AddDepartementComponent, dialogConfig);
  }
}
