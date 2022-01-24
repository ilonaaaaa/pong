class Tableau1 extends Phaser.Scene{
    /**
     * Précharge les assets
     */
    preload(){
        this.load.image('carre', 'assets/carre.png');
        this.load.image('balle', 'assets/cercle.png');
    }
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
        }

    }
}
