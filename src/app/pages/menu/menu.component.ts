import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog) { }
  userLoggedIn: any = null;
  admin : any = null;

  ngOnInit(): void {
    this.userLoggedIn = JSON.parse(localStorage.getItem('user') || 'null') ?? null; 
    if(this.userLoggedIn != null)
      this.admin = this.userLoggedIn?.type ? 0 : 1;
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  userLogado(){
    let text = JSON.parse(localStorage.getItem('user') || 'null'); 
    text != null ? this.router.navigateByUrl('/perfil') : this.router.navigateByUrl('/login');
  }

  logOut(){
    localStorage.removeItem('user');
    window.location.reload();
  }

}
