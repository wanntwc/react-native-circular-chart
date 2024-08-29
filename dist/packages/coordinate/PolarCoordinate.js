var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Degree } from "../math";
import { Coordinate } from "./Coordinate";
// https://www.mathsisfun.com/polar-cartesian-coordinates.html
var PolarCoordinate = /** @class */ (function (_super) {
    __extends(PolarCoordinate, _super);
    function PolarCoordinate(_a) {
        var coordX = _a.coordX, coordY = _a.coordY, radius = _a.radius, angle = _a.angle;
        var _this = _super.call(this) || this;
        _this.coordX = 0;
        _this.coordY = 0;
        _this.radius = 0;
        _this.angle = 0;
        _this.toCartesian = function () {
            var startAngle = _this.angle - 90;
            var angleInRadians = new Degree(startAngle).toRadian();
            return {
                x: _this.coordX + _this.radius * Math.cos(angleInRadians),
                y: _this.coordY + _this.radius * Math.sin(angleInRadians),
            };
        };
        _this.coordX = coordX;
        _this.coordY = coordY;
        _this.angle = angle;
        _this.radius = radius;
        return _this;
    }
    return PolarCoordinate;
}(Coordinate));
export { PolarCoordinate };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9sYXJDb29yZGluYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhY2thZ2VzL2Nvb3JkaW5hdGUvUG9sYXJDb29yZGluYXRlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRWpDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFMUMsOERBQThEO0FBQzlEO0lBQXFDLG1DQUFVO0lBTTdDLHlCQUFZLEVBVVg7WUFUQyxNQUFNLFlBQUEsRUFDTixNQUFNLFlBQUEsRUFDTixNQUFNLFlBQUEsRUFDTixLQUFLLFdBQUE7UUFKUCxZQVdFLGlCQUFPLFNBS1I7UUFyQkQsWUFBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixZQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLFlBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsV0FBSyxHQUFXLENBQUMsQ0FBQztRQW9CbEIsaUJBQVcsR0FBRztZQUNaLElBQU0sVUFBVSxHQUFHLEtBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFBO1lBQ2xDLElBQU0sY0FBYyxHQUFHLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRXpELE9BQU87Z0JBQ0wsQ0FBQyxFQUFFLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQztnQkFDdkQsQ0FBQyxFQUFFLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQzthQUN4RCxDQUFDO1FBQ0osQ0FBQyxDQUFDO1FBZEEsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7O0lBQ3ZCLENBQUM7SUFXSCxzQkFBQztBQUFELENBQUMsQUFqQ0QsQ0FBcUMsVUFBVSxHQWlDOUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZWdyZWUgfSBmcm9tIFwiLi4vbWF0aFwiO1xuaW1wb3J0IHsgQ2FydGVzaWFuQ29vcmRpbmF0ZSB9IGZyb20gXCIuL0NhcnRlc2lhbkNvb3JkaW5hdGVcIjtcbmltcG9ydCB7IENvb3JkaW5hdGUgfSBmcm9tIFwiLi9Db29yZGluYXRlXCI7XG5cbi8vIGh0dHBzOi8vd3d3Lm1hdGhzaXNmdW4uY29tL3BvbGFyLWNhcnRlc2lhbi1jb29yZGluYXRlcy5odG1sXG5leHBvcnQgY2xhc3MgUG9sYXJDb29yZGluYXRlIGV4dGVuZHMgQ29vcmRpbmF0ZSB7XG4gIGNvb3JkWDogbnVtYmVyID0gMDtcbiAgY29vcmRZOiBudW1iZXIgPSAwO1xuICByYWRpdXM6IG51bWJlciA9IDA7XG4gIGFuZ2xlOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBjb29yZFgsXG4gICAgY29vcmRZLFxuICAgIHJhZGl1cyxcbiAgICBhbmdsZSxcbiAgfToge1xuICAgIGNvb3JkWDogbnVtYmVyO1xuICAgIGNvb3JkWTogbnVtYmVyO1xuICAgIHJhZGl1czogbnVtYmVyO1xuICAgIGFuZ2xlOiBudW1iZXI7XG4gIH0pIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuY29vcmRYID0gY29vcmRYO1xuICAgIHRoaXMuY29vcmRZID0gY29vcmRZO1xuICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgfVxuXG4gIHRvQ2FydGVzaWFuID0gKCk6IENhcnRlc2lhbkNvb3JkaW5hdGUgPT4ge1xuICAgIGNvbnN0IHN0YXJ0QW5nbGUgPSB0aGlzLmFuZ2xlIC0gOTBcbiAgICBjb25zdCBhbmdsZUluUmFkaWFucyA9IG5ldyBEZWdyZWUoc3RhcnRBbmdsZSkudG9SYWRpYW4oKTtcblxuICAgIHJldHVybiB7XG4gICAgICB4OiB0aGlzLmNvb3JkWCArIHRoaXMucmFkaXVzICogTWF0aC5jb3MoYW5nbGVJblJhZGlhbnMpLFxuICAgICAgeTogdGhpcy5jb29yZFkgKyB0aGlzLnJhZGl1cyAqIE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKSxcbiAgICB9O1xuICB9O1xufVxuIl19