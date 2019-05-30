import { MatDialog } from '@angular/material';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/service/database.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent {

  facultyForm = this.fb.group({
    id: [null, Validators.required],
    name: [null, Validators.required],
    abbreviation: [null, Validators.required],
  });

  constructor(private fb: FormBuilder, private dialog: MatDialog, private dbs:DatabaseService) {}

  onSubmit() {
    console.log(this.facultyForm.value);
    this.dbs.setDpt(this.facultyForm.value)
    this.dialog.closeAll();
  }

}