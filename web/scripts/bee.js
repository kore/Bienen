var Bee = function(canvas) {
    this.canvas = canvas;
    this.element = null;

    this.offset = null;
    this.startPosition = null;
    this.startDirection = null;
    this.position = null;
    this.direction = null;
};

Bee.prototype.create = function(offset, color) {
    var beeData = [
            {"type": "path", "path": "m22.938 15.675c-1.629-5.9535-6.456-9.8209-10.781-8.6376", "stroke": "#000", "stroke-linecap": "round", "stroke-width": .7, "fill": "none"},
            {"type": "path", "path": "m24.768 15.675c1.629-5.9535 6.456-9.8209 10.781-8.6376", "stroke": "#000", "stroke-linecap": "round", "stroke-width": .7, "fill": "none"},
            {"type": "path", "path": "m14.377 39.136a8.1232 11.182 66.354 0 0 6.985 -11.926 8.1232 11.182 66.354 0 0 -13.501 -2.957 8.1232 11.182 66.354 0 0 -6.9852 11.926 8.1232 11.182 66.354 0 0 13.501 2.957z", "stroke": "#000", "stroke-linecap": "round", "stroke-width": .7, "fill": "#fff"},
            {"type": "path", "path": "m33.645 39.136a11.182 8.1232 23.646 0 1 -6.985 -11.926 11.182 8.1232 23.646 0 1 13.501 -2.957 11.182 8.1232 23.646 0 1 6.985 11.926 11.182 8.1232 23.646 0 1 -13.501 2.957z", "stroke": "#000", "stroke-linecap": "round", "stroke-width": .7, "fill": "#fff"},
            {"type": "path", "path": "m29.983 20.145a6.0486 6.6403 0 0 1 -6.0486 6.6403 6.0486 6.6403 0 0 1 -6.0486 -6.6403 6.0486 6.6403 0 0 1 6.0486 -6.6403 6.0486 6.6403 0 0 1 6.0486 6.6403z", "stroke": "#000", "stroke-linecap": "round", "stroke-width": .7, "fill": "#fff"},
            {"type": "path", "path": "m29.26 20.145a5.3254 5.8464 0 0 1 -5.3254 5.8464 5.3254 5.8464 0 0 1 -5.3254 -5.8464 5.3254 5.8464 0 0 1 5.3254 -5.8464 5.3254 5.8464 0 0 1 5.3254 5.8464z", "fill": color, "stroke": "none"},
            {"type": "path", "path": "m32.054 29.455a8.1196 11.177 0 0 1 -8.12 11.177 8.1196 11.177 0 0 1 -8.119 -11.177 8.1196 11.177 0 0 1 8.119 -11.177 8.1196 11.177 0 0 1 8.12 11.177z", "stroke": "#000", "stroke-linecap": "round", "stroke-width": .7, "fill": "#fff"},
            {"type": "path", "path": "m31.403 29.455a7.4688 10.281 0 0 1 -7.469 10.281 7.4688 10.281 0 0 1 -7.468 -10.281 7.4688 10.281 0 0 1 7.468 -10.281 7.4688 10.281 0 0 1 7.469 10.281z", "fill": color, "stroke": "none"},
            {"type": "path", "path": "m23.78 20.268c-1.1645 0-2.3139 0.06525-3.445 0.19164a7.4688 10.281 0 0 0 -2.5776 3.2194c1.9397-0.42414 3.9544-0.6497 6.0226-0.6497 2.1895 0 4.3196 0.25083 6.3636 0.72467a7.4688 10.281 0 0 0 -2.5433 -3.2499c-1.2519-0.15548-2.5268-0.23604-3.8204-0.23604z", "stroke": "none", "fill": "#000"},
            {"type": "path", "path": "m23.78 25.791c-2.4124 0-4.7604 0.2789-7.0137 0.80556a7.4688 10.281 0 0 0 -0.3004 2.8586 7.4688 10.281 0 0 0 0.0016 0.0613c2.3308-0.62746 4.7817-0.96412 7.3125-0.96412 2.6415 0 5.1966 0.36507 7.6183 1.0466a7.4688 10.281 0 0 0 0.0052 -0.14382 7.4688 10.281 0 0 0 -0.27919 -2.7797c-2.354-0.578-4.814-0.885-7.344-0.885z", "stroke": "none", "fill": "#000"},
            {"type": "path", "path": "m23.78 31.314c-2.4269 0-4.7886 0.28226-7.0543 0.81509a7.4688 10.281 0 0 0 0.82426 2.6411c2.0032-0.45404 4.0881-0.69482 6.2301-0.69482 2.2414 0 4.4201 0.26401 6.5083 0.7599a7.4688 10.281 0 0 0 0.83631 -2.6366c-2.354-0.57795-4.8139-0.88466-7.3446-0.88466z", "stroke": "none", "fill": "#000"},
            {"type": "path", "path": "m23.78 36.836c-1.6144 0-3.2 0.1251-4.7476 0.36548a7.4688 10.281 0 0 0 3.8196 2.4127c0.30826-0.01001 0.61727-0.0169 0.92799-0.0169 0.40054 0 0.79854 0.01037 1.195 0.02696a7.4688 10.281 0 0 0 3.8205 -2.38c-1.6324-0.26836-3.3078-0.40826-5.0155-0.40826z", "stroke": "none", "fill": "#000"},
            {"type": "path", "path": "m32.346 29.789c1.6736-0.13747 3.4856 0.04009 5.306 0.57874 3.6029 1.0661 6.4084 3.3008 7.7654 5.8562", "stroke": "#000", "stroke-linecap": "round", "stroke-width": .7, "fill": "none"},
            {"type": "path", "path": "m15.593 29.789c-1.6736-0.13747-3.4856 0.04009-5.306 0.57874-3.6029 1.0661-6.4084 3.3008-7.7654 5.8562", "stroke": "#000", "stroke-linecap": "round", "stroke-width": .7, "fill": "none"}
        ];

    this.offset = offset;
    this.element = this.canvas.add(beeData);

    this.element.transform("R0,24,24T" + (this.canvas.width / 2) + "," + (this.canvas.height / 2));
    return this;
}

