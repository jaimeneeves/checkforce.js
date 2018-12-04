
class ProgressHtml {
  constructor (width, classBg, text) {
    this.width = width
    this.classBg = classBg
    this.text = text

    this.progressBar = document.createElement('div')
    this.mountProgressBar()
  }

  mountProgressBar () {
    this.progressBar.setAttribute('class', this.classBg)
    this.progressBar.setAttribute('style', 'width:' + this.width + '%')
    this.progressBar.setAttribute('role', 'progressbar')
    this.progressBar.setAttribute('aria-valuemax', 100)
    this.progressBar.innerHTML = this.text
  }

  getProgressBar () {
    return this.progressBar
  }
}

export default ProgressHtml
