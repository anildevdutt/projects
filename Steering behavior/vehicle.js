class Vehicle {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.target = p5.Vector.random2D();
        this.maxSpeed = 2;
        this.maxForce = 0.5;
        this.n = 0;
        this.wanderAngle = 0;
    }

    seek() {        
        let desiredVelocity = p5.Vector.sub(this.target, this.position);
        let dist = desiredVelocity.mag();
        let steering = p5.Vector.sub(desiredVelocity, this.velocity);
        steering.limit(this.maxForce);
        this.velocity.add(steering);
        let speed;
        dist <= this.slowRadious ? speed = map(dist, 0, this.slowRadious, 0, this.maxSpeed) : speed = this.velocity.limit(this.maxSpeed);
        this.velocity.limit(speed);
        this.position = this.position.add(this.velocity);        
    }

    flee() {
        let desiredVelocity = p5.Vector.sub(this.position, this.target);
        let steering = p5.Vector.sub(desiredVelocity, this.velocity);
        steering.limit(this.maxForce);
        this.velocity.add(steering);
        this.velocity.limit(this.maxSpeed);
        this.position = this.position.add(this.velocity);        
    }

    boundries() {
        if(this.position.x > width) this.position.x = 0;
        if(this.position.y > height) this.position.y = 0;
        if(this.position.x < 0) this.position.x = width;
        if(this.position.y < 0) this.position.y = height;
    }

    wander() {
        // let wcircle = this.velocity.copy();
        // wcircle.normalize();
        // wcircle.mult(this.cRadious);
        // let disp = p5.Vector.fromAngle(this.wanderAngle, 1);
        // disp.mult(this.cRadious);
        // this.wanderAngle += random(-0.5, 0.5);
        // let wander = wcircle.add(disp);

        let desiredVelocity = p5.Vector.sub(this.target, this.position);
        let dist = desiredVelocity.mag();
        this.wanderAngle += map(noise(this.n), 0, 1, - PI / 60, PI / 60);
        let steering = p5.Vector.fromAngle(this.wanderAngle, 1);
        this.n += this.maxSpeed * 0.02;
        steering.limit(this.maxForce);
        this.velocity.add(steering);
        let speed;
        dist <= this.slowRadious ? speed = map(dist, 0, this.slowRadious, 0, this.maxSpeed) : speed = this.velocity.limit(this.maxSpeed);
        this.velocity.limit(speed);
        this.position = this.position.add(this.velocity);      
        this.boundries();  
    }

    show() {
        stroke(255);
        strokeWeight(2);        
        ellipse(this.position.x, this.position.y, 5, 5);
    }
}
