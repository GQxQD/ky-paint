import KyPaint from "./ky-paint";

const paint = new KyPaint({
    width: 800,
    height: 600,
    backgroundColor: '#138b13'
});

const rect = new KyPaint.Rect({
    x: 90,
    y: 50,
    width: 200,
    height: 100,
    fill: '#6b5d1f'
});

paint.add(rect);

// rect.moveTo(new KyPaint.Point(0, 0));

// for (let i = 0; i < 400; i += 1) {
//     setTimeout(() => {
//         rect.moveTo(new KyPaint.Point(i, i));
//     }, i * 40)
// }

const r2 = new KyPaint.Rect({
    x: 100,
    y: 10,
    width: 100,
    height: 200,
    fill: '#505050',
});

paint.add(r2);


const c = new KyPaint.Circle({
    x: 100,
    y: 100,
    radius: 100,
    fill: '#9c3200'
});

paint.add(c);

// for (let i = 400; i > 0; i -= 1) {
//     setTimeout(() => {
//         r2.moveTo(new KyPaint.Point(i, i));
//     }, (400 - i) * 40)
// }
// @ts-ignore
window.paint = paint;
document.body.append(paint.getCanvas());
