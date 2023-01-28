import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../models/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { AddEmployeComponent } from '../add-employe/add-employe.component';


@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.css']
})
export class ListEmployeComponent {
  employe: Employee;
  p: number = 1;
  control: FormControl = new FormControl('');
  constructor(public crudApi: EmployeeService, public toastr: ToastrService,
    private router: Router, public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEmployeComponent>,) { }

  ngOnInit() {

    this.getData();
  }
  addarticle() {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.matDialog.open(AddEmployeComponent, dialogConfig);
  }




  getData() {
    this.crudApi.getAll().subscribe(
      response => { this.crudApi.listData = response; }
    );

  }


  removeData(id: number) {
    if (window.confirm('Are sure you want to delete this Employee ?')) {
      this.crudApi.deleteData(id)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.warning(' data successfully deleted!');
            this.getData();
          },
          error => console.log(error));
    }
  }

  selectData(item: Employee) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";

    this.matDialog.open(AddEmployeComponent, dialogConfig);
  }



}