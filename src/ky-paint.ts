import {KyPaintOptions} from './types/ky-paint';
import Point from './utils/point';
import KyPaintObject from './components/ky-paint-object';
import KyPaintRect from './components/ky-paint-rect';
import Timeout = NodeJS.Timeout;
import KyPaintCircle from './components/ky-paint-circle';

class KyPaint {

    public static Point = Point;
    public static Rect = KyPaintRect;
    public static Circle = KyPaintCircle;

    private $options: KyPaintOptions;
    private readonly $el: HTMLCanvasElement;
    private readonly $ctx: CanvasRenderingContext2D;
    private $layouts: Array<KyPaintObject> = [];
    private $timer: Timeout;
    private $delay: number = 0;
    private $isMouseDown: boolean = false;
    private $selected: KyPaintObject = null;
    private $objPoint: Point;
    private $selectedPoint: Point;

    public constructor(options: KyPaintOptions) {
        this.$options = options;
        this.$el = document.createElement('canvas');
        this.$ctx = this.$el.getContext('2d');
        this.$el.setAttribute('width', this.$options.width.toString());
        this.$el.setAttribute('height', this.$options.height.toString());
        this.$el.innerText = '您的浏览器不支持 canvas ，请升级浏览器。';
        if (this.$options.container) {
            const container = document.querySelector(this.$options.container);
            if (container) {
                container.append(this.$el);
            }
        }
        this.generateStage();
        this.addClickEventListener();
    }

    private addClickEventListener() {
        const self = this;
        this.$el.addEventListener('mousedown', function (e) {
            self.$isMouseDown = true;
            self.$selected = null;
            const {offsetX, offsetY} = e;
            const clickPoint = new Point(offsetX, offsetY);
            let hitIndex = -1;
            for (let i = self.$layouts.length - 1; i >= 0; i--) {
                const obj = self.$layouts[i];
                if (obj.isHit(clickPoint) && hitIndex < 0) {
                    self.$selected = obj;
                    self.$objPoint = new Point(obj.getPosition().x, obj.getPosition().y);
                    self.$selectedPoint = new Point(offsetX, offsetY);
                    hitIndex = i;
                    obj.setHighlight(true);
                } else {
                    obj.setHighlight(false);
                }
            }
            if (hitIndex > -1) {
                self.$layouts.splice(hitIndex, 1);
                self.$layouts.push(self.$selected);
            }
        });
        this.$el.addEventListener('mouseup', function (e) {
            if (self.$isMouseDown && self.$selected) {
                const {x, y} = self.$selected.getPosition();
                const fX = Math.round(x / 10) * 10;
                const fY = Math.round(y / 10) * 10;
                self.$selected.moveTo(new Point(fX, fY));
            }
            self.$isMouseDown = false;
        });
        this.$el.addEventListener('mouseout', function (e) {
            self.$isMouseDown = false;
        });
        this.$el.addEventListener('mousemove', function (e) {
            // console.log(e);
            if (self.$isMouseDown && self.$selected) {
                const {offsetX, offsetY} = e;
                self.$selected.moveTo(new Point(offsetX - self.$selectedPoint.x + self.$objPoint.x, offsetY - self.$selectedPoint.y + self.$objPoint.y));
            } else if (!self.$selected) {
                const {offsetX, offsetY} = e;
                const clickPoint = new Point(offsetX, offsetY);
                let hitIndex = -1;
                for (let i = self.$layouts.length - 1; i >= 0; i--) {
                    const obj = self.$layouts[i];
                    if (obj.isHit(clickPoint) && hitIndex < 0) {
                        hitIndex = i;
                        obj.setHighlight(true);
                    } else {
                        obj.setHighlight(false);
                    }
                }
            }
        });
    }

    // 添加图形
    public add(object: KyPaintObject) {
        object.setPaint(this);
        object.draw();
        this.$layouts.push(object);
    }

    // 重绘
    public repaint() {
        clearTimeout(this.$timer);
        this.$timer = setTimeout(() => {
            this.clear();
            this.generateStage();
            this.$layouts.forEach(object => {
                object.draw();
            });
        }, this.$delay);
    }

    // 清除画布
    public clear() {
        this.$ctx.clearRect(0, 0, this.$options.width, this.$options.height);
    }

    // 生成舞台
    private generateStage() {
        const bc = new KyPaintRect({
            x: 0,
            y: 0,
            width: this.$options.width,
            height: this.$options.height,
            fill: this.$options.backgroundColor,
        });
        bc.setPaint(this);
        bc.draw();
        // this.$ctx.strokeStyle = 'rgba(255,255,255, .8)';
        // for (let i = 0; i < this.$options.width; i += 20) {
        //     this.$ctx.beginPath();
        //     this.$ctx.moveTo(i, 0);
        //     this.$ctx.lineTo(i, this.$options.height);
        //     this.$ctx.stroke();
        // }
        // for (let i = 0; i < this.$options.height; i += 20) {
        //     this.$ctx.beginPath();
        //     this.$ctx.moveTo(0, i);
        //     this.$ctx.lineTo(this.$options.width, i);
        //     this.$ctx.stroke();
        // }
    }

    public getContext() {
        return this.$ctx;
    }

    public getCanvas() {
        return this.$el;
    }
}

Object.defineProperty(window, 'KyPaint', {
    get() {
        return KyPaint;
    },
});

export default KyPaint;
