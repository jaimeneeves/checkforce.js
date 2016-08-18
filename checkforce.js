/**
 * @author Jaime Neves
 */
(function() {
	"use strict";

	var typeModule = 'browser';

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
		typeModule = 'node';

	var CheckForce = (function() {

		/**
		 * Construct Function
		 */
		var CheckPublic = function() {
			this.contentRendered = '';
			this.scores = 0;

			// Option defaults
			var defaults = {
				passIndex: 2,
				minimumChars: 8,
				maximumChars: 12,
				elementRender: null,
				locale: 'en',
				verdicts: {
					"en": ["Weak", "Normal", "Medium", "Strong"],
					"pt-br": ["Fraca", "Normal", "Média", "Forte"]
				},
				uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
				lowercase: "abcdefghijklmnopqrstuvwxyz",
				number: "0123456789",
				characters: "!@#$%^&*?_~",
				colors: ['#500', '#800', '#f60', '#050', '#5cb85c'],
				charsSpecialCheck: {
					haveChars: false,
					lengthChars: 0
				},
				numberCheck: {
					haveNumber: false,
					lengthNumber: 0
				},
				uppercaseCheck: {
					haveUppercase: false,
					lengthUppercase: 0
				},
				lowercaseCheck: {
					haveLowercase: false,
					lengthLowercase: 0
				}
			};

			// Create options by extending defaults with the passed in arugments
			if (arguments[0] && typeof arguments[0] === "object") {
				this.options = extendDefaults(defaults, arguments[0]);
			}
		};

		CheckPublic.prototype.runPassword = function(password) {
			this.options.password = password;

			this.scores = checkPassword.call(this);

			if (typeModule === 'browser')
				renderBrowser.call(this);

		};

		return CheckPublic;

	}());

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
		module.exports = CheckForce;
	else
		window.CheckForce = CheckForce;


	/**
	 * Renderized Browser
	 * @return {String}
	 */
	function renderBrowser() {
		var newDiv = document.createElement("div"),
			text = "",
			background = "",
			locale = this.options.locale;

		if (this.scores <= 30) {
			text = this.options.verdicts[locale][0];
			background = this.options.colors[1];
		}
		if (this.scores > 30 && this.scores <= 60) {
			text = this.options.verdicts[locale][1];
			background = this.options.colors[2];
		}
		if (this.scores > 60 && this.scores <= 80) {
			text = this.options.verdicts[locale][2];
			background = this.options.colors[3];
		}
		if (this.scores > 80) {
			text = this.options.verdicts[locale][3];
			background = this.options.colors[4];
		}

		var divRender = document.createElement("div");
		var contentBody = document.createTextNode(text);
		divRender.style["width"] = this.scores + "%";
		divRender.style["background"] = background;
		divRender.style["color"] = '#ffffff';
		divRender.appendChild(contentBody);

		this.contentRendered = divRender;
	}

	/**
	 * check length of the password
	 * @return {Integer}
	 */
	function lengthPassword() {

		var pwdlength = this.options.password ? this.options.password.length : 0,
			scores = 0;

		if (pwdlength > this.options.passIndex && pwdlength < this.options.minimumChars) {
			scores += 5;
		} else if ((pwdlength >= this.options.minimumChars) && (pwdlength <= this.options
				.maximumChars)) {
			scores += 10;
		} else if (pwdlength > this.options.maximumChars) {
			scores += 25;
		}
		// total 40
		//console.log(' length ', scores);
		return scores;
	}

	/**
	 * Check the letters in the password
	 * @return {Integer}
	 */
	function lettersPassword() {
		var password = this.options.password ? this.options.password : "",
			upperCount = countContain(password, this.options.uppercase),
			lowerCount = countContain(password, this.options.lowercase),
			scores = 0,
			haveLowercase = false,
			haveUppercase = false,
			lengthLowercase = 0,
			lengthUppercase = 0;

		if (upperCount === 0 && lowerCount !== 0) {
			scores += 10;
			haveLowercase = true;
			lengthLowercase = lowerCount;
		}
		if (lowerCount === 0 && upperCount !== 0) {
			scores += 10;
			haveUppercase = true;
			lengthUppercase = upperCount;
		}

		if (upperCount !== 0 && lowerCount !== 0) {
			scores += 20;
			haveLowercase = true;
			haveUppercase = true;
			lengthLowercase = lowerCount;
			lengthUppercase = upperCount;
		}

		this.options.lowercaseCheck.haveLowercase = haveLowercase;
		this.options.lowercaseCheck.lengthLowercase = lengthLowercase;
		this.options.uppercaseCheck.haveUppercase = haveUppercase;
		this.options.uppercaseCheck.lengthUppercase = lengthUppercase;
		// total 30
		//console.log('Has upper and lower: ', scores);
		return scores;
	}

	/**
	 * Check number in the password
	 * @param  {String} password
	 * @param  {String} numbers
	 * @return {Integer}
	 */
	function numberPassword() {
		var password = this.options.password ? this.options.password : "",
			numberCount = countContain(password, this.options.number),
			scores = 0;

		if (numberCount === 1 || numberCount === 2)
			scores += 10;

		if (numberCount >= 3)
			scores += 20;

		// total 30
		//console.log('number ', scores );
		this.options.numberCheck.haveNumber = numberCount !== 0 ? true : false;
		this.options.numberCheck.lengthNumber = numberCount;
		return scores;
	}

	/**
	 * Check characters special in the password
	 * @param  {String} password
	 * @param  {String} characters
	 * @return {Integer}
	 */
	function charactersPassword() {
		var password = this.options.password ? this.options.password : "",
			characterCount = countContain(password, this.options.characters),
			scores = 0;

		if (characterCount === 1)
			scores += 10;

		if (characterCount > 1)
			scores += 25;

		this.options.charsSpecialCheck.haveChars = scores > 0 ? true : false;
		this.options.charsSpecialCheck.lengthChars = scores > 0 ? characterCount : 0;

		// total 30
		//console.log('Character special: ', scores);
		return scores;
	}

	function checkPassword() {
		var scores = 0,
			password = this.options.password ? this.options.password : "";

		// Check Length
		scores += lengthPassword.call(this);

		// Check Letters
		scores += lettersPassword.call(this);

		// Check Numbers
		scores += numberPassword.call(this);

		// Check Characters
		scores += charactersPassword.call(this);

		return scores;
	}

	// Checks a string for a list of characters
	function countContain(strPassword, strCheck) {
		var count = 0,
			lengthPwd = strPassword.length;

		for (var i = 0; i < lengthPwd; i++) {
			if (strCheck.indexOf(strPassword.charAt(i)) > -1) {
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

}());
