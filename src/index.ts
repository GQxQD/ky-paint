import KyPaint from './ky-paint';

const paint = new KyPaint({
    width: 800,
    height: 600,
    backgroundColor: '#bfbfbf',
});

const rect = new KyPaint.Rect({
    x: 90,
    y: 50,
    text: 'A 4x3',
    width: 80,
    height: 60,
    stroke: '#000',
    fill: '#ffb3da',
});

paint.add(rect);

const r2 = new KyPaint.Rect({
    x: 100,
    y: 10,
    text: 'B 3x4',
    width: 60,
    height: 80,
    stroke: '#000',
    fill: '#d6ffb3',
});

paint.add(r2);


const c = new KyPaint.Circle({
    x: 100,
    y: 100,
    radius: 100,
    stroke: '#000',
    fill: '#ffb08e',
});

// paint.add(c);

const r3 = new KyPaint.Rect({
    x: 10,
    y: 10,
    width: 500,
    height: 400,
    stroke: '#000',
});

paint.add(r3);

// paint.add(generateBlock(2, 4));
// paint.add(generateBlock(3, 4));

const blocks = {
    A: [2, 4],
    B: [3, 4],
    C: [4, 4],
    D: [5, 4],
    E: [6, 4],
    F: [4, 7],
    G: [5, 7],
    H: [2, 6],
    J: [3, 6],
    K: [3, 5],
    L: [2, 5],
};

function getBlock(type: string) {
    // @ts-ignore
    const size = blocks[type];
    if (size) {
        return generateBlock(size[0], size[1], type + ' ' + size[0] + 'x' + size[1]);
    }
}

paint.add(getBlock('A'));
paint.add(getBlock('B'));
paint.add(getBlock('C'));
paint.add(getBlock('D'));

// @ts-ignore
window.paint = paint;
document.body.append(paint.getCanvas());

function generateBlock(w: number, h: number, text?: string) {
    return new KyPaint.Rect({
        x: 0, y: 0,
        width: w * 20,
        height: h * 20,
        text: text || (w + 'x' + h),
        stroke: '#000',
        fill: '#fff',
    });
}
