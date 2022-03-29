import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lat: number = -23.5558;
  lng: number = -46.6396;
  zoom: number = 8;
  
  markers: marker[] = [
	  {
		  lat: -23.4677008,
		  lng: -47.4354559,
		  label: '',
		  draggable: true
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'B',
		  draggable: false
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'C',
		  draggable: true
	  }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  click(denounce: any) {
    console.log("CLIQUE", denounce);
  }

}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}