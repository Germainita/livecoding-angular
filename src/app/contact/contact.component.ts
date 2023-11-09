import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  // Définition du constructeur 
  constructor (private route: ActivatedRoute){}

  // Déclaration des attriuts
  // Attribut qui permet de récupérer l'identifiant de celui qui s'est connecté 
  idUserConnect = this.route.snapshot.params['id'];

  // Attribut qui stock le tableau de notre localstorage
  tabUsers:any;

  // Attribut qui stock l'utilisateur qui s'est connecté 
  userConnect:any;

  // Declaration des méthodes 
  // Redifinition de la methode ngoninit 
  ngOnInit(): void {
    // On récupère le tableau d'objets dans le localstorage
    this.tabUsers = JSON.parse(localStorage.getItem("Users") || "[]");

    // On récupère l'objet qui s'est connecter 
    this.userConnect = this.tabUsers.find((element:any) => element.idUser == this.idUserConnect);
    console.log(this.userConnect);
  }
}
