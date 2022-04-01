import { Component, OnInit } from '@angular/core';
import { CepService } from 'src/app/services/cep.service';
import { DenounceService } from 'src/app/services/denounce.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lat: number = -23.4773907;
  lng: number = -47.5367395;
  zoom: number = 12;
  list: any = [];
  
  markers: marker[] = [];

  constructor( private denounceService : DenounceService, private cepService: CepService ) { }

  ngOnInit(): void {
	  this.historyDenounce();
  }

  click(denounce: any) {
    console.log("CLIQUE", denounce);
  }

  historyDenounce(){
    let data = {
      "userEmail": JSON.parse(localStorage.getItem('user') || 'null')?.email,
    }
    this.denounceService.getDenounces().subscribe( resp => {
      if(resp.success) {
		  this.list = resp.payload[0];
			for(let item of this.list){
				this.cepService.getLatLng(item.cep).subscribe((data: any) => {
					if (data.status == 'OK') {
						this.markers.push(
						{
							lat: data.results[0].geometry.bounds.northeast.lat,
							lng: data.results[0].geometry.bounds.northeast.lng,
							label: '',
							id: item._id,
							district: item?.district  ?? "",
							descr: item?.description ?? "Denúncia",
							draggable: true
						});
					}
				});
			}
	  	}
    });

	if(this.list.length > 0){
		console.log(this.list);
	}
  }

}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	id?: string;
	descr?: string;
	district?:string;
	draggable: boolean;
}