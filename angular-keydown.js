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
    function keyHandler(key, isKeydown){
        var index = self.pressed.indexOf(key);

        if (isKeydown === (-1 !== index)) {
            return;
        } else if (isKeydown) {
            self.pressed.push(key);
        } else {
            self.pressed.splice(index, 1);
        }

        switch(key){
            case 16: self.shift = isKeydown; break;
            case 17: self.ctrl = isKeydown; break;
            case 18: self.alt = isKeydown; break;
            case 38: self.up = isKeydown; break;
            case 40: self.down = isKeydown; break;
            case 37: self.left = isKeydown; break;
            case 39: self.right = isKeydown; break;
            case 33: self.pgUp = isKeydown; break;
            case 34: self.pgDown = isKeydown; break;
            case 32: self.space = isKeydown; break;
            case 13: self.enter = isKeydown; break;
            case 27: self.escape = isKeydown; break;
            case 9: self.tab = isKeydown; break;
            default:
                self.others[key] = isKeydown;
        }
    }

}

angular.module('msieurtoph.ngKeydown', [])
.service('Keydown', ['$document', Keydown]);
