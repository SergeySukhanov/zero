/**
 * @author SNSukhanov
 */

function stopAnimation() {
    clearInterval(animateID);
}

function animate(pies) {
    function frame() {
        for (i = 0; i < pies.length; i++) {
            // bounce off the walls
            if (pies[i].origin.x <= 0 || pies[i].origin.x >= w) {
                velos[i].x *= -1;
            }
            if (pies[i].origin.y <= 0 || pies[i].origin.y >= h) {
                velos[i].y *= -1;
            }

            pies[i].origin.add(velos[i]);
            pies[i].draw();
        }
    }

    animateID = setInterval(frame, 10) // draw every 10ms
}

//***** Vector *****//
function Vect(p) {
    this.x = p.x;
    this.y = p.y;

    this.mag = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    this.heading = function () {
        return Math.tan(y / x);
    };
}

//***** Point *****//
function Point(x, y) {
    this.x = x;
    this.y = y;

    this.add = function (pt) {
        this.x += pt.x;
        this.y += pt.y;
    };
    this.sub = function (pt) {
        this.x -= pt.x;
        this.y -= pt.y;
    };
    this.mult = function (n) {
        this.x *= n;
        this.y *= n;
    };
    this.div = function (n) {
        this.x /= n;
        this.y /= n;
    }
}

//***** Slice *****//
function Slice(origin, point1, point2) {
    this.o = origin;
    this.p1 = point1;
    this.p2 = point2;
}

//***** Pie *****//
function Pie(origin, slices_count, id) {
    this.origin = origin;
    this.id = id;
    this.slices = [];

    // make slices
    var total_angle = 0;
    var point1 = get_offscreen_point(origin, total_angle);
    var start_point = point1;


    for (var i = 0; i < slices_count; i++) {
        var angle = get_random_angle(slices_count);
        total_angle += ( ( total_angle + angle ) >= 2 * Math.PI ) ? 0 : angle;
        var point2 = get_offscreen_point(origin, total_angle);

        // close it if last slice
        if (i == slices_count - 1) {
            point2 = start_point;
        }
        this.slices.push(new Slice(origin, point1, point2));
        point1 = point2;
    }

    // update the origin and slices
    this.setOrigin = function (new_origin) {
        this.origin = new_origin;

        for (var i = 0; i < this.slices.length; i++) {
            this.slices[i].o = this.origin;
        }
    };

    this.draw = function () {
        var parent = document.getElementById("pies");
        if (!parent) return;
        var defs = document.getElementById("defs");

        // if it no exist, create it!
        var pie_node = document.getElementById(this.id);
        if (pie_node == null) {
            pie_node = document.createElementNS(NS, "g");
            pie_node.setAttribute("id", this.id);
            parent.appendChild(pie_node);
        }

        for (var i = 0; i < this.slices.length; i++) {

            // make or update path in defs
            var id = this.id + "_path_" + i;
            // get or create path
            var is_new = false;
            var path = document.getElementById(id);
            if (path == null) {
                path = document.createElementNS(NS, "path");
                path.setAttribute("id", id);
                path.setAttribute("class", 'path');
                defs.appendChild(path);
                is_new = true;
            }

            // path data
            var d =
                    "M" + Math.round(this.slices[i].o.x) + ", " + Math.round(this.slices[i].o.y) +
                            "L" + Math.round(this.slices[i].p1.x) + ", " + Math.round(this.slices[i].p1.y) +
                            "L" + Math.round(this.slices[i].p2.x) + ", " + Math.round(this.slices[i].p2.y) +
                            "Z";
            path.setAttribute("d", d);

            // randomly opaque if new
            if (is_new) {
                var fill_opacity = Math.random() * .25;
                path.setAttribute("fill-opacity", fill_opacity);
//				path.setAttribute("start_fill-opacity",fill_opacity);
            }

            // make or update use
            var use = document.getElementById("use_" + id);
            if (use == null) {
                use = document.createElementNS(NS, "use");
                pie_node.appendChild(use);
            }
            use.setAttribute("id", "use_" + id);
            use.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#" + id);
        }
    }
}
//***** UTILITIES *****//

// given a number of pie slices
// return a random but not too random slice theta
function get_random_angle(c) {
    return 2 * Math.PI / c * ( Math.random() + .5 );
}

// given an origin and an angle
// return a point that is definitely off-screen
function get_offscreen_point(origin, angle) {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var radius = Math.sqrt(w * w + h * h); // x^2 + y^2 = z^2
    return new Point(origin.x + Math.cos(angle) * radius, origin.y + Math.sin(angle) * radius);
}

//Box-Muller transform for standard normal distribution random numbers
function rnd_bmt() {
    var x = 0, y = 0, rds, c;

    // Get two random numbers from -1 to 1.
    // If the radius is zero or greater than 1, throw them out and pick two new ones
    // Rejection sampling throws away about 20% of the pairs.
    do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        rds = x * x + y * y;
    }
    while (rds == 0 || rds > 1)

    // This magic is the Box-Muller Transform
    c = Math.sqrt(-2 * Math.log(rds) / rds);

    // It always creates a pair of numbers. I'll return them in an array.
    // This function is quite efficient so don't be afraid to throw one away if you don't need both.
    return new Point(x * c, y * c);
}

function rdm(n) {
    var sign = Math.random() < .5 ? -1 : 1;
    return sign * Math.random() * n;
}