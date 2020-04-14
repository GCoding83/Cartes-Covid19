
function ajouterJoueur(prenom, tableauJoueurs){
  tableauJoueurs.push(new Joueur(prenom));
}


function enleverJoueur(prenom, tableauJoueurs){

  for (let i=0; i<tableauJoueurs.length; i++){
    if (tableauJoueurs[i].prenom == prenom){

      //Retirer le joueur a cette position
      if (tableauJoueurs[i] == tableauJoueurs[tableauJoueurs.length-1]){
        tableauJoueurs.pop();
        break;
      }
      else{
        tableauJoueurs.splice(i, 1);
        break;
      }
    }
  }      
}


function assignerType(nom){

  if (nom == "HautBas") return new TypePartie("Haut et Bas");
  
  if (nom == "QuatrePique")  return new TypePartie("Quatre de Pique");

  return new TypePartie(nom);
}


function creerPartie(leType, nombreJeux, joueurs){
    //Melanger les joueurs (pour obtenir un resultat aleatoire pour les brasseurs)
    melangerJoueurs(joueurs);
    return new Partie(leType, nombreJeux, joueurs);
}


function melangerJoueurs(joueurs) {
  for (let i = joueurs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [joueurs[i], joueurs[j]] = [joueurs[j], joueurs[i]];
    }
}


function determinerNbrCartesParJoueur(nomPartie, nbrJoueurs, numJeu){

    let nbrMax = 21;

    //Si 6 joueurs, alors 18 cartes par joueur.
    if (nbrJoueurs == 6){
        nbrMax = 18;
    }

    //Si pas Wizzard, alors retourner le nombre max
    if (nomPartie != "Wizzard"){
      return nbrMax;
    }

    //Si Wizzard, alterner selon le nombre de cartes precedentes et si le nombre est croissant ou decroissant - ce qui peut etre determine par le numero du Jeu
    if (numJeu == 1 || numJeu == 5 || numJeu == 9 || numJeu == 13){
      return nbrMax;
    }
    
    if (numJeu == 2 || numJeu == 4 || numJeu == 6 || numJeu == 8 || numJeu == 10 || numJeu == 12 || numJeu == 14){
      return nbrMax - 1;
    }

    if (numJeu == 3 || numJeu == 7 || numJeu == 11 || numJeu == 15){
      return nbrMax - 2;
    }

}


function creerJeux(Partie){

    let tableauJeux = new Array();

    for (let i=0; i<Partie.nombreJeux; i++){
      let nbrCartesParJoueur = determinerNbrCartesParJoueur(Partie.TypePartie.nom, Partie.joueurs.length, i+1);
      let leJeu = new Jeu(Partie, i+1, nbrCartesParJoueur);
      tableauJeux.push(leJeu);
    }
    
    return tableauJeux;
}

function creerMainsParJeu(Jeu){

      //C'est un tableau qui contient le nombre de Mains POUR CHAQUE JOUEUR DU JEU
      let tableauMainsParJeu = new Array();

      //Pour chaque Joueur du jeu
      for (let joueur=0; joueur < Jeu.Partie.joueurs.length; joueur++){

          //Retirer les cartes du jeu et les assigner a un tableau qu'on donnera ensuite comme main
          let cartesRetirees = new Array();

          for (let i=0; i < Jeu.nbrCartesParJoueurs; i++){

            //En retirant une carte aleatoire du Jeu, on l'ajoute au tableau cartesRetirees
            cartesRetirees.push(Jeu.cartes.splice(Math.floor(Math.random() * Jeu.cartes.length), 1));
          }

          //Ordonner les cartes
          cartesRetirees.sort((a, b) => b - a);

          //Creer la main en assignant le joueur et le tableau de cartes retireees
          let nouvelleMain = new Main(Jeu.Partie.joueurs[joueur], Jeu, cartesRetirees);

          tableauMainsParJeu.push(nouvelleMain);
      }

      return tableauMainsParJeu;
}
