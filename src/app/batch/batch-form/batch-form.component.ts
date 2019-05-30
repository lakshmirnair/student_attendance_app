import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/service/database.service';
import { Course, Department } from 'src/app/models/model';

@Component({
  selector: 'app-batch-form',
  templateUrl: './batch-form.component.html',
  styleUrls: ['./batch-form.component.scss']
})
export class BatchFormComponent {

  course:Observable<Course[]>;
  dpt:Observable<Department[]>;

  facultyForm = this.fb.group({
    course: [null, Validators.required],
    semester: [null, Validators.required],
    department: [null, Validators.required],
    section: [null, Validators.required],
    batch: [null, Validators.required],
  });


  sems = [
    {value: '1'},
    {value: '2'},
    {value: '3'},
    {value: '4'},
    {value: '5'},
    {value: '6'},
    {value: '7'},
    {value: '8'},
  ];

  section = [
    {value: 'A'},
    {value: 'B'},
    {value: 'C'},
  ];

  batches = [
    {value: '1'},
    {value: '2'},
    {value: '3'},
  ];


  constructor(private fb: FormBuilder, private dialog: MatDialog, private dbs:DatabaseService) {
    this.course=dbs.getCourse();
    this.dpt=dbs.getDpt();
  }
  

  onSubmit() {
    console.log(this.facultyForm.value);
    this.dbs.setBatch(this.facultyForm.value)
    this.dialog.closeAll();
  }

}