//========================Elements de la vue===============================

let checkboxNoms = document.getElementsByClassName("form-check-input");
let selectNombreJeux = document.getElementById("nombreJeux");
let selectTypesPartie = document.getElementById("typePartie");
let sectionResume = document.getElementById("sectionResume");
let sectionMain = document.getElementById("main");
let btnCreer = document.getElementById("creerMains");
let btnRevenirMain = document.getElementById("revenirMain");

let btnAfficherAndre = document.getElementById("btnAfficherAndre");
let sectionAndre = document.getElementById("sectionAndre");
let sectionTexteAndre = document.getElementById("texteAndre");

let btnAfficherJacques = document.getElementById("btnAfficherJacques");
let sectionJacques = document.getElementById("sectionJacques");
let sectionTexteJacques = document.getElementById("texteJacques");

let btnAfficherConrad = document.getElementById("btnAfficherConrad");
let sectionConrad = document.getElementById("sectionConrad");
let sectionTexteConrad = document.getElementById("texteConrad");

let btnAfficherPierreA = document.getElementById("btnAfficherPierreA");
let sectionPierreA = document.getElementById("sectionPierreA");
let sectionTextePierreA = document.getElementById("textePierreA");

let btnAfficherJP = document.getElementById("btnAfficherJeanPaul");
let sectionJP = document.getElementById("sectionJeanPaul");
let sectionTexteJP = document.getElementById("texteJeanPaul");

let btnAfficherJessy = document.getElementById("btnAfficherJessy");
let sectionJessy = document.getElementById("sectionJessy");
let sectionTexteJessy = document.getElementById("texteJessy");

let btnsRevenirResume = document.getElementsByClassName("revenirResume");

//let btnImprimerAndre = document.getElementById("imprimerAndre");

//let btnDownloadAndre = document.getElementById("downloadAndre");

//==================================Listeners pour affichage=================================

/*btnImprimerAndre.addEventListener("click", function(){
  window.print();
})
*/
/*
btnDownloadAndre.addEventListener("click", function(){
  alert("Dans le listener");
  genererPDF();
})
*/

/*function obtenirTextePage() {

  alert("Dans obtenirTextePage");
  var content = document.documentElement.innerText;
  download(content, "cartes", "txt")
  
}
function download(content, fileName, fileType) {
  alert("Dans download");
  var file = new Blob([content], {type: "txt"});
  var donwloadFile = fileName + "." + fileType;
  btnDownloadAndre.href = URL.createObjectURL(file);
  btnDownloadAndre.download = donwloadFile
}
*/

/*function genererPDF(){
  alert("Dans genererPDF");
  html2pdf().from(sectionAndre).save();
}
*/


window.addEventListener('load', 
  function() { 
     reinit();
  ;
})


btnRevenirMain.addEventListener("click", function(){
  window.location.reload(false);
})

btnAfficherAndre.addEventListener("click", function(){
  sectionMain.style.display = "none";
  sectionAndre.style.display = "block";
  sectionResume.style.display = "none";
      sectionTexteAndre.style.display = "block";

  document.getElementById("revenirResumeAndre").style.display = "block";
})

btnAfficherJacques.addEventListener("click", function(){
  
  sectionMain.style.display = "none";
  sectionJacques.style.display = "block";
  sectionResume.style.display = "none";
      sectionTexteJacques.style.display = "block";

  document.getElementById("revenirResumeJacques").style.display = "block";
})

btnAfficherConrad.addEventListener("click", function(){

    sectionMain.style.display = "none";
  sectionConrad.style.display = "block";
  sectionResume.style.display = "none";
      sectionTexteConrad.style.display = "block";

    document.getElementById("revenirResumeConrad").style.display = "block";

})

btnAfficherPierreA.addEventListener("click", function(){
    sectionMain.style.display = "none";
  sectionPierreA.style.display = "block";
  sectionResume.style.display = "none";
      sectionTextePierreA.style.display = "block";

    document.getElementById("revenirResumePierreA").style.display = "block";

})

btnAfficherJP.addEventListener("click", function(){
    sectionMain.style.display = "none";
  sectionJP.style.display = "block";
  sectionResume.style.display = "none";
      sectionTexteJP.style.display = "block";
    document.getElementById("revenirResumeJeanPaul").style.display = "block";

})

btnAfficherJessy.addEventListener("click", function(){

    sectionMain.style.display = "none";
    sectionJessy.style.display = "block";
    sectionResume.style.display = "none";
    sectionTexteJessy.style.display = "block";
    document.getElementById("revenirResumeJessy").style.display = "block";

})


//Gerer boutons Revenir au Resume
for (let i =0; i<btnsRevenirResume.length; i++) {
  btnsRevenirResume[i].addEventListener("click", function(){
    sectionMain.style.display = "none";
    sectionResume.style.display = "block";
    this.parentElement.style.display = "none";
    this.style.display = "none";
  })
}

