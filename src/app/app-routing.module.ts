import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  // On définit la route par défaut 
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  
  // Route qui mène vers authentification 
  {path: 'auth' , component: AuthComponent},

  // Route mène vers la page contact 
  {path: 'contact/:id', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
