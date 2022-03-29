import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DenounceService } from 'src/app/services/denounce.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  listGames : any = [];
  listToPlay : any = [];
  user: any;

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

  denounce : any;

  constructor(private denounceService : DenounceService, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user') || 'null'); 

    console.log(typeof(this.user));

    this.route.params.subscribe(params => {
      this.denounce = params['id'];
      this.findDenounce();
      console.log("veio ? ",this.denounce);
    });

  }

  findDenounce(){
    let data = {
      "userEmail": JSON.parse(localStorage.getItem('user') || 'null')?.email,
    }
    this.denounceService.getDenouncesByUser(data).subscribe( resp => {
      if(resp.success){
        let denounces = resp.payload[0];
        console.log(denounces);
        let view = denounces.find((element : any) => element._id == this.denounce);
        console.log(view);
        this.cep = view.cep;
        this.street = view.street;
        this.number = view.number;
        this.complement = view.complement;
        this.district = view.district;
        this.description = view.description;
        this.status = view.status;
      }
    });
  }

}