function reinit(){
  for (let i= 0; i < checkboxNoms.length; i++){
         checkboxNoms[i].checked = false;
  };

  selectTypesPartie.value = "aucun";
  selectNombreJeux.value = "aucun";
}




//===========================================================================DEBUT AFFICHAGE =================================================




//Variables
let leType; 
let nombreJeux;
let partie;
let tableauJoueurs = new Array();
let tableauJeux;
let tableauToutesMains; //Un tableau de tableaux (le tableau contient des tableauDeMainsParJeu)


//Listeners pour les checkbox de joueurs 
for (let numBox = 0; numBox < checkboxNoms.length; numBox++){

  checkboxNoms[numBox].addEventListener("change", function(){

    let prenom = this.nextElementSibling.innerHTML;

    //Ajouter joueur sur box checked
    if (this.checked){
      ajouterJoueur(prenom, tableauJoueurs);
    }

    //Enlever joueur si box unchecked
    else{
      enleverJoueur(prenom, tableauJoueurs);
    }
  });
}


//Listener pour le Type de partie selectionne
 selectTypesPartie.addEventListener("change", function(){


  let QuatrePique = new TypePartie("Quatre de Pique");
let HautBas = new TypePartie("Haut et Bas");
    
    leType = assignerType(selectTypesPartie.value);

});

 //Listener pour le nombre de jeux desires
 selectNombreJeux.addEventListener("change", function(){
    
    nombreJeux = selectNombreJeux.value;

});


//=========BOUTON PRINCIPAL: Listener pour le bouton Creer
btnCreer.addEventListener("click", function(){
  
  //D'abord initialiser nos gros tableaux
  tableauJeux = new Array();
  tableauToutesMains = new Array();

  //S'assurer qu'au moins un joueur a ete coche
  let coche = false;
  for (let numBox = 0; numBox < checkboxNoms.length; numBox++){
    if (checkboxNoms[numBox].checked)  coche = true;
  }

  if (!coche){
    alert("Cocher les joueurs pour la partie");
    return;
  }

  //S'assurer qu'une partie et un nombre de jeux ont ete selectionnes
  if (selectTypesPartie.value == "aucun"){
    alert("Veuillez choisir un type de partie dans la liste");
    return;
  }

  if (selectNombreJeux.value == "aucun"){
      alert("Veuillez choisir un nombre de jeux dans la liste");
      return;
  }

  partie = creerPartie(leType, nombreJeux, tableauJoueurs);

  afficherEnTete(partie);

  tableauJeux = creerJeux(partie);

  //Grande boucle pour notre tableau de tableau (pour les mains)
  for (let jeu=0; jeu < tableauJeux.length; jeu++){
    //Pour chaque tableau de mains par jeu, on pousse ce tableau de main dans notre grand tableau de toutes le mains
    tableauToutesMains.push(creerMainsParJeu(tableauJeux[jeu]));
  }


  afficherDetailsJeu(tableauToutesMains);

  //Afficher les sections par Joueur
  for (let i=0; i<tableauJoueurs.length; i++){

    if (tableauJoueurs[i].prenom == "Conrad"){
        btnAfficherConrad.style.display = "block";

      
      //sectionConrad.style.display = "block";
      //sectionTexteConrad.style.display = "block";
    }

    else if (tableauJoueurs[i].prenom == "Jessy"){
        btnAfficherJessy.style.display = "block";

      //sectionJessy.style.display = "block";
     // sectionTexteJessy.style.display = "block";
    }

    else if (tableauJoueurs[i].prenom == "Pierre-A"){
            btnAfficherPierreA.style.display = "block";

      //sectionPierreA.style.display = "block";
      //sectionTextePierreA.style.display = "block";
    }
    else if (tableauJoueurs[i].prenom == "Jean-Paul"){
            btnAfficherJP.style.display = "block";

      //sectionJP.style.display = "block";
      //sectionTexteJP.style.display = "block";

    }
    else if (tableauJoueurs[i].prenom == "Jacques"){
            btnAfficherJacques.style.display = "block";

      //sectionJacques.style.display = "block";
     // sectionTexteJacques.style.display = "block";

    }
    else if (tableauJoueurs[i].prenom == "Andre"){
      btnAfficherAndre.style.display = "block";
      //sectionAndre.style.display = "block";
      //sectionTexteAndre.style.display = "block";
    }
  }

   
    
  sectionResume.style.display = "block";
  sectionMain.style.display = "none";
  btnRevenirMain.style.display = "block";
  
});



