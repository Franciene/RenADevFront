import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CepService } from 'src/app/services/cep.service';
import { DenounceService } from 'src/app/services/denounce.service';
@Component({
  selector: 'app-denounce',
  templateUrl: './denounce.component.html',
  styleUrls: ['./denounce.component.scss']
})
export class DenounceComponent implements OnInit {

  userEmail: any;
  cep: any;
  street: any;
  number: any;
  complement: any;
  district: any;
  city:any;
  description: any;
  images: any;
  videos: any;
  date: any;
  status: any;
  commentaries: any;
  list : any = [];
  start: any;
  end: any;

  constructor(private denounceService : DenounceService, private router: Router) { }

  ngOnInit(): void {
    this.historyDenounce();
  }

  historyDenounce(){
    let data = {
      "userEmail": JSON.parse(localStorage.getItem('user') || 'null')?.email,
    }
    this.denounceService.getDenounces().subscribe( resp => {
      if(resp.success) this.list = resp.payload[0];
    });
  }

  search(){
    let where = {
      city : null,
      start: null,
      end: null,
      district: null
    };

    if(this.city) where['city'] = this.city;
    if(this.start && this.end ){
      where['start'] = this.start;
      where['end'] = this.end;
    }
    if(this.district) where['district'] = this.district;

    this.denounceService.searchDenounce(where).subscribe( resp => {
      if(resp.success) this.list = resp.payload[0];
    });
    
  }
  

}
