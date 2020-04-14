//Creer un jeu
function Jeu(Partie, numeroJeu, nbrCartesParJoueurs){
  this.Partie = Partie;
  this.numeroJeu = numeroJeu;
  this.cartes = Array.from(new Array(108), (x, i) => i);
  this.atout = null;
  this.nbrCartesParJoueurs = nbrCartesParJoueurs;

  let nbrJoueurs = this.Partie.joueurs.length;
  let typePartie = this.Partie.TypePartie.nom;



  //****MODIFIER LES CARTES DU JEU EN FONCTION DU TYPE DE JEU ET DU NOMBRE DE JOUEUR

  //Enlever des cartes si on joue a 4
  //NOTE: Il faut 3 boucles pour ne pas manquer aucune carte
  if (nbrJoueurs == 4){

    //Haut et Bas ou Barouette = enlever 2, 3 et 4
    if (typePartie == "Haut et Bas" || typePartie == "Barouette"){

      let compteurRetirees = 0;
      let txtAfficher = "";

      for (let i=0; i<this.cartes.length; i++){

          if (verifier2(this.cartes[i]) == true || verifier3(this.cartes[i]) == true || verifier4(this.cartes[i]) == true){
            txtAfficher += this.cartes[i] + ", ";
              this.cartes.splice(i, 1);
              compteurRetirees++;

          }
      }
      for (let i=0; i<this.cartes.length; i++){

          if (verifier2(this.cartes[i]) == true || verifier3(this.cartes[i]) == true || verifier4(this.cartes[i]) == true){
            txtAfficher += this.cartes[i] + ", ";
              this.cartes.splice(i, 1);
              compteurRetirees++;

          }
      }

      for (let i=0; i<this.cartes.length; i++){

          if (verifier2(this.cartes[i]) == true || verifier3(this.cartes[i]) == true || verifier4(this.cartes[i]) == true){
            txtAfficher += this.cartes[i] + ", ";
              this.cartes.splice(i, 1);
              compteurRetirees++;

          }
      }
    }

    //Wizzard = enlever 3, 4 et 5
    else if (typePartie == "Wizzard"){

      let compteurRetirees = 0;
      let txtAfficher = "";

      for (let i=0; i<this.cartes.length; i++){

          if (verifier3(this.cartes[i]) == true || verifier4(this.cartes[i]) == true || verifier5(this.cartes[i]) == true){
            txtAfficher += this.cartes[i] + ", ";
              this.cartes.splice(i, 1);
              compteurRetirees++;

          }
      }
      for (let i=0; i<this.cartes.length; i++){

          if (verifier3(this.cartes[i]) == true || verifier4(this.cartes[i]) == true || verifier5(this.cartes[i]) == true){
            txtAfficher += this.cartes[i] + ", ";
              this.cartes.splice(i, 1);
              compteurRetirees++;

          }
      }

      for (let i=0; i<this.cartes.length; i++){

          if (verifier3(this.cartes[i]) == true || verifier4(this.cartes[i]) == true || verifier5(this.cartes[i]) == true){
            txtAfficher += this.cartes[i] + ", ";
              this.cartes.splice(i, 1);
              compteurRetirees++;

          }
      }
    }

    //Quatre de Pique = enlever 2, 3 et 5
    else if (typePartie == "Quatre de Pique"){

      let compteurRetirees = 0;
      let txtAfficher = "";

      for (let i=0; i<this.cartes.length; i++){

          if (verifier2(this.cartes[i]) == true || verifier3(this.cartes[i]) == true || verifier5(this.cartes[i]) == true){
            txtAfficher += this.cartes[i] + ", ";
              this.cartes.splice(i, 1);
              compteurRetirees++;

          }
      }
      for (let i=0; i<this.cartes.length; i++){

          if (verifier2(this.cartes[i]) == true || verifier3(this.cartes[i]) == true || verifier5(this.cartes[i]) == true){
            txtAfficher += this.cartes[i] + ", ";
              this.cartes.splice(i, 1);
              compteurRetirees++;

          }
      }

      for (let i=0; i<this.cartes.length; i++){

          if (verifier2(this.cartes[i]) == true || verifier3(this.cartes[i]) == true || verifier5(this.cartes[i]) == true){
            txtAfficher += this.cartes[i] + ", ";
              this.cartes.splice(i, 1);
              compteurRetirees++;

          }
      }
    }
  }
  

  //ATOUT
  //Si Wizzard, attriuber l'atout puis retirer la carte du jeu SIIIII on joue a 5 (sinon garder la carte)
  if (typePartie == "Wizzard"){
    //Wizzard avec 5 joueurs
    if (this.Partie.joueurs.length == 5) this.atout = this.cartes.splice(Math.floor(Math.random() * this.cartes.length), 1);
    //Wizzard avec plus ou moins que 5 joueurs
    else this.atout = Math.floor(Math.random() * this.cartes.length);
  }

  //Si c'est la Barouette, assigner un atout sans enlever de cartes
  else if (typePartie == "Barouette"){
    this.atout = Math.floor(Math.random() * this.cartes.length);
  } 
}




