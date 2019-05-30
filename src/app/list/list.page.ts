import { DatabaseService } from './../services/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  subs: Subscription;
  subs1: Subscription;

  public items: Array<{ id: String; name: string; batch_id: string }> = [];
  public index = 0;
  public item;

  constructor(public route: ActivatedRoute, public dbs: DatabaseService) {
  }

  ngOnInit() {
    let id = this.route.snapshot.queryParamMap.get('id');
    this.subs = this.dbs.getStudent(id)
      .subscribe((data) => {
        data.forEach((i) => {
          this.items.push({
            id: i.id,
            name: i.name,
            batch_id: id
          });
        });

        this.subs1 = this.dbs.getAttendance()
          .subscribe((d) => {
            for(let i=0; i<d.length;i++){
             for(let j=0;j<this.items.length; j++){
               if(this.items[j].id==d[i].id){
                this.items.splice(j,1);
               }
             }
            }
            console.log(this.items)
            this.item=this.items[0];
          })
        // console.log(this.items)
        this.item = this.items[0];

      });
  }

  addAttendance(stud, present) {
    // this.index++;
    this.item = this.items[this.index];
    if (present) {
      // console.log(stud, present);
      this.dbs.addAttendance(stud);
    }else{
      this.index++;
      this.item = this.items[this.index];
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subs.unsubscribe();
    this.subs1.unsubscribe();
  }

}