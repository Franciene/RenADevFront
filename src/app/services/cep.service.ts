import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  constructor(private http: HttpClient) {}

  consultaCEP(cep: string) {
    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep !== '') {
      // Expressão regular para validar o CEP.
      const validacep = /^[0-9]{8}$/;

      // Valida o formato do CEP.
      if (validacep.test(cep)) {
        return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json`);
      }
    }
    return of({});
  }

  getLatLng(cep: string){
      // Nova variável "cep" somente com dígitos.
      // cep = cep.replace(/\D/g, '');

      // Verifica se campo cep possui valor informado.
      if (cep !== '') {
        // Expressão regular para validar o CEP.
        const validacep = /^[0-9]{8}$/;
  
        // Valida o formato do CEP.
        if (validacep.test(cep)) {
          return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=AIzaSyCxvTc_3L8Rk8hROFDJYnHr4V7wHaUeTMY`);
        }
      }
      return of({});

  }
}
