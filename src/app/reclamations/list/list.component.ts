import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reclamation } from 'src/app/models/reclamation';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { AddComponent } from '../add/add.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog'
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  reclamation!: Reclamation;
  p: number = 1;
  isLoggedIn = false;
  private roles: string[];
  showAdminBoard = false;
  showReclamationBoard = false;
  control: FormControl = new FormControl('');

  constructor(public crudApi: ReclamationService, public toastr: ToastrService, private router: Router,
    public fb: FormBuilder, private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddComponent>,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showReclamationBoard = this.roles.includes('ROLE_RECLAMATION');
      console.log(this.showReclamationBoard);
    }
    this.getData();
  }
  addarticle() {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    //dialogConfig.data="gdddd";
    if (this.isLoggedIn) {
      this.matDialog.open(AddComponent, dialogConfig);
    }

  }
  getData() {
    this.crudApi.getAll().subscribe(
      response => { this.crudApi.listData = response; }
    );

  }
  removeData(id: number) {
    if (window.confirm('Are sure you want to delete this reclamations ?')) {
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
  selectData(item: Reclamation) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";

    this.matDialog.open(AddComponent, dialogConfig);
  }

}