function afficherEnTete(Partie){

  let joueurs = Partie.joueurs;
  let texteEnTete = "";

  //Affichage des infos de la partie pour chaque joueur
  for (let joueur=0; joueur < joueurs.length; joueur++){

      //Afficher cette main dans la section du joueur
      texteEnTete += "<h2 style='text-align: center;' >Partie de " + Partie.TypePartie.nom +  "</h2>"; 
      texteEnTete += "<h3 style='text-align: center;'>" + joueurs.length + " joueurs et " + Partie.nombreJeux + " jeux</h3>";
      texteEnTete += "<h4 style='text-align: center;'> Ordre des brasseurs: &nbsp&nbsp";

      for (let i=0; i<joueurs.length; i++){
        texteEnTete += "("+ (i+1)+ ")&nbsp"+ joueurs[i].prenom;
        if (i < joueurs.length-1){
          texteEnTete += " ; "
        }
      }
      texteEnTete += "</h4><br><br>";
    

      if (joueurs[joueur].prenom == "Conrad"){
        sectionTexteConrad.innerHTML = texteEnTete;
      }
      else if (joueurs[joueur].prenom == "Jessy"){
        sectionTexteJessy.innerHTML = texteEnTete;

      }
      else if (joueurs[joueur].prenom == "Pierre-A"){
        sectionTextePierreA.innerHTML = texteEnTete;
      }
      else if (joueurs[joueur].prenom == "Jean-Paul"){

        sectionTexteJP.innerHTML = texteEnTete;

      }
      else if (joueurs[joueur].prenom == "Jacques"){
        sectionTexteJacques.innerHTML = texteEnTete;

      }
      else if (joueurs[joueur].prenom == "Andre"){
         sectionTexteAndre.innerHTML = texteEnTete;
      }

      texteEnTete = "";
    }

}



