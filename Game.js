class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
    }

    update(state){
        database.ref('/').update({
          gameState: state
        });
      }

      async start(){
        if(gameState === 0){
          player = new Player();
          var playerCountRef = await database.ref('playerCount').once("value");
          if(playerCountRef.exists()){
            playerCount = playerCountRef.val();
            player.getCount();
          }
          form = new Form()
          form.display();
        }

        teddy = createSprite(100,550);
        teddy.addImage("teddy_Img",teddy_Img);
        teddy.scale = 0.03 ;
        rabbit = createSprite(100,650);
        rabbit.addImage("rabbit",rabbit_Img);
        rabbit.scale = 0.2;
        var animals = [teddy,rabbit];

          //giving forest vlocity
          forest.velocityX = -4;

          if (forest.x < 250){
          forest.x = forest.width/2;
          }
        
     }
     play(){
        form.hide();
        
        Player.getPlayerInfo();
        player.getplayersAtEnd();
        
        if(allPlayers !== undefined){
          
          //index of the array
          var index = 0;

          var x  ;
          var y = 550;
    
          for(var plr in allPlayers){
            //add 1 to the index for every loop
            index = index + 1 ;
    
            //position the players a little away from each other in y direction
            y = y + 200;
            //use data form the database to display the players in x direction
           // x = displayWidth - allPlayers[plr].distance;
            x = 100 ;
            animals[index-1].x = x;
            animals[index-1].y = y;
        }
      }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
     }
  
      if(player.distance > 3860){
        gameState = 2;
        player.rank += 1;
        Player.updateplayersAtEnd(player.rank);
       }
        drawSprites();
    }

    end(){
        console.log("Game Ended");
        console.log("rank :"+player.rank);
      }
  
}