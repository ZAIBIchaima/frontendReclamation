import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Departement } from 'src/app/models/departement';
import { DepartementService } from 'src/app/services/departement.service';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.css']
})
export class AddEmployeComponent {

  DepartementList: Departement[];
  departement: any = {};
  constructor(public crudApi: EmployeeService, public fb: FormBuilder, public toastr: ToastrService,

    public DepartementService: DepartementService,
    private router: Router, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEmployeComponent>,

  ) { }
  get f() { return this.crudApi.dataForm.controls; }
  ngOnInit() {
    if (this.crudApi.choixmenu == "A") { this.infoForm() };
    this.DepartementService.getAll().subscribe(
      response => { this.DepartementList = response; }
    );

  }

  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      id: null,
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      dateEmbauche: [0, [Validators.required]],
      mail: ['', [Validators.required]],

      idDep: [0, [Validators.required]],


    });
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }
  onSubmit() {
    if (this.crudApi.choixmenu == "A") {
      this.addData();
    }
    else {
      this.updateData()
    }
  }
  onSelectedDep(libDep: number) {
    this.DepartementService.getData(libDep).subscribe(
      response => {
        this.departement = response;

      }
    );
  }

  addData() {
    this.crudApi.createData(this.crudApi.dataForm.value).
      subscribe(data => {
        this.dialogRef.close();

        this.crudApi.getAll().subscribe(
          response => { this.crudApi.listData = response; }
        );
        this.router.navigate(['/employes']);
      });
  }
  updateData() {
    this.crudApi.updatedata(this.crudApi.dataForm.value.id, this.crudApi.dataForm.value).
      subscribe(data => {
        this.dialogRef.close();
        this.crudApi.getAll().subscribe(
          Response => { this.crudApi.listData = Response; }
        );
        this.router.navigate(['/employes']);
      });
  }


}

