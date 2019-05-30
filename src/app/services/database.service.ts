import { Batch, Student } from './../models/model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private batchCollection: AngularFirestoreCollection<Batch>;
  private studentCollection: AngularFirestoreCollection<any>;
  private AttendancetCollection: AngularFirestoreCollection<any>;

  batch: Observable<Batch[]>;
  student: Observable<Student[]>;
  attendance: Observable<any[]>;

  constructor(private afs: AngularFirestore) {

    this.batchCollection = afs.collection('batch');
    this.studentCollection = afs.collection('student');

    let date = new Date();
    let pipe = new DatePipe('en-US');
    let DATE = pipe.transform(date, 'dd-MM-yyyy');
    this.AttendancetCollection=this.afs.collection(DATE);

    this.batch = this.batchCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Batch;
        const $key = a.payload.doc.id;
        return { $key, ...data };
      }))
    );

    this.student = this.studentCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Student;
        const $key = a.payload.doc.id;
        return { $key, ...data };
      }))
    );

    this.attendance = this.AttendancetCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Student;
        const $key = a.payload.doc.id;
        return { $key, ...data };
      }))
    );


  }

  //Batch
  getBatch() {
    return this.batch;
  }

  //student
  getStudent(batchId) {
    this.studentCollection = this.afs.collection('student', ref => ref.where('batch_id', '==', batchId));
    this.student = this.studentCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Student;
        const $key = a.payload.doc.id;
        return { $key, ...data };
      }))
    );
    return this.student;
  }

  //Attendance
  // setAttendance(studArray) {

  //   let date = new Date();
  //   let pipe = new DatePipe('en-US');
  //   let DATE = pipe.transform(date, 'dd-MM-yyyy');

  //   this.AttendancetCollection=this.afs.collection(DATE);
  //   // this.AttendancetCollection.doc(DATE).set({studArray});
  //   // this.AttendancetCollection.ref.doc(DATE).set({studArray});
  //   this.AttendancetCollection.add({id:});
  //   this.attendance = this.AttendancetCollection.doc(DATE).snapshotChanges().pipe(
  //     map(actions =>  {
  //       const data = actions.payload.data();
  //       return data.studArray;
  //     }));

  //     return this.attendance;
  // }

  getAttendance(){
    return this.attendance;
  }

  addAttendance(stud){
    this.AttendancetCollection.add(stud);
  }

}