//Fonctions de recherche de cartes
function trouverPique(chiffre){

    if (chiffre == 0 || chiffre == 1) return '2';
    else if (chiffre == 2 || chiffre == 3) return '3';
    else if (chiffre == 4 || chiffre == 5) return '4';
    else if (chiffre == 6 || chiffre == 7) return '5';
    else if (chiffre == 8 || chiffre == 9) return '6';
    else if (chiffre == 10 || chiffre == 11) return '7';
    else if (chiffre == 12 || chiffre == 13) return '8';
    else if (chiffre == 14 || chiffre == 15) return '9';
    else if (chiffre == 16 || chiffre == 17) return '10';
    else if (chiffre == 18 || chiffre == 19) return 'V';
    else if (chiffre == 20 || chiffre == 21) return 'D';
    else if (chiffre == 22 || chiffre == 23) return 'R';
    else if (chiffre == 24 || chiffre == 25) return 'A';
    return '0';
}

function trouverCoeur(chiffre){
    if (chiffre -26 == 0 || chiffre -26 == 1) return '2';
    else if (chiffre -26 == 2 || chiffre -26 == 3) return '3';
    else if (chiffre -26 == 4 || chiffre -26 == 5) return '4';
    else if (chiffre -26 == 6 || chiffre -26 == 7) return '5';
    else if (chiffre -26 == 8 || chiffre -26 == 9) return '6';
    else if (chiffre -26 == 10 || chiffre -26 == 11) return '7';
    else if (chiffre -26 == 12 || chiffre -26 == 13) return '8';
    else if (chiffre -26 == 14 || chiffre -26 == 15) return '9';
    else if (chiffre -26 == 16 || chiffre -26 == 17) return '10';
    else if (chiffre -26 == 18 || chiffre -26 == 19) return 'V';
    else if (chiffre -26 == 20 || chiffre -26 == 21) return 'D';
    else if (chiffre -26 == 22 || chiffre -26 == 23) return 'R';
    else if (chiffre -26  == 24 || chiffre -26 == 25) return 'A';
    return '0';

}

function trouverTrefle(chiffre){
    if (chiffre -52 == 0 || chiffre -52 == 1) return '2';
    else if (chiffre -52 == 2 || chiffre -52 == 3) return '3';
    else if (chiffre -52 == 4 || chiffre -52 == 5) return '4';
    else if (chiffre -52 == 6 || chiffre -52 == 7) return '5';
    else if (chiffre -52 == 8 || chiffre -52 == 9) return '6';
    else if (chiffre -52 == 10 || chiffre -52 == 11) return '7';
    else if (chiffre -52 == 12 || chiffre -52 == 13) return '8';
    else if (chiffre -52 == 14 || chiffre -52 == 15) return '9';
    else if (chiffre -52 == 16 || chiffre -52 == 17) return '10';
    else if (chiffre -52 == 18 || chiffre -52 == 19) return 'V';
    else if (chiffre -52 == 20 || chiffre -52 == 21) return 'D';
    else if (chiffre -52 == 22 || chiffre -52 == 23) return 'R';
    else if (chiffre -52  == 24 || chiffre -52 == 25) return 'A';
    return '0';

}

