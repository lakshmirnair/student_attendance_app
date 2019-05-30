import { Faculty, Course, Department, Batch, Student } from './../models/model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private facultyCollection: AngularFirestoreCollection<any>;
  private courseCollection: AngularFirestoreCollection<Course>;
  private dptCollection: AngularFirestoreCollection<Department>;
  private batchCollection: AngularFirestoreCollection<Batch>;
  private studentCollection: AngularFirestoreCollection<any>;

  faculty:Observable<Faculty[]>;
  course:Observable<Course[]>;
  dpt:Observable<Department[]>;
  batch:Observable<Batch[]>;
  student:Observable<Student[]>;

  constructor(private afs:AngularFirestore) { 

    this.facultyCollection = afs.collection('faculty', ref=> ref.orderBy('id'));
    this.courseCollection = afs.collection<Course>('course', ref=> ref.orderBy('id'));
    this.dptCollection = afs.collection<Department>('department', ref=> ref.orderBy('id'));
    this.batchCollection = afs.collection<Batch>('batch');
    this.studentCollection = afs.collection('student');

    this.faculty=this.facultyCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const $key = a.payload.doc.id;
        return { $key, ...data };
      }))
    );

    this.course=this.courseCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Course;
        const $key = a.payload.doc.id;
        return { $key, ...data };
      }))
    );

    this.dpt=this.dptCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Department;
        const $key = a.payload.doc.id;
        return { $key, ...data };
      }))
    );

    this.batch=this.batchCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Batch;
        const $key = a.payload.doc.id;
        return { $key, ...data };
      }))
    );

    this.student=this.studentCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Student;
        const $key = a.payload.doc.id;
        return { $key, ...data };
      }))
    );

  }

//Faculty
  getFaculty(){
    return this.faculty;
  }

  setFaculty(data){

    let batch_id = data.batch.id;
    let batch_key = data.batch.$key;
    let id = data.id;
    let name = data.name;

    // console.log({batch,batch_key});
    this.facultyCollection.add({id,name,batch_id,batch_key});
  }

  deleteFaculty(Key){
    this.facultyCollection.doc<Faculty>(Key).delete();
  }

  
//Course
  getCourse(){
    return this.course;
  }

  setCourse(data){
    this.courseCollection.add(data);
  }

  deleteCourse(Key){
    this.courseCollection.doc<Course>(Key).delete();
  }

  
//Department
  getDpt(){
    return this.dpt;
  }

  setDpt(data){
    this.dptCollection.add(data);
  }

  deleteDpt(Key){
    this.dptCollection.doc<Department>(Key).delete();
  }

  
//Batch
  getBatch(){
    return this.batch;
  }

  setBatch(data:Batch){
    let id=data.semester+data.department+data.section+data.batch;
    // console.log(id);
    this.batchCollection.add({id,...data});
  }

  deleteBatch(Key){
    this.batchCollection.doc<Batch>(Key).delete();
  }

//student
  getStudent(){
    return this.student;
  }

  setStudent(data){

    let batch_id = data.batch.id;
    let batch_key = data.batch.$key;
    let id = data.id;
    let name = data.name;

    // console.log({batch,batch_key});
    this.studentCollection.add({id,name,batch_id,batch_key});

  }

  deleteStudent(Key){
    this.studentCollection.doc<Student>(Key).delete();
  }


}
