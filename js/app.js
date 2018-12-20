// Inimigos que nosso jogador deve evitar
var Enemy = function(x,y) {
    
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 200) + 100);
    
};

//Reinicia posição do jogador para reiniciar o jogo
Object.prototype.reset = function() {
	player = new Player(200,400); 
};

//Desenhe o inimigo na tela, método exigido pelo jogo
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Atualize a posição do inimigo, método exigido pelo jogo
// Parâmetro: dt, um delta de tempo entre ticks
Enemy.prototype.update = function(dt) {
   
	// Você deve multiplicar qualquer movimento pelo parâmetro
    // dt, o que garantirá que o jogo rode na mesma velocidade
    // em qualquer computador.
	
    this.x = this.x + this.speed * dt;
    if (this.x >= 505) {
        this.x = 0;
    }
    
    //Checa colisão
    if (player.y + 131 >= this.y + 90 && player.y + 73 <= this.y + 135 && player.x + 25 <= this.x + 88 && player.x + 76 >= this.x + 11) {
    	this.reset();
    }
    
};


//Agora, escreva sua própria classe de jogador
//Esta classe exige um método update(), 
//um render() e um handleInput().

var Player = function(x,y){
	this.sprite = 'images/char-boy.png';
	this.x = x;
	this.y = y;
}


Player.prototype.update = function() {}; 

//Desenhe o jogador na tela, método exigido pelo jogo
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//Controla entrada e operaciona 100 ( 1 bloco )
Player.prototype.handleInput = function(keyCode) {
    if (keyCode === 'left' && this.x > 0){ 
        this.x = this.x - 100;
    }else if (keyCode === 'right' && this.x != 400){
        this.x = this.x + 100;
    }else if (keyCode === 'up'){
        this.y = this.y - 100;
    }else if (keyCode === 'down' && this.y != 400){
        this.y = this.y + 100;
    }
    
    //Chegou na água e venceu
    if(this.y < 25){
        this.reset();
    }
    
};


// Represente seus objetos como instâncias.
// Coloque todos os objetos inimgos numa array allEnemies
// Coloque o objeto do jogador numa variável chamada jogador.

var allEnemies = [];
(function setEnemies(){
    allEnemies.push(new Enemy(-2, 70));
    allEnemies.push(new Enemy(-2, 110));
    allEnemies.push(new Enemy(-2,150));
    allEnemies.push(new Enemy(-2,230));
}());

var player = new Player(200,400); 

// Isto reconhece cliques em teclas e envia as chaves para seu
// jogador. método handleInput().
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
