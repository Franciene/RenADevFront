import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DenounceComponent } from './pages/denounce/denounce.component';
import { NewComponent } from './pages/new/new.component';
import { LoginComponent } from './pages/login/login.component';
import { ViewComponent } from './pages/view/view.component';


const routes: Routes = [

  { path: 'home', component: HomeComponent},
  { path: 'history', component: DenounceComponent},
  { path: 'denounce', component: NewComponent},
  { path: 'login', component: LoginComponent},
  { path: 'history/view/:id', component: ViewComponent},
  { path: 'search', component: DenounceComponent},
  { path: '', pathMatch: 'full', redirectTo: '/home'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
