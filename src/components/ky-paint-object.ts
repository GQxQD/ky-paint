import Point from "../utils/point";
import KyPaint from "../ky-paint";
import Position from "../utils/position";

abstract class KyPaintObject {
    private position: Position;
    protected paint: KyPaint;
    protected ctx: CanvasRenderingContext2D;
    protected isHighlight: boolean = false;

    protected constructor(x: number, y: number, width: number, height: number) {
        this.position = new Position(x, y, width, height);
    }

    setPaint(paint: KyPaint) {
        this.paint = paint;
        this.ctx = paint.getContext();
    };

    abstract draw(): void;

    abstract highlight(): void;

    abstract isHit(point: Point): boolean;

    public setHighlight(is: boolean) {
        this.isHighlight = is;
        this.paint.repaint();
    }

    public moveTo(point: Point) {
        this.position.x = point.x;
        this.position.y = point.y;
        this.paint.repaint();
    }

    public setPosition(position: Position) {
        this.position = position;
    }

    public getPosition() {
        return this.position;
    }
}

export default KyPaintObject;
