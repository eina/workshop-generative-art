const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  const colorCount = random.rangeFloor(1, 6);
  const palette = random.shuffle(random.pick(palettes).slice(0, colorCount));
  console.log(palette);

  // returns points on a grid
  const createGrid = () => {
    const points = [];
    const count = 40;

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        // between 0 and 1
        // 0.5, 0.5 should be the center
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);

        points.push({
          color: random.pick(palette),
          radius: Math.abs(0.0035 + random.gaussian() * 0.01),
          position: [u, v],
        });
      }
    }

    return points;
  };

  // set the seed so it stays the same
  // while using randomness
  random.setSeed("once upon another time");
  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 300;

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    points.forEach((data) => {
      const { color, position, radius } = data;
      const [u, v] = position;
      // scaling points up back to pixel size
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      // context.strokeStyle = "black";
      // context.lineWidth = 20;
      context.fillStyle = color;
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
