import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CepService } from 'src/app/services/cep.service';
import { DenounceService } from 'src/app/services/denounce.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  listGames : any = [];
  listToPlay : any = [];
  user: any;

  userEmail: any;
  cep: any;
  street: any;
  number: any;
  city:any;
  complement: any;
  district: any;
  description: any;
  images: any;
  videos: any;
  date: any;
  status: any;
  commentaries: any;

  constructor(private denounceService : DenounceService, private router: Router, private cepService: CepService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user') || 'null'); 

    console.log(typeof(this.user));

  }

  searchCep(){
    const cep = this.cep;
    this.cepService.consultaCEP(cep).subscribe((data: any) => {
      if (data.erro) {
        this.toastr.error('CEP inválido');
        return;
      }

      const respZipCode = data;
       
      console.log(respZipCode);

      if (Object.keys(respZipCode).length > 0) {
        this.street = respZipCode.logradouro;
        this.district = respZipCode.bairro;
        this.city = respZipCode.localidade;
      }
    });
  }

  cepInput() {
    let cep = this.cep;
    if (cep.length >= 8 ) {
      this.searchCep();
    }else{
      this.toastr.error('CEP inválido');
    }
  }

  onFileSelected(event: any) {
    if(event.target.files.length > 0) 
      this.images = event.target.files[0].name;
  }
  

  registerDenounce(){
    let data = {
      "userEmail": JSON.parse(localStorage.getItem('user') || 'null')?.email,
      "cep": this.cep,
      "street": this.street,
      "number": this.number,
      "complement": this.complement,
      "district": this.district,
      "description": this.description,
      "images": this.images,
      "videos": this.videos,
      "date": new Date(),
      "city": this.city,
      "status": "PENDENTE",
      "commentaries": []
    }

    try{
      this.denounceService.registerDenounce(data).subscribe( resp => {
        localStorage.setItem("user", JSON.stringify(resp.payload));
        this.router.navigateByUrl('/home');
      });
    }catch(error){
      console.log("DEU RUIM ", error);
    }
  }

}
