import { Component , OnInit } from '@angular/core';
import {User} from '../model/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
  // Déclaration du tableau des utilisaturs inscrits
  users: User [] = [];

  // Déclarations des attributs 
  nom : String  =  "";
  prenom : String = "";
  email : String = "";
  password : String = "";
  passwordConf : String = "";

  // Notre tableau d'objets utilisateurs récupéré à partir du localstorage
  tabUsers : any;
  idLastUser: number = 0;

  // Appel de la methode ngOnInit de l'interface oninit 
  ngOnInit() {
    console.log(this.users);
    if(!localStorage.getItem("Users")){
      localStorage.setItem("Users", JSON.stringify(this.users));
    }

    // Renvoie un tableau de valuers ou un tableau vide 
    this.tabUsers = JSON.parse(localStorage.getItem("Users") || "[]");    

    // On vérifie si le tableau n'est pas vide 
    if(this.tabUsers.length != 0){
      this.idLastUser = this.tabUsers[this.tabUsers.length -1].idUser;
    }
    
  }

  // Methode pour vider les champs 
  viderChamps(){
    this.nom = "";
    this.prenom = "";
    this.email = "";
    this.password = "";
    this.passwordConf = "";
  }

  // Méthode pour afficher un sweetalert2 apres vérification 
  verifierChamps(title:any, text:any, icon:any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }


  // Methode pour valider l'inscription 
  validerInscription(){
    console.log(this.nom);
    console.log(this.prenom);
    console.log(this.email);
    console.log(this.password);
    console.log(this.passwordConf);

    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;

    if(this.nom == "" || this.prenom == "" || this.email == "" || this.password == "" || this.passwordConf == ""){
      // Vérifie si les champ ne sonts pas vide 
      this.verifierChamps("Erreur!", "Vueillez renseigner les champs", "error");
    }
    else if (!this.email.match(emailPattern)) {
      // Vérifie si le format de l'email est correct 
      this.verifierChamps("Erreur!", "Email invalide", "error");
    }
    else if (this.password.length < 5) {
      // Vérifie si la longueur du mot de passe est >=5
      this.verifierChamps("Erreur!", "Mot de passe doit être supérieur ou égal à 5", "error");
    }
    else if (this.password != this.passwordConf) {
      // Vérifie si les deux mots de passe sont iidentiques
      this.verifierChamps('Erreur!', 'Les deux mots de passe ne sont pas conforme', 'error');
    }
    else {
      let user = {
        idUser:  this.idLastUser + 1,
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        password:  this.password,
        contacts: []
      }
      this.verifierChamps('Felicitation!', 'Inscription reuissie', 'success');
    }
  }

  // Methode pour annuler l'inscription
  annulerInscription(){
    Swal.fire({
      title: "Etes-vous sur???",
      text: "Vous allez annuler votre inscription",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, j'annule!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.verifierChamps("Inscription annulée!", "", "success");     
        this.viderChamps();
      }
    });
    
    // 
  }
}



// Structure de notre tableau localstorage
  // users :any [] = [
  //   {
  //     idUser: 1,
  //     nom: "",
  //     prenom: "",
  //     email: "",
  //     password: "",
  //     contacts: []
  //   }
  // ]

  // // Structure du tableau contact 
  // contacts :any [] = [
  //   {
  //     idContact: 1,
  //     nomContact: "",
  //     prenomContact: "",
  //     emailContact: "",
  //     telephoneContact: "",
  //     descriptionContact: "",
  //     imageContact: "",
  //     etatContact:1,
  //     createAt: "",
  //     createBy: "",
  //     updateat: "",
  //     updateBy: "",
  //   }
  // ]