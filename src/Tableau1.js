class Tableau1 extends Phaser.Scene{

//it's froggy time

    preload(){
        this.load.image('square','asset/carre.png');
        this.load.image('mouche','asset/mouche.png');
        this.load.image('map','asset/map.jpg');
        this.load.image('froppy','asset/froppong.png');
        this.load.image('crappy','asset/crappong.png');

        for(let e=1;e<=2;e++){
            this.load.image('langue'+e, 'asset/langue/langue'+e+'.png');
        }
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

        //---------------------------------------------
        this.add.image(500,250,'map')

        this.anims.create({
            key: 'blop',
            frames: [
                {key:'langue1'},
            ],
            frameRate: 1,
            repeat: 0,
        });
        this.anims.create({
            key: 'blap',
            frames: [
                {key:'langue2'},
            ],
            frameRate: 1,
            repeat: 0,
        });

        this.balle = this.physics.add.sprite(this.largeur/2, this.hauteur/2, 'mouche')

        this.balle.setDisplaySize(36, 36)
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


        this.player1 = this.physics.add.sprite(50, 360, 'froppy').setOrigin(0, 0)
        this.player1.setDisplaySize(70, 110)
        this.player1.body.setAllowGravity(false)


        this.player2 = this.physics.add.sprite(920, 360, 'crappy').setOrigin(0, 0)
        this.player2.setDisplaySize(70, 110)
        this.player2.body.setAllowGravity(false)

        this.player1.setImmovable(true)
        this.player2.setImmovable(true)

        let me = this;
        this.physics.add.collider(this.player1, this.balle,function(){
            console.log('touche player 1')
            me.rebondG(me.player1)
        })
        this.physics.add.collider(this.player2, this.balle,function(){
            console.log('touche player 2')
            me.rebondD(me.player2)
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


        this.joueurGauche = new Joueur('Froppy','joueurGauche')
        this.joueurDroite = new Joueur('Crappy','joueurDroite')
        window.toto=this.joueurGauche;
        console.log(this.joueurGauche)


        this.balleAucentre();
        this.initKeyboard()

        this.tweens.add({
            targets:[this.balle],
            rotation: 6,
            ease :'Repeat',
            repeat:-1,
            duration:1000,
        })

    }

    // créer le rebond sur les grenouilles
    rebondG(){

        console.log(player1.y)
        console.log(me.balle.y)
        console.log((me.balle.y)-(player1.y))

        let hauteurPlayer1=player1.displayHeight;

        let positionRelativePlayer1 =(this.balle.y-player1.y);

        positionRelativePlayer1 =(positionRelativePlayer1/hauteurPlayer1);

        positionRelativePlayer1= positionRelativePlayer1*2-1;
        console.log(positionRelativePlayer1);

        this.balle.setVelocityY(this.balle.body.velocity.y + positionRelativePlayer1 * hauteurPlayer1 )

        this.player1.play('blop');

    }

    rebondD(){

        console.log(player2.y)
        console.log(me.balle.y)
        console.log((me.balle.y)-(player2.y))

        let hauteurPlayer2=player2.displayHeight;

        let positionRelativePlayer2 =(this.balle.y-player2.y);

        positionRelativePlayer2 =(positionRelativePlayer2/hauteurPlayer2);

        positionRelativePlayer2= positionRelativePlayer2*2-1;
        console.log(positionRelativePlayer2);

        this.balle.setVelocityY(this.balle.body.velocity.y + positionRelativePlayer2 * hauteurPlayer2 )

        this.player2.play('blap');

    }





    balleAucentre(){
        this.balle.x = this.largeur/2
        this.balle.y = this.hauteur/2
        this.speedX = 0

        this.balle.setVelocityX(Math.random()>0.5?-300:300)
        this.balle.setVelocityY(0)

        this.player1.y=this.hauteur/2-50
        this.player2.y=this.hauteur/2-50
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
        if(this.balle.x > this.largeur){
            this.player1.setY(250)
            this.player2.setY(250)
        }
        if(this.balle.x <0){
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

