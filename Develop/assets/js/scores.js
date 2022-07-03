/**
* @author  Cristobal A Barberis
* @version 0.1, 07/02/22
*/

// show user scores / scores.html
var showScores = function(){
  var scoreListEl = document.querySelector("#scores");
  var scores = localStorage.getItem("score");
  if(scores){
    // print scores
    scores = JSON.parse(scores);

    // order by score desc 
    scores.sort( function ( a, b ) { return b.score - a.score; } );

    for (var i = 0; i < scores.length; i++) {
      var scoreEl =  document.createElement("div");
      if(i % 2 == 0) {
        scoreEl.className = "score-detail";
      }else{
        scoreEl.className = "score-detail score-detail-o";
      }
      scoreEl.innerHTML = "<span>" + (i+1) + ". " + scores[i].user + " - " + scores[i].score;
      scoreListEl.appendChild(scoreEl);
    }
  }else{
    // if no scores
    var scoreEl =  document.createElement("div");
    scoreEl.className = "score-detail";
    scoreEl.innerHTML = "<span>There is no scores saved.</span>";
    scoreListEl.appendChild(scoreEl);
  }
}

showScores();