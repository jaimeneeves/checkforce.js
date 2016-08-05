(function() { "strict mode";

	// Construtor
	this.CheckForce = function() {

		// Global Element
		this.input = null;

		// Option defaults
		var defaults = {
			colors: ['#ccc','#500','#800','#f60','#050','#0f0'],
			minimumChars : 8,
			maximumChars : 12,
			verdicts		 : ["Weak", "Normal", "Medium", "Strong", "Very Strong"],
			upperCase    : "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
			lowerCase    : "abcdefghijklmnopqrstuvwxyz",
			number 		   : "0123456789",
			characters   : "!@#$%^&*?_~"
		};

		// Create options by extending defaults with the passed in arugments
    if (arguments[0] && typeof arguments[0] === "object") {
      this.options = extendDefaults(defaults, arguments[0]);
    }

	}

	CheckForce.prototype.runPassword = function(password) {
		this.options.password = password;

		var scores = checkPassword.call(this);

		console.log('Total: ', scores);
	}

	function checkPassword(){
		var scores = 0,
		password 	= this.options.password ? this.options.password : "",
		pwdlength = this.options.password ? this.options.password.length : 0;

		if(!password)
			return scores;

		// Password Length
		if(pwdlength < this.options.minimumChars){
			scores += 5;
			console.log('smaller: 5');
			console.log('------');
		}
		else if((pwdlength >= this.options.minimumChars) && (pwdlength <= this.options.maximumChars)){
			scores += 10;
			console.log(' larger minimum: 10');
			console.log('------');
		}
		else if(pwdlength > this.options.maximumChars){
			scores += 25;
			console.log('largar maximum: 25');
			console.log('------');
		}

		// Letters
		var upperCount = countContain(password, this.options.upperCase),
				lowerCount = countContain(password, this.options.lowerCase)
				LowerUpperCount = lowerCount + upperCount;

		if(upperCount === 0 && lowerCount !== 0){
			scores += 10;
			console.log('Has lower: 10');
			console.log('------');
		}
		if(lowerCount === 0 && upperCount !== 0){
			scores += 10;
			console.log('Has upper: 10');
			console.log('------');
		}
		else if(upperCount !== 0 && lowerCount !== 0){
			scores += 20;
			console.log('Has upper and lower: 20');
			console.log('------');
		}

		// Numbers
		var numberCount = countContain(password,this.options.number);

		if(numberCount === 1){
				scores += 10;
				console.log('Has number: 10');
				console.log('------');
		}

		if(numberCount >= 3){
			scores += 20;
			console.log('Number larger: 20');
			console.log('------');
		}

		// Characters
		var characterCount = countContain(password,this.options.characters);

		if(characterCount === 1){
			scores += 10;
			console.log('Character special: 10');
			console.log('------');
		}

		if(characterCount > 1){
			scores += 25;
			console.log('Character special larger: 25');
			console.log('------');
		}

			// Extra
	    // Letters and numbers
	    // if (numberCount != 0 && LowerUpperCount != 0)
	    //     scores += 2;

	    // -- Letters, numbers, and characters
	    // if (numberCount != 0 && LowerUpperCount != 0 && characterCount != 0)
	    //     scores += 3;

	    // -- Mixed case letters, numbers, and characters
	    // if (numberCount !== 0 && upperCount !== 0 && lowerCount !== 0 && characterCount !== 0)
	    //     scores += 5;

		return scores;
	}

	function runPassword(){

	}

	// Checks a string for a list of characters
	function countContain(strPassword, strCheck){
		// Declare variables
		var count = 0;
		for (var i = 0; i < strPassword.length; i++){
			if (strCheck.indexOf(strPassword.charAt(i)) > -1){
				count++;
			}
		}
		return count;
	}

	// Utility method to extend defaults with user options
  function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }

	// var input 		= document.querySelector("#check");
	// var uppercase = document.querySelector("#uppercase");
	// var lowercase = document.querySelector("#lowercase");
	//
	// var characters = 8;
	//
	// console.log(uppercase.checked);
	// console.log(lowercase.checked);
	// function check(element){
	//
	// }

}(window));
