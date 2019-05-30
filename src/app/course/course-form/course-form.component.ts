import { MatDialog } from '@angular/material';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/service/database.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  facultyForm = this.fb.group({
    id: [null, Validators.required],
    name: [null, Validators.required],
  });

  constructor(private fb: FormBuilder, private dialog: MatDialog, private dbs:DatabaseService) {}

  onSubmit() {
    console.log(this.facultyForm.value);
    this.dbs.setCourse(this.facultyForm.value)
    this.dialog.closeAll();
  }

}
