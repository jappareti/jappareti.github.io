//// 1. Define Space and Form
var colors = {
  a1: "#b92044", a2: "#2b8d5b", a3: "#2233b0", a4: "#6c6026",
  b1: "#96bfed", b2: "#f5ead6", b3: "#f1f3f7", b4: "#e2e6ef"
};
var space = new CanvasSpace("demo", "#222" ).display();
var form = new Form( space );


//// 2. Create Elements
var mouse = new Circle( space.size.$divide(2) );
var pts = [];
var lines = [];
var rows = 50;
var dotsPerRow = 40;
var rowSpacing = .03;

for (var j=0; j<rows; j++) {
  for (var i=0; i<dotsPerRow; i++) {
    pts.push( space.size.$multiply( Math.random(), (j/rows +rowSpacing) ) );
  }
}

//// 3. Visualize, Animate, Interact
space.add({
  animate: function(time, fps, context) {

    // change mouse radius
    mouse.setRadius( mouse.y/space.size.y * 200 + 70 );
    form.stroke(false);

    // go through each point
    for (var i=0; i<pts.length; i++) {

      var size = 1.3;
      var _p = pts[i].clone();

      // if intersecting with mouse circle, change its size and scale from mouse anchor point
      if (mouse.intersectPoint( pts[i]) ) {
        var dist =  (mouse.radius - pts[i].distance( mouse )) / mouse.radius;
        // size = dist * 20;
        form.fill( colors["a"+(i%4+1)] );
        // _p.scale2D( 1+dist, 1+dist, mouse );
        form.line( new Line(pts[i]).to(mouse));

      } else {
        form.fill( "#4d4d4d" );
      }

      // draw points
      form.point( _p, size, true );

    }
  },
  onMouseAction: function(type, x, y, evt) {
    if (type=="move") {
      mouse.set(x,y);
    }
  }
});

// 4. Start playing
space.bindMouse();
space.play();

$(function() {

   // $( "#projects a" ).each(function( index ) {
   //   if($(this).attr('data-img')) {
   //     var $imgSrc = $(this).attr('data-img');
   //     $(this).prepend('<img id="screenshot" src="' + $imgSrc + '" />');
   //   }
   // });
   // $img.hide();
  
   $('#projects a').mousemove(function(e) {
     var $img = $(this).find('.screenshot');
     // if($(this).attr('data-img')) {
     //   var $img = $(this).attr('data-img');
     //   $(this).prepend('<img id="screenshot" src="' + $img + '" />');
       // console.log($img);
       $img.stop(1, 1).fadeIn();
       // console.log("$img.outerWidth()is: " + $img.outerWidth());
       $img.offset({
           top: e.pageY - $img.outerHeight(),
           // left: e.pageX - ($img.outerWidth())
           // left: e.pageX
       });
     // }
       
   }).mouseleave(function() {
     var $img = $(this).find('.screenshot');
       $img.fadeOut();
       // $("#screenshot").fadeOut();
   });
 });
