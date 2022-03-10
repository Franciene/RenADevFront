import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FacebookAuthProvider, GoogleAuthProvider} from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email : any;
  senha : any;


  constructor(private userService : UserService, private router: Router, private auth: AngularFireAuth) { }

  ngOnInit(): void {
    
  }

  login(){
    let data = {
      email: this.email,
      senha: this.senha
    }
    this.userService.login(data).subscribe( resp => {
      localStorage.setItem("user", JSON.stringify(resp.payload));
      this.router.navigateByUrl('/home');
    });
  }

  loginFace(){
    const provider = new FacebookAuthProvider();

    this.auth.signInWithPopup(provider)
      .then((result) => {
        // The signed-in user info.
        // const user = result.user;

        console.log(result);

        // ...
      })
      .catch((error) => {
        console.log("ERROR");
      });
  }


  loginGoogle(){
    const provider = new GoogleAuthProvider();

    this.auth.signInWithPopup(provider)
      .then((result) => {
        // The signed-in user info.
        // const user = result.user;

        console.log(result);

        // ...
      })
      .catch((error) => {
        console.log("ERROR");
      });

  }

  

}
