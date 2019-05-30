import { Batch } from './../../models/model';
import { DatabaseService } from './../../service/database.service';
import { MatDialog } from '@angular/material';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-faculty-form',
  templateUrl: './faculty-form.component.html',
  styleUrls: ['./faculty-form.component.scss'],
})
export class FacultyFormComponent {
  facultyForm = this.fb.group({
    id: [null, Validators.required],
    name: [null, Validators.required],
    batch: [null, Validators.required],
  });

  batches:Observable<Batch[]>;
  constructor(private fb: FormBuilder, private dialog: MatDialog, private dbs:DatabaseService) {
    this.batches=dbs.getBatch();
  }

  onSubmit() {
    console.log(this.facultyForm.value);
    this.dbs.setFaculty(this.facultyForm.value)
    this.dialog.closeAll();
  }
}
