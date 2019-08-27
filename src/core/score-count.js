export default class ScoresCount {

  constructor(options, sizePassword) {
    this.options = options
    this.sizePassword = sizePassword
    this.scores = 0
  }

  /**
   * Increment score
   * @param {Integer} increment 
   */
  scoresUp(increment) {
    this.scores += increment
  }

  /**
   * Check length of the password
   */
  passwordSize () {
    if (this.sizePassword > this.options.maximumChars) {
      this.scores = this.scoresUp(25)
    }

    if ((this.sizePassword > this.options.passIndex) && (this.sizePassword < this.options.minimumChars)) {
      this.scores = this.scoresUp(5)
    }
    
    if ((this.sizePassword >= this.options.minimumChars) && (this.sizePassword <= this.options.maximumChars)) {
      this.scores = this.scoresUp(10)
    }
  
  }

  getScores() {
    return this.scores
  }

}