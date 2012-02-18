function Renderer() {
    this.aspectRatio = 16 / 9;
    this.textures = new Array();
    this.boundTexture = null;
    this.gameWidth = 0;
    this.gameHeight = 0;
    this.unitsPerColumn = 20;
    this.unitsPerRow = 20;
    this.pixelsPerUnit = 0;
}

// callback(error:bool, image:Image)
Renderer.prototype.fetchTexture = function(url, callback) {
    var _this = this;
    var image = new Image();
    image.onerror = function() {
        console.log("error: failed to load image from: "+ url);
        if (callback) {
            callback(true, image);
        }
        image.onload = null;
    }
    image.onload = function() {
        _this.textures[url] = image;
        if (callback) {
            callback(false, image);
        }
        image.onerror = null;
    }
    image.src = url;
}

Renderer.prototype.screenSpace = function(input) {
    return input * this.pixelsPerUnit;
}

Renderer.prototype.bindTexture = function(url) {
    var texture = this.textures[url];
    if (texture) {
        this.boundTexture = texture;
    } else {
        this.fetchTexture(url);
        console.log("warning: image("+url+") was not loaded, yet. Please load it before you use it")
    }
}

Renderer.prototype.drawLine = function(vertices) {
    
}

Renderer.prototype.setColor = function(color) {
    
}

Renderer.prototype.setLineWidth = function(lineWidth) {

}

Renderer.prototype.resizeCanvas = function(size, isWidth) {

}

Renderer.prototype.resizeToWindow = function() {
	var isWidth = ($(window).width() / $(window).height()) < this.aspectRatio;
	this.resizeCanvas(isWidth ? $(window).width() : $(window).height(), isWidth);
}
