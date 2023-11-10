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

  //valeur du filter qui correspond a celui du champs recherche
  filterValue = '';

  //les element trouver
  filteredElement:any;

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
    this.filteredElement = this.tabContactsUser;
    
  }

  // Methode de recherche automatique 
  onSearch(){
    // Recherche se fait selon le nom ou le prenom 
    this.filteredElement = this.tabContactsUser.filter(
      (elt:any) => (elt?.nomContact.toLowerCase().includes(this.filterValue.toLowerCase())) || elt?.prenomContact.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }


  // Méthode pour afficher un sweetalert2 apres vérification 
  verifierChamps(title:any, text:any, icon:any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }

  // Methode pour vider les champs 
  viderChapmsContact(){
    this.nom = "",
    this.prenom = "",
    this.email = "",
    this.telephone = "",
    this.description = "",
    this.imageUrl = ""
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
      // On vérifie si le tableau n'est pas vide 
      if(this.tabContactsUser.length){
        console.warn("taille du tab");
        this.idLastContact = this.tabContactsUser[this.tabContactsUser.length -1].idContact;
        console.log(this.idLastContact)
      }
      else {
        this.idLastContact = 0;
        console.warn("idLastUser = 0")
      }
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
      console.log(this.idLastContact);
      this.tabContactsUser.push(contact);

      // Ferme le popup si on click sur Ok 
      Swal.fire({
        title: "Felicitation!",
        text: "Contact créé avec succes",
        icon: "success",
      });
      // On vide les champs 
      this.viderChapmsContact();
      // On met à jour le tableau qui est stocké dans le localStorage 
      localStorage.setItem("Users", JSON.stringify(this.tabUsers));

      console.log(this.tabContactsUser);
      console.log(this.userConnect);
      console.log(this.tabUsers);
    }
  }

  // Methode supprimer contact 
  supprimerContact(paramContact:any){
    Swal.fire({
      title: "Etes-vous sur???",
      text: "Vous allez supprimer le contact",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, je supprime!"
    }).then((result) => {
      if (result.isConfirmed) {
        paramContact.etatContact = 0;
        // On met à jour le tableau qui est stocké dans le localStorage 
        localStorage.setItem("Users", JSON.stringify(this.tabUsers));
        this.verifierChamps("Contact supprimer!", "", "success");     
        
      }
    });
    // alert(paramContact.etatContact);
    
  }

  // Methode pour restaure le contact 
  restaurerContact(paramContact:any){
    Swal.fire({
      title: "Etes-vous sur???",
      text: "Vous allez restaurer le contact",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, je restaure!"
    }).then((result) => {
      if (result.isConfirmed) {
        paramContact.etatContact = 1;
        // On met à jour le tableau qui est stocké dans le localStorage 
        localStorage.setItem("Users", JSON.stringify(this.tabUsers));
        this.verifierChamps("Contact restauré!", "", "success");     
        
      }
    });
  }

  // Methode pour supprimer définitivement un contact 
  supprimerContactDefinitif(paramContact:any){
    Swal.fire({
      title: "Etes-vous sur???",
      text: "Vous allez supprimer définitivement contact",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, je supprime!"
    }).then((result) => {
      if (result.isConfirmed) {
        paramContact.etatContact = -1;
        // On met à jour le tableau qui est stocké dans le localStorage 
        localStorage.setItem("Users", JSON.stringify(this.tabUsers));
        this.verifierChamps("Contact restauré!", "", "success");     
        
      }
    });
  }

  // Methode pour supprimer vider la corbeille
  viderCorbeille(){
    Swal.fire({
      title: "Etes-vous sur???",
      text: "Vous allez vider la corbeille",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, je vide!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.tabContactsUser.forEach((element:any) => {
          if(element.etatContact == 0){
            element.etatContact = -1;
            // On met à jour le tableau qui est stocké dans le localStorage 
            localStorage.setItem("Users", JSON.stringify(this.tabUsers));
            this.verifierChamps("Contact restauré!", "", "success");     
          }
        });
        // paramContact.etatContact = -1;
        
        
      }
    });

    
  }

  // Variable qui stockera le contact cliqué
  currentContact: any;
  // Methode pour charger les informations à modifier 
  chargerInfosContact(paramContact:any){
    this.currentContact = paramContact;
    this.nom = paramContact.nomContact;
    this.prenom = paramContact.prenomContact;
    this.email = paramContact.emailContact;
    this.telephone = paramContact.telephoneContact;
    this.description = paramContact.descriptionContact;
    this.imageUrl = paramContact.imageContact;
  }

  // Methode pour modifier le contact
  modifierContact(){
    this.currentContact.nomContact = this.nom;
    this.currentContact.prenomContact = this.prenom;
    this.currentContact.emailContact = this.email;
    this.currentContact.telephoneContact = this.telephone;
    this.currentContact.descriptionContact = this.description;
    this.currentContact.imageContact = this.imageUrl;
    
    // La date de derniere modification
    this.currentContact.updateAt = new Date();
    // La personne qui a modifier le contact
    this.currentContact.updateBy = this.userConnect.email; 
    
    // On met à jour le tableau qui est stocké dans le localStorage 
    localStorage.setItem("Users", JSON.stringify(this.tabUsers));
    this.verifierChamps("Mofication réussie!", "", "success"); 
    this.viderChapmsContact();
  } 
 

  // On affiche soit la liste des contacts soit les contacts de la corbeille 
  listChoice : boolean = true;

  listeChoiceFunction(){
    this.listChoice = !this.listChoice;
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