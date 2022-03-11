import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DenounceService {

  constructor(private http: HttpClient) { }

  getDenounces() : Observable<any> {
    return this.http.get('https://rentadev-api.herokuapp.com/denounces/denounces/denounce-history');
  }

  getDenouncesByUser(data : any) : Observable<any> {
    return this.http.post(`https://rentadev-api.herokuapp.com/denounces/denounces/denounce-history-by-user`, data);
  }

  registerDenounce(data : any) : Observable<any> {
    return this.http.post(`https://rentadev-api.herokuapp.com/denounces/denounces/register-denounce`, data);
  }

  getaddress(cep : any) : Observable<any> {
    return this.http.get('https://h-apigateway.conectagov.estaleiro.serpro.gov.br/api-cep/v1/consulta/cep/'+cep, {
      headers: {'Token URL': 'https://h-apigateway.conectagov.estaleiro.serpro.gov.br/oauth2/jwt-token'}
   });
  }
  
}
