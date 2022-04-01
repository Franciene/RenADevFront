import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  commentaries: any = [];
  newComent: any = '';

  denounce : any;

  constructor(private denounceService : DenounceService, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user') || 'null'); 

    this.route.params.subscribe(params => {
      this.denounce = params['id'];
      this.findDenounce();
    });

  }

  findDenounce(){
    this.denounceService.getDenounces().subscribe( resp => {
      if(resp.success){
        let denounces = resp.payload[0];
        let view = denounces.find((element : any) => element._id == this.denounce);
        this.cep = view?.cep;
        this.street = view?.street;
        this.number = view?.number;
        this.images = view?.images;
        this.videos = view?.videos;
        this.complement = view?.complement;
        this.district = view?.district;
        this.description = view?.description;
        this.status = view?.status;
        this.commentaries = view?.commentaries;
      }
    });
  }

  addComent(){
    console.log(this.newComent, this.denounce);
    if(this.commentaries && this.commentaries.length > 0){
      this.commentaries.push({
        "coment": this.newComent,
        "date": new Date(),
      });
    }else{
      this.commentaries = [{
        "coment": this.newComent,
        "date": new Date(),
      }];
    }
    let data = {
      "commentary": this.commentaries,
      "denounceId": this.denounce, 
    }

    this.denounceService.addComent(data).subscribe( resp => {
      this.newComent = '';
      document.getElementById('new')?.setAttribute('value', ' ');
    });

  }

  approveDenounce(type : string){
    let data = {
      "status": type,
      "denounceId": this.denounce, 
    }

    this.denounceService.updateDenounce(data).subscribe( resp => {
      if(resp?.success){
       window.location.reload();
      }
    });

  

  }

}
