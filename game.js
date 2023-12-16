
function load_images(){
    enemy_img = new Image();
    enemy_img.src = "Assets/enemy.png";
    
    player_img = new Image();
    player_img.src = "Assets/fighter.png";
    
    gem_img2 = new Image;
    gem_img2.src = "Assets/vac1.png";
    
    gem_img = new Image;
    gem_img.src = "Assets/vac.gif";
    
    win = new Audio();
    win.src = "Audio/won.wav";
    
    lose = new Audio();
    lose.src = "Audio/dead.mp3";
    
    
}
function init(){
    cvs = document.getElementById('canvas');
    W = cvs.width = 1252;
    H = cvs.height = 516;
    graphical= cvs.getContext('2d');
    game_over = false;

    e1 = {
        x:140,
        y:50,
        w:80,
        h:80,
        speed:40,
    };
     e2 = {
        x:350,
        y:150,
        w:80,
        h:80,
        speed:55,
    };
    
    
     e3 = {
        x:550,
        y:300,
        w:80,
        h:80,
        speed:60,
    };
    e4 = {
        x:750,
        y:200,
        w:80,
        h:80,
        speed:70,
    };
    e5 = {
        x:950,
        y:200,
        w:80,
        h:80,
        speed:80,
    };

    
    enemy = [e1,e2,e3,e4,e5];
    player = {
        x:20,
        y:H/2,
        w:110,
        h:110,
        speed:30,
        health:100,
        moving:"false"
    }
    gem = {
        x:W-150,
        y:H/2,
        w:150,
        h:150,
    }
    cvs.addEventListener('mousedown',function(){
        console.log("Mouse Pressed"); 
        player.moving = true;
    });
    cvs.addEventListener('mouseup',function(){
        console.log("Mouse Released"); 
        player.moving = false;
    });
}
function isOverlap(enemy1,vaccine){
    if (enemy1.x < vaccine.x + vaccine.w &&
   enemy1.x + enemy1.w > vaccine.x &&
   enemy1.y < vaccine.y + vaccine.h &&
   enemy1.y + enemy1.h >vaccine.y) {
    return true
    }
    
    return false;
    
}
function position(){
   graphical.clearRect(0,0,W,H);
    for(let i = 0; i<enemy.length; i++){
     graphical.drawImage(enemy_img,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
    }
    graphical.drawImage(player_img,player.x,player.y,player.w,player.h);
    
    graphical.drawImage(gem_img,gem.x,gem.y,gem.w,gem.h);
    
    graphical.fillStyle = "white";
    graphical.font = "30px Bold";
    graphical.fillText("Score " + player.health,30,30);//accodring to current fill style text will be written
}
function over(){
    if(game_over){
        return;
    }
    if(player.moving == true){
        player.x += player.speed;
        player.health += 20;
    
    }
    for(let i = 0; i<enemy.length;i++){
        if(isOverlap(enemy[i],player)){
            lose.play();
            player.health -= 50;
            if(player.health < 0){
                position();
                lose.play();
                localStorage.setItem("score",player.health)
                localStorage.setItem("win",0)
                window.location.href="./gameover.html"
                game_over = true;
            }
        }
    }
    if(isOverlap(player,gem)){
        win.play();
        localStorage.setItem("score",player.health)
        localStorage.setItem("win",1)
        window.location.href="./gameover.html"
        game_over = true;
    }
    
    for(let i = 0; i<enemy.length; i++){
        enemy[i].y += enemy[i].speed;
        if(enemy[i].y > H-enemy[i].h || enemy[i].y <= 0){
            enemy[i].speed *= -1;
        }
    }
}
function gameloop(){
    if(game_over){
        clearInterval(f);
    }
    position();
    over();
}
load_images();
init();
var f = setInterval(gameloop,100);

var backgroundSound=new Audio("Audio/HEROICCC(chosic.com).mp3")
backgroundSound.play()
backgroundSound.loop=true;