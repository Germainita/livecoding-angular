import { Component , OnInit } from '@angular/core';
import {User} from '../model/user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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

  // Variables pour faire la vérifications
  verifNom : String  =  "";
  verifPrenom : String = "";
  verifEmail : String = "";
  verifPassword : String = "";
  verifPasswordConf : String = "";

  // Variables si les champs sont exacts
  exactNom : boolean = false;
  exactPrenom : boolean = false;
  exactEmail : boolean = false;
  exactPassword : boolean = false;
  exactPasswordConf : boolean = false;



  // On fait appel au constructeur 
  constructor(private route : Router){}

  // Notre tableau d'objets utilisateurs récupéré à partir du localstorage
  tabUsers : any;
  idLastUser: number = 0;

  // Utilisateur trouvé 
  userFound:any;

  // Variable pour la connexion 
  emailCon : String = "";
  passwordCon: String = "";

  // Pour vérifier les champs pour la connexion 
  verifEmailCon : String = "";
  verifPasswordCon: String = "";

  // Variables Si les valeurs sont exactes
  exactEmailCon : boolean = false;
  exactPasswordCon : boolean = false; 


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
    // On vide les valeurs des champs input 
    this.nom = "";
    this.prenom = "";
    this.email = "";
    this.password = "";
    this.passwordConf = "";

    // On vide les Variables qui permettent de faire la vérifications
    this.verifNom = "";
    this.verifPrenom = "";
    this.verifEmail = "";
    this.verifPassword = "";
    this.verifPasswordConf = "";

    // On vide les variables qui vérifient si les champs sont exacts
    this.exactNom = false;
    this.exactPrenom = false;
    this.exactEmail = false;
    this.exactPassword = false;
    this.exactPasswordConf = false;
  }

  // Méthode pour afficher un sweetalert2 apres vérification 
  verifierChamps(title:any, text:any, icon:any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }

  // Verification du nom
  verifNomFonction() {
    this.exactNom = false;
    if(this.nom == ""){
      this.verifNom = "Veuillez renseigner votre nom";
    }
    else if (this.nom.length < 2 ){
      this.verifNom = "Le nom est trop court";
    }
    else {
      this.verifNom = "";
      this.exactNom = true;
    }
  }

  // Verification du prenom 
  verifPrenomFonction() {
    this.exactPrenom = false;
    if(this.prenom == ""){
      this.verifPrenom = "Veuillez renseigner votre prenom";
    }
    else if (this.prenom.length < 3 ){
      this.verifPrenom = "Le prenom est trop court";
      
    }
    else{
      this.verifPrenom = "";
      this.exactPrenom = true;
    }
  }

  // Verification de  l'email 
  verifEmailFonction(){
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
    this.exactEmail = false;
    
    if(this.email == ""){
      this.verifEmail = "Veuillez renseigner votre email";
    }
    else if (!this.email.match(emailPattern) ){
      this.verifEmail = "Veuillez donner un email valide";
    }
    else {
      this.verifEmail = "";
      this.exactEmail = true;
    }
  }


  // Verification du mot de passe 
  verifPasswordFonction(){
    this.exactPassword = false;
    if(this.password == ""){
      this.verifPassword = "Veuillez renseigner votre mot de passe";
    }
    else if (this.password.length < 5 ){
      this.verifPassword = "Mot de passe doit être supérieur ou égal à 5";
    }
    else{
      this.verifPassword = "";
      this.exactPassword = true;
    }
  }

  
  // Verification du mot de passe confirmé
  verifPasswordConfFonction(){
    this.exactPasswordConf = false;
    if(this.passwordConf == ""){
      this.verifPasswordConf = "Veuillez renseigner à nouveau votre mot de passe";
    }
    else if (this.password != this.passwordConf){
      this.verifPasswordConf = "Les deux mots de passe ne sont pas conformes";
    }
    else {
      this.verifPasswordConf = "";
      this.exactPasswordConf = true;
    }
  }


  // Methode pour valider l'inscription 
  validerInscription(){
    // On fait appel au méthode qui permettent de vérifier les champs 
    this.verifEmailFonction();
    this.verifNomFonction();
    this.verifPrenomFonction();
    this.verifPasswordFonction();
    this.verifPasswordConfFonction();

    // Si les champs sont exacts, on ajoute le compte dans le tableau localStorage
    if(this.exactNom && this.exactPrenom && this.exactEmail && this.exactPassword && this.exactPasswordConf){
      let user = {
        idUser:  this.idLastUser + 1,
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        password:  this.password,
        contacts: []
      }
      let userExist = this.tabUsers.find((elemt:any)=> elemt.email == this.email);

      if (userExist){
        // Est executé que si l'on trouve un compte avce le meme email que celui qui a été renseigné
        this.verifierChamps('Erreur!', 'Cet email est déjà utilisé', 'error');
      }
      else {
        // On crée le compte 
        this.tabUsers.push(user);
        localStorage.setItem("Users", JSON.stringify(this.tabUsers));
        this.verifierChamps('Felicitation!', 'Inscription reuissie', 'success');
        this.viderChamps();
      }
    }

    // Premiere vérification avec sweetalert 
    // if(this.nom == "" || this.prenom == "" || this.email == "" || this.password == "" || this.passwordConf == ""){
    //   // Vérifie si les champ ne sonts pas vide 
    //   this.verifierChamps("Erreur!", "Vueillez renseigner les champs", "error");
    // }
    // else if (!this.email.match(emailPattern)) {
    //   // Vérifie si le format de l'email est correct 
    //   this.verifierChamps("Erreur!", "Email invalide", "error");
    // }
    // else if (this.password.length < 5) {
    //   // Vérifie si la longueur du mot de passe est >=5
    //   this.verifierChamps("Erreur!", "Mot de passe doit être supérieur ou égal à 5", "error");
    // }
    // else if (this.password != this.passwordConf) {
    //   // Vérifie si les deux mots de passe sont iidentiques
    //   this.verifierChamps('Erreur!', 'Les deux mots de passe ne sont pas conforme', 'error');
    // }

    // Vérification champs par champs
    // if(this.nom == "" && this.prenom == "" && this.email == "" && this.password == "" && this.passwordConf == "") {
    //   this.verifNom = "Veuillez renseigner votre nom";
    //   this.verifPrenom = "Veuillez renseigner votre prenom";
    //   this.verifEmail = "Veuillez renseigner votre email";
    //   this.verifPassword = "Veuillez renseigner votre mot de passe";
    //   this.verifPasswordConf = "Veuillez renseigner à nouveau votre mot de passe";
    // }
    // Verification du nom 
    
    
    

    // else {
    //   // On vide les champs de vérifications 
    //   this.verifNom = "";
    //   this.verifPrenom = "";
    //   this.verifEmail = "";
    //   this.verifPassword = "";
    //   this.verifPasswordConf = "";
    //   let user = {
    //     idUser:  this.idLastUser + 1,
    //     nom: this.nom,
    //     prenom: this.prenom,
    //     email: this.email,
    //     password:  this.password,
    //     contacts: []
    //   }
    //   let userExist = this.tabUsers.find((elemt:any)=> elemt.email == this.email);
    //   // Avant insertion: 
    //   console.log(this.tabUsers);

    //   if (userExist){
    //     // Est executé que si l'on trouve un compte avce le meme email que celui qui a été renseigné
    //     this.verifierChamps('Erreur!', 'Cet email est déjà utilisé', 'error');
    //   }
    //   else {
    //     // On crée le compte 
    //     this.tabUsers.push(user);
    //     localStorage.setItem("Users", JSON.stringify(this.tabUsers));
    //     this.verifierChamps('Felicitation!', 'Inscription reuissie', 'success');
    //     this.viderChamps();
    //   }
    // }
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

  // Methode pour se connecter 
  connexion(){
    if(this.tabUsers.length == 0){
      this.verifierChamps("Oups!", "Le compte n'exite pas", "error"); 
    }
    else{
    // else if (this.exactEmail && this.exactPassword){
      // Retourne un objet s'il trouve dans le tableau tabUser un element qui a le meme email et le 
      // meme mot de passe que ce qui a été saisi par l'utilisateur 
      this.userFound = this.tabUsers.find((element:any) => element.email == this.email && element.password == this.password);

      if(this.userFound){
        // Le compte existe 
        this.verifierChamps("Félicitation!", "Authentifié avec succes", "success"); 
        this.viderChamps(); 
        // this.route.navigate()
        this.route.navigate(['contact', this.userFound.idUser]);
      }
      else{
        this.verifierChamps("Oups!", "Le compte n'exite pas", "error");  
      }
    }
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