function afficherDetailsJeu(tableauPrincipal){

  let detailsMains = "";

  let compteur = 0;

  //======================PREMIERE LIGNE: DETAILS DU JEU==============================
  //Pour chaque jeu
  for (let tabMains =0; tabMains<tableauPrincipal.length; tabMains++){

    //Pour chaque main associee a ce jeu (.i.e. pour chaque joueur du jeu)
    for (let main=0; main < tableauPrincipal[tabMains].length; main++){


          let laMain = tableauPrincipal[tabMains][main];
          let joueurs = tableauPrincipal[tabMains][main].Jeu.Partie.joueurs;

          detailsMains += "____________________________________________________________________________________________________________________<br><br>";
        
          //Premiere ligne, avec les details du Jeu
          detailsMains += "<span style='font-size: 1.5rem; border: 2px dotted blue; padding: 2px;'>Jeu  #" +laMain.Jeu.numeroJeu + "</span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + laMain.Jeu.nbrCartesParJoueurs + " cartes&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
          
          if (laMain.Jeu.Partie.TypePartie.nom == "Wizzard"){
              detailsMains +=  "<span style='color: red; font-style: italic;'> Atout : " + trouverCarte(laMain.Jeu.atout, Wizzard=true) + "</span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
          }
          else if (laMain.Jeu.Partie.TypePartie.nom == "Barouette"){
              detailsMains +=  "<span style='color: red; font-style: italic;'> Atout : " + trouverCarte(laMain.Jeu.atout) + "</span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
          }

          if (laMain.Jeu.numeroJeu <= joueurs.length){
              detailsMains += "Brasseur : " + joueurs[laMain.Jeu.numeroJeu-1].prenom + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
          }
          else{
              detailsMains += "Brasseur : À déterminer&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
          }
          
          detailsMains += "Il reste " + cartesRestantes(laMain.Jeu.Partie.TypePartie.nom, joueurs.length, laMain.Jeu.numeroJeu) + " cartes";

          //Specifier les cartes enlevees s'il y a seulement 4 joueurs
          if (joueurs.length == 4){

            detailsMains += "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Cartes enlevées : ";
            
            if (laMain.Jeu.Partie.TypePartie.nom == "Barouette" || laMain.Jeu.Partie.TypePartie.nom == "Haut et Bas"){
              detailsMains += "2, 3 et 4<br><br>";
            }
            else if (laMain.Jeu.Partie.TypePartie.nom == "Wizzard"){
              detailsMains += "3, 4 et 5<br><br>";
            }
            else if (laMain.Jeu.Partie.TypePartie.nom == "Quatre de Pique"){
              detailsMains += "2, 3 et 5<br><br>";
            }

          //Si le nombre de joueur n'est pas 4:
          }
          else{
            detailsMains += "<br><br>";
          }



    //======================DEUXIEME LIGNE: DETAILS DE LA MAIN==============================




          //Nombre de Jester par main (pour le Wizzard)
          let compteurJesters = 0;

          //Deuxieme ligne avec les cartes de la main
          detailsMains += "<img src='Images/pique.jpg' width='30px'>";

          //Parcourir les cartes de la main pour afficher le Pique
          for (let i=0; i< laMain.cartes.length; i++){

            if (laMain.cartes[i] < 26){

              if (laMain.Jeu.Partie.TypePartie.nom == "Wizzard" && verifier2(laMain.cartes[i]) == true){

                  compteurJesters++;
              }
              else{

                detailsMains += trouverPique(laMain.cartes[i]) + "&nbsp&nbsp";
              }
            }
          }

          detailsMains += "&nbsp&nbsp&nbsp&nbsp<img src='Images/coeur.png' width='40px'>";


          //Parcourir les cartes de la main pour afficher le Coeur
          for (let i=0; i< laMain.cartes.length; i++){

            if (laMain.cartes[i] > 25 && laMain.cartes[i] < 52){
              
              if (laMain.Jeu.Partie.TypePartie.nom == "Wizzard" && verifier2(laMain.cartes[i]) == true){

                  compteurJesters++;
              }
              else{

                detailsMains += trouverCoeur(laMain.cartes[i]) + "&nbsp&nbsp";
              }
            }
          }

          detailsMains += "&nbsp&nbsp&nbsp&nbsp<img src='Images/trefle.png' width='40px'> ";


          //Parcourir les cartes de la main pour afficher le Trefle
          for (let i=0; i< laMain.cartes.length; i++){
            if (laMain.cartes[i] > 51 && laMain.cartes[i] < 78){
              if (laMain.Jeu.Partie.TypePartie.nom == "Wizzard" && verifier2(laMain.cartes[i]) == true){

                  compteurJesters++;
              }
              else{
                detailsMains += trouverTrefle(laMain.cartes[i]) + "&nbsp&nbsp";
              }
            }
          }
          
          detailsMains += "&nbsp&nbsp&nbsp&nbsp<img src='Images/carreau.jpeg' width='50px'>";

          //Parcourir les cartes de la main pour afficher le Carreau
          for (let i=0; i< laMain.cartes.length; i++){
            if (laMain.cartes[i] > 77 && laMain.cartes[i] < 104){
              if (laMain.Jeu.Partie.TypePartie.nom == "Wizzard" && verifier2(laMain.cartes[i]) == true){

                  compteurJesters++;
              }
              else{
                detailsMains += trouverCarreau(laMain.cartes[i]) + "&nbsp&nbsp";
              }
            }
          }


          //Parcourir les cartes de la main pour afficher les Jokers
          let compteurJokers = 0;
          for (let i=0; i<laMain.cartes.length; i++){
            if (laMain.cartes[i] == 104 || laMain.cartes[i] == 105){
              compteurJokers++;
            }
          }

          if (laMain.Jeu.Partie.TypePartie.nom != "Wizzard"){

              detailsMains += "<strong>&nbsp&nbsp&nbsp&nbsp Joker</strong>:  ";
              detailsMains += compteurJokers;
          }

          //Parcourir les cartes de la main pour afficher les Blanches
          let compteurBlanches = 0;
          for (let i=0; i< laMain.cartes.length; i++){
            if (laMain.cartes[i] == 106 || laMain.cartes[i] == 107){
              compteurBlanches++;
            }
          }

          if (laMain.Jeu.Partie.TypePartie.nom != "Wizzard"){
              detailsMains += "<strong>&nbsp&nbsp&nbsp&nbspBlanche</strong>:  ";
              detailsMains += compteurBlanches + "<br><br>";
          }

          //Ajouter la section pour Wizzard (i.e. info sur nombre de Jesters et de Wizzards)
          if (laMain.Jeu.Partie.TypePartie.nom == "Wizzard"){
              detailsMains += "<strong>&nbsp&nbsp&nbsp&nbsp Jester</strong>:  ";
              detailsMains += compteurJesters;
              detailsMains += "<strong>&nbsp&nbsp&nbsp&nbsp Wizzard</strong>:  ";
              detailsMains += (compteurBlanches + compteurJokers) + "<br><br>";
          }




        //==============REMPLIR LE TEXTE POUR LA SECTION DU JOUEUR===================

          if (laMain.Joueur.prenom == "Conrad"){
                  
            sectionTexteConrad.innerHTML += detailsMains;
          }

          else if (laMain.Joueur.prenom == "Jessy"){

            sectionTexteJessy.innerHTML += detailsMains;
          }

          else if (laMain.Joueur.prenom == "Pierre-A"){

            sectionTextePierreA.innerHTML += detailsMains;
          }
          else if (laMain.Joueur.prenom == "Jean-Paul"){
            sectionTexteJP.innerHTML += detailsMains;

          }
          else if (laMain.Joueur.prenom == "Jacques"){
            sectionTexteJacques.innerHTML += detailsMains;

          }
          else if (laMain.Joueur.prenom == "Andre"){
            sectionTexteAndre.innerHTML += detailsMains;
          }

          detailsMains = "";
        
    }
  }
}