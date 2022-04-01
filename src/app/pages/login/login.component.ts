import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FacebookAuthProvider, GoogleAuthProvider} from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email : any;
  senha : any;


  constructor(private userService : UserService, private router: Router, private auth: AngularFireAuth, private dialogRef : MatDialogRef<LoginComponent>){ }

  ngOnInit(): void {
    
  }

  login(){
    let data = {
      email: this.email,
      senha: this.senha
    }
    this.userService.login(data).subscribe( resp => {
      console.log(resp);
        const user = {
          'name' : resp.payload[0].name,
          'email' : resp.payload[0].email,
          'type': 1
        };
      localStorage.setItem("user", JSON.stringify(user));
      window.location.reload();
      this.router.navigateByUrl('/home');
    });
  }

  loginFace(){
    const provider = new FacebookAuthProvider();

    this.auth.signInWithPopup(provider)
      .then((result) => {
        // The signed-in user info.
        const user = {
          'name' : result?.user?.displayName,
          'email' : result?.user?.email,
          'type': 0

        }; 
        localStorage.setItem("user", JSON.stringify(user));
        window.location.reload();
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

        const user = {
          'name' : result?.user?.displayName,
          'email' : result?.user?.email,
          'type': 0

        }; 
        localStorage.setItem("user", JSON.stringify(user));
        window.location.reload();

        // ...
      })
      .catch((error) => {
        console.log("ERROR");
      });

  }

  

}
