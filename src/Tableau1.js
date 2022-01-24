
class Tableau1 extends Phaser.Scene{


    preload(){
        this.load.image('carre','assets/carre.png');
        this.load.image('circle','assets/ballont.jpg');
         {
            this.load.image('backg', 'assets/terrain.png');
        }
    }

    /*getFrames(prefix,length){
        let frames=[];
        for (let i=1;i<=length;i++){
            frames.push({key: prefix+i});
        }
        return frames;
    }*/

    create(){

        let me=this;

        this.hauteur = 500;
        this.largeur = 1000;

        // Balle
        this.balle=this.physics.add.sprite(this.largeur/2,this.hauteur/2,'balle')
        this.balle.setDisplaySize(20,20);
        this.balle.body.setBounce(1.5,1.5);
        this.balle.body.setAllowGravity(false);
        this.balle.setVelocityX(Phaser.Math.Between(100,200))
        this.balle.setVelocityY(Phaser.Math.Between(0,0))
        this.balle.body.setMaxVelocityX(500,500)
        this.balle.body.setMaxVelocityY(100,100)

        // Bordure
        this.haut=this.physics.add.sprite(0,0,'carre').setOrigin(0,0);
        this.haut.setDisplaySize(this.largeur,20);
        this.haut.body.setAllowGravity(false);
        this.haut.setImmovable(true);

        // Bordure
        this.bas=this.physics.add.sprite(0,this.hauteur-20,'carre').setOrigin(0,0);
        this.bas.setDisplaySize(this.largeur,20);
        this.bas.body.setAllowGravity(false);
        this.bas.setImmovable(true);

        // Raquette droite
        this.droite = this.physics.add.image(0, this.hauteur / 2 - 50, 'carre').setOrigin(0, 0);
        this.droite.setDisplaySize(20, 100)
        this.droite.body.setAllowGravity(false)
        this.droite.setImmovable(true)


        // Raquette gauche
        this.gauche = this.physics.add.image(this.largeur - 20, this.hauteur / 2 - 50, 'carre').setOrigin(0, 0);
        this.gauche.setDisplaySize(20, 100)
        this.gauche.body.setAllowGravity(false)
        this.gauche.setImmovable(true)

        this.physics.add.collider(this.balle,this.bas)
        this.physics.add.collider(this.balle,this.haut)
        this.physics.add.collider(this.balle,this.gauche, function(){
            me.rebond(me.gauche)
        })
        this.physics.add.collider(this.balle,this.droite, function(){
            console.log("touche droite");
            me.rebond(me.droite)
        })
        this.initKeyboard()

        //this.foond =this.add.image(500,250,'fond');
        //this.foond.setDisplaySize(1000,550)

        let me = this;

        this.foond = this.add.sprite(100, 0, 'backg').setOrigin(0,0);
        /*this.anims.create({
            key: 'backg',
            frames: this.getFrames('backg',49),
            frameRate: 32,
            repeat: -1
        });*/

        this.hauteur = 500
        this.largeur = 1000
        this.speedX = 0
        while(this.speedX===0){
            this.speedX = 500*Phaser.Math.Between(-1,1)
        }
        this.speedY = Phaser.Math.Between(-500, 500)
        this.maxspeed = 500

        this.balle = this.physics.add.sprite(this.largeur/2, this.hauteur/2, 'circle')
        this.balle.setDisplaySize(20, 20)
        this.balle.body.setBounce(1,1);
        this.balle.setVelocityX(Phaser.Math.Between(100,200))
        this.balle.setVelocityY(0)
        this.balle.setMaxVelocity(200)
        this.balle.body.setAllowGravity(false)

        this.haut = this.physics.add.sprite(0, 0, 'carre').setOrigin(0, 0)
        this.haut.setDisplaySize(this.largeur, 20)
        this.haut.body.setAllowGravity(false)
        this.haut.setImmovable(true);

        this.bas = this.physics.add.sprite(0,this.hauteur-20,'carre').setOrigin(0, 0)
        this.bas.setDisplaySize(this.largeur, 20)
        this.bas.body.setAllowGravity(false)
        this.bas.setImmovable(true);

        this.player1 = this.physics.add.sprite(50, 360, 'carre')
        this.player1.setDisplaySize(20, 100)
        this.player1.body.setAllowGravity(false)

        this.player2 = this.physics.add.sprite(920, 360, 'carre')
        this.player2.setDisplaySize(20, 100)
        this.player2.body.setAllowGravity(false)

        this.player1.setImmovable(true)
        this.player2.setImmovable(true)

        this.physics.add.collider(this.player1, this.balle,function(){
            console.log('touche player 1')
            me.rebond(me.player1)
        })
        this.physics.add.collider(this.player2, this.balle,function(){
            console.log('touche player 2')
            me.rebond(me.player2)
        })

        this.physics.add.collider(this.balle, this.bas)
        this.physics.add.collider(this.balle, this.haut)

        this.balle.setMaxVelocity(this.maxspeed,this.maxspeed)

        this.physics.add.collider(this.haut, this.player1)
        this.physics.add.collider(this.bas, this.player1)

        this.physics.add.collider(this.haut, this.player2)
        this.physics.add.collider(this.bas, this.player2)

        this.player1Speed = 0
        this.player2Speed = 0

        this.joueurGauche = new Joueur('Spurs','joueurGauche')
        this.joueurDroite = new Joueur('Lakers','joueurDroite')
        console.log(this.joueurGauche)

        this.balleAucentre();
        this.initKeyboard()
    }

