// Powered by (cdpn.io/CBwhg)
var DrawEye = function(eyecontainer, pupil, eyeposx, eyeposy, eyer){
    $(".caricature-page .eyes").append("<div id='" + eyecontainer + "'><div id='" + pupil + "'></div></div>")

    eyecontainer = "#" + eyecontainer;
    pupil = "#" + pupil;

    // $(eyecontainer).css({left: eyeposx, top:eyeposy});
    $(eyecontainer).css({marginLeft: eyeposx, marginTop: eyeposy});
    $(pupil).css({width:eyer*0.4,height:eyer*0.4});
    $(eyecontainer).css({width:eyer,height:eyer});
    $(pupil).css({position: 'relative', background: '#000000', 'border-radius':'50%'});
    $(eyecontainer).css({position:'absolute', background:'#E2DEE9', overflow:'hidden', 'border-radius': '50%'});
    // $(eyecontainer).css({position:'absolute', border:'1px solid red', overflow:'hidden', 'border-radius': '50%'});
    // $(eyecontainer).css({position:'absolute', overflow:'hidden', 'border-radius': '50%'});

    // Initialise core variables
    var r = $(pupil).width()/2;
    var center = {
        x: $(eyecontainer).width()/2 - r,
        y: $(eyecontainer).height()/2 - r
    };
    var distanceThreshold = $(eyecontainer).width()/2 - r;
    var mouseX = center.x, mouseY = center.y;

    // Listen for mouse movement
    $(window).mousemove(function(e){
        // console.log($(eyecontainer).position().left);
        var d = {
            x: e.pageX - r - ($(eyecontainer).position().left + eyeposx ) - center.x,
            y: e.pageY - r - ($(eyecontainer).position().top + eyeposy) - center.y
        };
        var distance = Math.sqrt(d.x*d.x + d.y*d.y);
        if (distance < distanceThreshold) {
            mouseX = e.pageX - eyeposx - r;
            mouseY = e.pageY - eyeposy - r;
        } else {
            mouseX = d.x / distance * distanceThreshold + center.x;
            mouseY = d.y / distance * distanceThreshold + center.y;
        }
    });

    // Update pupil location
    var pupil = $(pupil);

    var xp = center.x, yp = center.y;

    var loop = setInterval(function(){
        // change 1 to alter damping/momentum - higher is slower
        xp += (mouseX - xp) / 2;
        yp += (mouseY - yp) / 2;
        pupil.css({left:xp, top:yp});
    }, 1);
};

var eyeLeft = new DrawEye("eyeLeft", "pupilLeft", 252, 76.5, 12);
var eyeRight = new DrawEye("eyeRight", "pupilRight", 278, 69, 12);
