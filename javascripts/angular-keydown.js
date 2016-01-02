'use strict';

function Keydown($document){

    this.shift = false;
    this.ctrl = false;
    this.alt = false;
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.pgUp = false;
    this.pgDown = false;
    this.space = false;
    this.enter = false;
    this.escape = false;
    this.tab = false;
    this.others = {};

    this.pressed = [];

    $document.on('keyup keydown', function(e){
        keyHandler(window.event ? e.keyCode : e.which, 'keydown' === e.type);
    });

    var self = this;
    function keyHandler(key, isKeyDown){
        var index = self.pressed.indexOf(key);

        if (isKeyDown === (-1 !== index)) {
            return;
        } else if (isKeyDown) {
            self.pressed.push(key);
        } else {
            self.pressed.splice(index, 1);
        }

        switch(key){
            case 16: self.shift = isKeyDown; break;
            case 17: self.ctrl = isKeyDown; break;
            case 18: self.alt = isKeyDown; break;
            case 38: self.up = isKeyDown; break;
            case 40: self.down = isKeyDown; break;
            case 37: self.left = isKeyDown; break;
            case 39: self.right = isKeyDown; break;
            case 33: self.pgUp = isKeyDown; break;
            case 34: self.pgDown = isKeyDown; break;
            case 32: self.space = isKeyDown; break;
            case 13: self.enter = isKeyDown; break;
            case 27: self.escape = isKeyDown; break;
            case 9: self.tab = isKeyDown; break;
            default:
                self.others[key] = isKeyDown;
        }
    }

}

angular.module('msieurtoph.ngKeydown', [])
.service('Keydown', ['$document', Keydown]);
