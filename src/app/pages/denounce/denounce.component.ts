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
  description: any;
  images: any;
  videos: any;
  date: any;
  status: any;
  commentaries: any;
  list : any = [];

  constructor(private denounceService : DenounceService, private router: Router) { }

  ngOnInit(): void {
    this.historyDenounce();
  }

  historyDenounce(){
    let data = {
      "userEmail": JSON.parse(localStorage.getItem('user') || 'null')?.email,
    }
    this.denounceService.getDenouncesByUser(data).subscribe( resp => {
      if(resp.success) this.list = resp.payload[0];
    });
  }
  

}
