# angular-keydown
Angular service for keydown detection

[![npm version](https://badge.fury.io/js/angular-keydown.svg)](http://badge.fury.io/js/angular-keydown)
[![Build Status](http://img.shields.io/travis/msieurtoph/angular-keydown.svg)](https://travis-ci.org/msieurtoph/angular-keydown) [![Code Climate](https://codeclimate.com/github/msieurtoph/angular-keydown/badges/gpa.svg)](https://codeclimate.com/github/msieurtoph/angular-keydown) [![Test Coverage](https://codeclimate.com/github/msieurtoph/angular-keydown/badges/coverage.svg)](https://codeclimate.com/github/msieurtoph/angular-keydown)

[![devDependency Status](http://img.shields.io/david/dev/msieurtoph/angular-keydown.svg?style=flat)](https://david-dm.org/msieurtoph/angular-keydown#info=devDependencies)


Sometimes, it could be useful to detect a pressed key during a click or another event. Let's say you have a validation button. It would rock if it pops up a confirmation message when you click on it, but not if you hold the shift key, right ?

Angular-keydown makes it really easy!

## Demos & usage

http://msieurtoph.github.io/angular-keydown

## Installation

`npm i angular-keydown --save`

## Usage

Please, visit http://msieurtoph.github.io/angular-keydown for live examples.

```javascript
angular.module('', ['msieurtoph.ngKeydown'])

.directive('myTest', ['Keydown', function(Keydown){
    return {
        restrict: 'A',
        link: function(scope){
            scope.click = function(){
                if (Keydown.shift){
                    scope.message = 'Shift key has been pressed when clicking!';
                } else {
                    scope.message = 'Shift key nas not been pressed when clicking!';
                }
            };
        }
    }]);
});
```
```html
<button my-test ng-click="click()">Hold shift key and click me</button>
<pre ng-bind="message"></pre>

```

The service lets you know whether the following keys are pressed :

* `shift`, `ctrl`, `alt`
* `up`, `down`, `right`, `left` arrows
* `pgUp`, `pgDown`
* `space`, `escape`, `enter`, `tab`

For other keys you can look to `Keydown.others[_theKeyCode_]`
For instance, `Keydown.others[65]` will equal `true` if the `a` key is down.

`Keydown.pressed` gives you the list of pressed keys.
For instance, if `a`, `b` and `c` keys are down, `Keydown.pressed` will equal `[65, 66, 67]`
