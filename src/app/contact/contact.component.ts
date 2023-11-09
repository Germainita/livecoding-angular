import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  // Déclaration des attriuts
  // Attribut qui stock le tableau de notre localstorage
  tabUsers:any;

  // Attribut qui stock l'utilisateur qui s'est connecté 
  userConnect:any;

  // Les attributs qui récupère les valeurs des champs pour ajouter un contact
  nom:String = "";
  prenom: String="";
  telephone:String="";
  email:String="";
  description:String="";
  imageUrl:String="";

  // Identifiant du dernier element du tableau contact 
  idLastContact: number = 0;

  // Le tableau qui contient la liste des contacts de l'utiliateur qui s'est connecté 
  tabContactsUser:any;

  // Définition du constructeur 
  constructor (private route: ActivatedRoute){}
  // Attribut qui permet de récupérer l'identifiant de celui qui s'est connecté 
  idUserConnect = this.route.snapshot.params['id'];

  

  // Declaration des méthodes 
  // Redifinition de la methode ngoninit 
  ngOnInit(): void {
    // On récupère le tableau d'objets dans le localstorage
    this.tabUsers = JSON.parse(localStorage.getItem("Users") || "[]");

    // On récupère l'objet qui s'est connecté 
    this.userConnect = this.tabUsers.find((element:any) => element.idUser == this.idUserConnect);
    console.log(this.userConnect);

    // On stock la liste des contacts dans le tableau 
    this.tabContactsUser = this.userConnect.contacts;
    console.log(this.tabContactsUser)

    if(this.tabContactsUser.length > 0){
      console.log(this.tabContactsUser.length);
      this.idLastContact = this.tabContactsUser[this.tabContactsUser.length -1].idContact;
    }

    console.log(this.idLastContact)
  }


  // Méthode pour afficher un sweetalert2 apres vérification 
  verifierChamps(title:any, text:any, icon:any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }

  // Methode ajout contact
  ajouterContact(){
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    // Premiere vérification avec sweetalert 
    if(this.nom == "" || this.prenom == "" || this.email == "" || this.telephone == "" || this.description == "" || this.imageUrl==""){
      this.verifierChamps("Erreur!", "Vueillez renseigner les champs", "error");
    }

    else if (!this.email.match(emailPattern)) {
      // Vérifie si le format de l'email est correct 
      this.verifierChamps("Erreur!", "Email invalide", "error");
    }
    else{
      // Création de l'objet contact 
      let contact = {
        idContact: this.idLastContact + 1,
        nomContact: this.nom,
        prenomContact: this.prenom,
        emailContact: this.email,
        telephoneContact: this.telephone,
        descriptionContact: this.description,
        imageContact: this.imageUrl,
        etatContact: 1,
        createAt: new Date(),
        createBy: this.userConnect.email,
        updateAt: "",
        updateBy: "",        
      }

      // On ajoute l'objet dans la liste des contacts
      this.tabContactsUser.push(contact);
      this.verifierChamps("Felicitation!", "Contact ajouté avec succes", "success");

      // console.log(this.userConnect);
      // On met à jour le tableau qui est stocké dans le localStorage 
      localStorage.setItem("Users", JSON.stringify(this.tabUsers));

      console.log(this.tabContactsUser);
      console.log(this.userConnect);
      console.log(this.tabUsers);
    }
  }
}



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