Bee.prototype.setColor = function(color) {
    this.element.items[5].attr("fill", color);
    this.element.items[7].attr("fill", color);
}

Bee.prototype.getTransformationString = function(position, direction, wiggle = false) {
    var wiggleFactor = wiggle ? Math.ceil(Math.random() * 40 - 20) : 0;

    return "R" + (direction + wiggleFactor)  + ",24,24" +
        "T" + 
        (this.offset[0] + (position[0] * 50 + 25) - 24) + "," + 
        (this.offset[1] + (position[1] * 50 + 25) - 24);
};

Bee.prototype.move = function(position, direction, finishedCallback) {
    this.position = position;
    this.direction = direction;

    this.element.animate(
        {transform: this.getTransformationString(position, direction, true)},
        300,
        'linear',
        finishedCallback
    );
};

Bee.prototype.moveToStart = function(position, direction) {
    this.startPosition = this.position = position;
    this.startDirection = this.direction = direction;

    this.element.transform(this.getTransformationString(position, direction));
}

Bee.prototype.crashAnimation = function(finishedCallback) {
    this.element.animate(
        {transform: this.getTransformationString(this.position, this.direction - 20)},
        200,
        "linear",
        (function() {
        this.element.animate(
            {transform: this.getTransformationString(this.position, this.direction + 20)},
            200,
            "linear",
            (function() {
            this.element.animate(
                {transform: this.getTransformationString(this.position, this.direction - 20)},
                200,
                "linear",
                (function() {
                this.element.animate(
                    {transform: this.getTransformationString(this.position, this.direction + 20)},
                    200,
                    "linear",
                    finishedCallback.bind(this));
                }).bind(this));
            }).bind(this));
        }).bind(this)
    );
};
