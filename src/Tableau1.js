class Tableau1 extends Phaser.Scene{
    /**
     * Précharge les assets
     */
    preload(){
        this.load.image('carre', 'assets/carre.png');
        this.load.image('cercle', 'assets/cercle.png');
    }
    create(){
        this.carre = this.add.sprite(0, 0, 'carre').setOrigin(0,0);

    }
    update(){

    }
}