    rebond(raquette){
        let me=this;

        console.log(raquette.y)
        console.log(me.balle.y)
        console.log((me.balle.y)-(raquette.y))

        let hauteurRaquette=raquette.displayHeight;

        let positionRelativeRaquette =(this.balle.y-raquette.y);

        positionRelativeRaquette =(positionRelativeRaquette/hauteurRaquette);

        positionRelativeRaquette= positionRelativeRaquette*2-1;
        console.log(positionRelativeRaquette);

        this.balle.setVelocityY(this.balle.body.velocity.y + positionRelativeRaquette * hauteurRaquette)
    }


    //faire une raquette à gauche et à droite (ZS et OL) pour pouvoir jouer à deux
    //raquette de 100 pixels de haut et 20 de large

    initKeyboard() {
        let me = this;
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                // J1 = A pour allez vers le haut et Q pour allez vers le bas
                // J2 = P pour allez vers le haut et M pour allez vers le bas
                case Phaser.Input.Keyboard.KeyCodes.A:
                    me.droite.setVelocityY(0)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.droite.setVelocityY(0)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.P:
                    me.gauche.setVelocityY(0)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.M:
                    me.gauche.setVelocityY(0)
                    break;

            }
        });
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.A:
                    me.droite.setVelocityY(-300)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.droite.setVelocityY(300)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.P:
                    me.gauche.setVelocityY(-300)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.M:
                    me.gauche.setVelocityY(300)
                    break;

            }
        });
    }

    update(){
        if (this.balle.x > this.largeur){
            this.balle.x=500;
        }
        if (this.balle.x < 0){
            this.balle.x=500;
        }
        if (this.balle.y <0){
            this.balle.y=500;
        }
        if (this.balle.y > this.hauteur){
            this.balle.y=this.hauteur;

    rebond(players){
        let me = this ;
        console.log(this.player1.y);
        console.log(me.balle.y);
        let hauteurPlayers = players.displayHeight;

        let positionRelativePlayers = (this.balle.y - players.y);

        positionRelativePlayers= (positionRelativePlayers / hauteurPlayers)
        positionRelativePlayers = positionRelativePlayers*2-1;

        this.balle.setVelocityY(this.balle.body.velocity.y + positionRelativePlayers * 50);

    }

    balleAucentre(){
        this.balle.x = this.largeur/2
        this.balle.y = this.hauteur/2
        this.speedX = 0

        this.balle.setVelocityX(Math.random()>0.5?-300:300)
        this.balle.setVelocityY(0)
    }

    /**
     *
     * @param {Joueur} joueur
     */
    win(joueur){
        //alert('Joueur '+joueur.name+' gagne')
        joueur.score ++;
        //alert('Le score est de '+this.joueurGauche.score+' a '+this.joueurDroite.score)
        this.balleAucentre();
    }

    update(){
        if(this.balle.x>this.largeur){
            this.win(this.joueurGauche);
        }
        if(this.balle.x<0){
            this.win(this.joueurDroite);

        }
        this.player1.y += this.player1Speed
        this.player2.y += this.player2Speed
    }

    initKeyboard(){
        let me = this
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.player1Speed = -5
                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.player1Speed = 5
                    break;
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.player2Speed = -5
                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.player2Speed = 5
                    break;
            }
        });
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.player1Speed = 0
                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.player1Speed = 0
                    break;
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.player2Speed = 0
                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.player2Speed = 0
                    break;
            }
        });
    }
}




