class Tableau1 extends Phaser.Scene{
    /**
     * Précharge les assets
     */
    preload(){
        this.load.image('carre', 'assets/carre.png');
        this.load.image('balle', 'assets/cercle.png');
    }
    create(){
        this.hauteur = 500;
        this.largeur = 1000;

        this.balle=this.physics.add.sprite(this.largeur/2,this.hauteur/2,'balle').setOrigin(0,0);
        this.balle.setDisplaySize(20,20);
        this.balle.body.setBounce(1.1,1.1);
        this.balle.setVelocityX(Phaser.Math.Between(-200,200))
        this.balle.setVelocityY(Phaser.Math.Between(-200,200))
        this.balle.body.setMaxVelocity(1000,1000)

        this.haut=this.physics.add.sprite(0,0,'carre').setOrigin(0,0);
        this.haut.setDisplaySize(this.largeur,20);
        this.haut.body.setAllowGravity(false);
        this.haut.setImmovable(true);

        this.bas=this.physics.add.sprite(0,this.hauteur-20,'carre').setOrigin(0,0);
        this.bas.setDisplaySize(this.largeur,20);
        this.bas.body.setAllowGravity(false);
        this.bas.setImmovable(true);

        this.physics.add.collider(this.balle,this.bas);
        this.physics.add.collider(this.balle,this.haut);
        this.initKeyboard();


    }

    //faire une raquette à gauche et à droite (ZS et OL) pour pouvoir jouer à deux
    //raquette de 100 pixels de haut et 20 de large

    initKeyboard(){

    }

    update(){
        if(this.balle.x > this.largeur){
            this.balle.x = 0
        }
        if(this.balle.y < 0){
            this.balle.y = 0
        }
        if(this.balle.y > this.hauteur){
            this.balle.y = this.hauteur
        }

    }
}
