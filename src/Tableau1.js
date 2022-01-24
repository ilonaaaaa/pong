class Tableau1 extends Phaser.Scene{


    preload(){
        this.load.image('square','asset/carre.png');
        this.load.image('circle','asset/ballon.png');
        this.load.image('map','asset/terrain.png');
        this.load.image('joueur1','asset/joueur1.png');
        this.load.image('joueur2','asset/joueur2.png');
    }

    create(){

        this.hauteur = 500
        this.largeur = 1000
        this.speedX = 0
        while(this.speedX===0){
            this.speedX = 500*Phaser.Math.Between(-1,1)
        }
        this.speedY = Phaser.Math.Between(-500, 500)
        this.maxspeed = 500

        //------------------ANIM HEAD------------------
        this.add.image(500,250,'map')

        this.balle = this.physics.add.sprite(this.largeur/2, this.hauteur/2, 'circle')

        this.balle.setDisplaySize(30, 30)
        this.balle.body.setSize(20, 20);
        this.balle.body.setBounce(1,1);
        this.balle.body.setAllowGravity(false)

        this.haut = this.physics.add.sprite(0, 0, 'square').setOrigin(0, 0)
        this.haut.setDisplaySize(this.largeur, 20)
        this.haut.body.setAllowGravity(false)
        this.haut.setImmovable(true);
        this.haut.flipY=true;
        this.haut.flipX=true;


        this.bas = this.physics.add.sprite(0, 480, 'square').setOrigin(0, 0)
        this.bas.setDisplaySize(this.largeur, 20)
        this.bas.body.setAllowGravity(false)
        this.bas.setImmovable(true);


        this.player1 = this.physics.add.sprite(50, 250, 'joueur1')
        this.player1.setDisplaySize(80, 100)
        this.player1.body.setAllowGravity(false)


        this.player2 = this.physics.add.sprite(920, 250, 'joueur2')
        this.player2.setDisplaySize(80, 100)
        this.player2.body.setAllowGravity(false)
        this.player2.flipX=true;

        this.player1.setImmovable(true)
        this.player2.setImmovable(true)

        let me = this;
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

        if(this.balle<0)
        {
            this.scoreplayer2 +=1;
            this.textplayer1.setText('Player 1 = ' + this.scoreplayer1);

        }

        if(this.balle>this.largeur)
        {
            this.scoreplayer1  +=1;
            this.textplayer2.setText('Player 2 = ' + this.scoreplayer2);
        }


        this.joueurGauche = new Joueur('Lakers','joueurGauche')
        this.joueurDroite = new Joueur('Spurs','joueurDroite')
        console.log(this.joueurGauche)

        let particles2 = this.add.particles('white');
        let particle=particles2.createEmitter({
            alpha: { start: 0.1, end: 0 },
            scale: { start: 0.4, end: 0.1},
            //tint: { start: 0xff945e, end: 0xff945e },
            blendMode: 'ADD',
            frequency: 2,
            x: me.balle.x,
            y: this.balle.y
        });
        particle.startFollow(this.balle)

        this.balleAucentre();
        this.initKeyboard()


    }

    // créer le rebond sur les raquettes
    rebond(players){
        let me=this;

        console.log(players.y)
        console.log(me.balle.y)
        console.log((me.balle.y)-(players.y))

        let hauteurPlayers=players.displayHeight;

        let positionRelativePlayers =(this.balle.y-players.y);

        positionRelativePlayers =(positionRelativePlayers/hauteurPlayers);

        positionRelativePlayers= positionRelativePlayers*2-1;
        console.log(positionRelativePlayers);

        this.balle.setVelocityY(this.balle.body.velocity.y + positionRelativePlayers * hauteurPlayers )
    }




    balleAucentre(){
        /**
         *
         * Remise balle au centre
         */
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
        /**
         *
         * Remise a zéro des raquettes
         */
        if(this.balle.x > this.largeur){
            this.bt.play()
            this.player1.setY(250)
            this.player2.setY(250)
        }
        if(this.balle.x <0){
            this.bt.play()
            this.player1.setY(250)
            this.player2.setY(250)
        }

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
        /**
         *
         * Création des input des touches et de leur action
         */
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

