import { Batch } from './../models/model';
import { DatabaseService } from './../services/database.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  batches: Observable<Batch[]>

  constructor(public dbs: DatabaseService){
    this.batches=dbs.getBatch();
  }

}