function trouverCarreau(chiffre){
    if (chiffre -78 == 0 || chiffre -78 == 1) return '2';
    else if (chiffre -78 == 2 || chiffre -78 == 3) return '3';
    else if (chiffre -78 == 4 || chiffre -78 == 5) return '4';
    else if (chiffre -78 == 6 || chiffre -78 == 7) return '5';
    else if (chiffre -78 == 8 || chiffre -78 == 9) return '6';
    else if (chiffre -78 == 10 || chiffre -78 == 11) return '7';
    else if (chiffre -78 == 12 || chiffre -78 == 13) return '8';
    else if (chiffre -78 == 14 || chiffre -78 == 15) return '9';
    else if (chiffre -78 == 16 || chiffre -78 == 17) return '10';
    else if (chiffre -78 == 18 || chiffre -78 == 19) return 'V';
    else if (chiffre -78 == 20 || chiffre -78 == 21) return 'D';
    else if (chiffre -78 == 22 || chiffre -78 == 23) return 'R';
    else if (chiffre -78  == 24 || chiffre -78 == 25) return 'A';
    return '0';
}

function trouverCarte(chiffre, Wizzard=false){

    if (Wizzard == true){
      if (verifier2(chiffre)==true) return "Jester";
      
      if (chiffre >= 104) return "Wizzard";
    }

    if (chiffre < 26){

      return "Pique (" + trouverPique(chiffre) + ")";
    }

    if (chiffre > 25 && chiffre < 52){
      return "Coeur (" + trouverCoeur(chiffre) + ")";
    }
  
    if (chiffre > 51 && chiffre < 78){
      return "Trèfle (" + trouverTrefle(chiffre) + ")";
    }
  
    if (chiffre > 77 && chiffre < 104){
      return "Carreau (" + trouverCarreau(chiffre) + ")";
    }
  
    if (chiffre == 104 || chiffre == 105){
      return "Joker";
    }
  

    if (chiffre == 106 || chiffre == 107){
      return "Blanche";
    }
          
  return 0;
}

function verifier2(chiffre){
  if (chiffre == 0 || chiffre == 1 || chiffre == 26 || chiffre == 27 || chiffre == 52 || chiffre == 53 || chiffre == 78 || chiffre == 79){
    return true;
  }

  return false;
}

function verifier3(chiffre){
  if (chiffre == 2 || chiffre == 3 || chiffre == 28 || chiffre == 29 || chiffre == 54 || chiffre == 55 || chiffre == 80 || chiffre == 81){
    return true;
  }

  return false;
}

function verifier4(chiffre){
  if (chiffre == 4 || chiffre == 5 || chiffre == 30 || chiffre == 31 || chiffre == 56 || chiffre == 57 || chiffre == 82 || chiffre == 83){
    return true;
  }

  return false;
}

function verifier5(chiffre){
  if (chiffre == 6 || chiffre == 7 || chiffre == 32 || chiffre == 33 || chiffre == 58 || chiffre == 59 || chiffre == 84 || chiffre == 85){
    return true;
  }

  return false;
}


function cartesRestantes(typePartie, nbrJoueurs, numJeu=0){

  let maxCartes = 21;

  if (nbrJoueurs == 4){
      return 0;
  }
  
  if (nbrJoueurs == 6){
    maxCartes = 18;
  }

  if (typePartie != "Wizzard"){
    return 108 - (nbrJoueurs * maxCartes);
  }

  //Pour le Wizzard 
  if (numJeu == 1 || numJeu == 5 || numJeu == 9 || numJeu == 13){
    return 108 - (nbrJoueurs * maxCartes);
  }
  
  if (numJeu == 2 || numJeu == 4 || numJeu == 6 || numJeu == 8 || numJeu == 10 || numJeu == 12 || numJeu == 14){
    return 108 - (nbrJoueurs * (maxCartes -1));
  }

  if (numJeu == 3 || numJeu == 7 || numJeu == 11 || numJeu == 15){
    return 108 - (nbrJoueurs * (maxCartes -2));
  }

}