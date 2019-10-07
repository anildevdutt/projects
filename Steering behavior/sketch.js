
let v;
let f = 1;

function setup() {
    createCanvas(800, 600);
    v = new Vehicle();
}


function draw() {
    background(0);   
    //f == 1 ? v.seek() : v.flee();
    v.wander();
    v.show();
}

function mouseClicked() {
    f == 1 ? f = 2 : f = 1;
    v.target = createVector(mouseX, mouseY);
}
