(function(){
  "use strict";

  var PassGen = function(){
    // SINGLETON PATTERN (4 rida)
    if(PassGen.instance){
      return PassGen.instance;
    }
    PassGen.instance = this;

    this.passwords = [];
    this.password_length = null;

    this.container = document.querySelector('#container');

    //panen rakenduse tööle
    this.init();
  };

  //Teeme muutuja avalikuks
  window.PassGen = PassGen;



  //kõik moosipurgi funktsioonid tulevad siia sisse
  PassGen.prototype = {
    init: function(){
      console.log('rakendus käivitus');
      //Kuulan nupuvajutust
      document.querySelector('#generate').addEventListener('click', this.generatePasswords.bind(this));
    },

    generatePasswords: function() {
      //Teeme massiivi tühjaks
      this.passwords = [];

      this.password_length = document.querySelector('#pass-length').value;
      console.log("Olemas " + this.password_length);
      //Paroolide arv
      var count = 10;

      for(var i = 0; i < count; i++) {
        //Random index
        var random_index = Math.round(Math.random() * words[this.password_length].length);
        //console.log(random_index);
        var password = words[this.password_length][random_index];
        this.passwords.push(crypt(password));
      }
      this.printPasswords();
    },
    printPasswords: function() {
      this.container.innerHTML = "";

      for(var i = 0; i < this.passwords.length; i++) {
        var element = document.createElement('li');
        var text = document.createTextNode(this.passwords[i]);
        element.appendChild(text);
        this.container.appendChild(element);
      }
    }

  };

  var crypt = function(word) {
    var length = word.length;

    word = word.replace('i', '1');
    word = word.replace('o', '0');
    if(length === 6) {
      word += Math.round(Math.random() * 10);
      word += Math.round(Math.random() * 10);
    } else if(length === 12) {
      word += Math.round(Math.random() * 10);
      word += Math.round(Math.random() * 10);
      word += Math.round(Math.random() * 10);
      word += Math.round(Math.random() * 10);
      
    }
    return word;

  };

  window.crypt = crypt;

  window.onload = function(){
    var app = new PassGen();
  };

})();
