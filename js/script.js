var largeur, hauteur 
var nbImgX, nbImgY;
var lastminX;
var minX, minY;
var vitesse;
var totalImage;
var bpX = $("#animation").css("background-position").split("px")[0];
var bpY = parseInt($("#animation").css("background-position").split("px")[1]);
var inter;
var sens;
var actif = false;
var compteur = 1;


function taille() {
  pause();
  vitesse = parseInt($("#vitesse").val());
  hauteur = parseInt($("#hauteur").val());
  largeur = parseInt($("#largeur").val());
  nbImgX = parseInt($("#nb_images_X").val());
  nbImgY = parseInt($("#nb_images_Y").val());
  totalImage = parseInt($("#totalImg").val());
  minY = -(hauteur * (nbImgY - 1));
  minX = -(largeur * (nbImgX - 1));
  lastminX = minX + ((nbImgX * nbImgY) % totalImage) * largeur; 
  $("#animation").css({"width": largeur + "px",
                       "height": hauteur + "px"});
  $("button").css("display", "inline");
  $("#anim").css("display","block");
  $("input").keyup(taille);
}

function imgSuivante() {
  bpX = 0;
  if(bpY == minY) {
    bpY = 0;
  }
  else if (bpY == 0 && nbImgY > 1) {
    bpY -= hauteur;
  }
  else {
    bpY -= hauteur;
  }
}

function suivant() {
  if (compteur != totalImage) {
    if (bpX == minX) {
      imgSuivante();
    }
    else {
      bpX -= largeur;
    }
    compteur++;
  }
  else {
    if (bpX == lastminX) {
      imgSuivante();
    }
    else {
      bpX -= largeur;
    }
    compteur = 1;
  }
  $("#animation").css("background-position", bpX + "px "+ bpY + "px");
}


function precedent() {
console.log("compteur"+compteur);
  if (compteur != 1) {
    if (bpX == 0) {
        if (bpY != 0) {
          bpX = minX;
        }
        else {
          bpX = lastminX;
        }
        if(bpY != minY) {
          bpY = minY;
        }
        else {
          bpY += hauteur;
        }
      }
    else {
      bpX += largeur;
      compteur--;
    }
  }																																					
  else {
    compteur = totalImage;
    bpX = lastminX;
  }
  $("#animation").css("background-position", bpX + "px "+ bpY + "px");
}

function boucle() {
  actif = true;
  inter = window.setInterval(suivant, vitesse);
  $("#play").off("click", boucle);
}

function pause() {
  if (actif) {
    actif = false;
    window.clearInterval(inter);
    $("#play").on("click", boucle);
  }
}

$(document).ready(function(){
  $("#play").on("click", boucle);
  $("#next").on("click", suivant);  
  $("#prev").on("click", precedent);
  $("#pause").on("click", pause);
  $("#form_ok").on("click", taille);
  $("#reload").click(function() {
  																																																																																																																																																																																																																																																																																																																																																																			$("#form")[0].reset();
  	$("#animation").css("background-position", "0px 0px");
  	$("#animation").css({"width": "0px",
                       "height": "0px"});
  });
})
