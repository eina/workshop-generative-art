const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: "A4",
  units: "cm",
  pixelsPerInch: 300,
  // dimensions: [2048, 2048],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "steelblue";
    context.fillRect(0, 0, width, height);

    // circle
    // start with a path
    context.beginPath();
    // Math.PI * 2 = the end point, Math.PI is a semicircle
    context.arc(width / 2, height / 2, width * 0.2, 0, Math.PI * 2, false);

    context.fillStyle = "lightsteelblue";
    context.fill();

    context.lineWidth = width * 0.05;
    context.strokeStyle = "blue";
    context.stroke();
  };
};

canvasSketch(sketch, settings);
