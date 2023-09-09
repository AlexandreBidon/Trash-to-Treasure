function fitToContainer(canvas){
    canvas.style.width='100%';
    canvas.style.height='100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }


const renderImage = function ( ctx, img, dx, dy, angle, scale ) {
    var canvas = ctx.canvas ;
    var hRatio = canvas.width  / img.width    ;
    var vRatio =  canvas.height / img.height  ;
    var ratio  = Math.min ( hRatio, vRatio );

    const centerX = img.width * ratio * scale / 2.0;
    const centerY = img.height * ratio * scale / 2.0;

    // save context's current transform state
    ctx.save();

    // move context's origin to image position
    ctx.translate( dx * ctx.canvas.width, dy * ctx.canvas.height);

    // apply transformations
    ctx.rotate( angle );
    ctx.scale( scale, scale );

    // draw image centered on its position
    ctx.drawImage( img, -centerX, -centerY, img.width * ratio * scale, img.height * ratio * scale );

    // restore context's previous transform state
    ctx.restore();

    return [ dx * ctx.canvas.width - centerX, dy * ctx.canvas.height - centerY , img.width * ratio * scale, img.height * ratio * scale]
};

export {
    fitToContainer,
    renderImage
}