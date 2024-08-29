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
import { Coordinate } from "./Coordinate";
var CartesianCoordinate = /** @class */ (function (_super) {
    __extends(CartesianCoordinate, _super);
    function CartesianCoordinate() {
        var _this = _super.call(this) || this;
        _this.x = 0;
        _this.y = 0;
        return _this;
    }
    return CartesianCoordinate;
}(Coordinate));
export { CartesianCoordinate };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FydGVzaWFuQ29vcmRpbmF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYWNrYWdlcy9jb29yZGluYXRlL0NhcnRlc2lhbkNvb3JkaW5hdGUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFMUM7SUFBeUMsdUNBQVU7SUFJakQ7UUFBQSxZQUNFLGlCQUFPLFNBQ1I7UUFMRCxPQUFDLEdBQVcsQ0FBQyxDQUFDO1FBQ2QsT0FBQyxHQUFXLENBQUMsQ0FBQzs7SUFJZCxDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBUEQsQ0FBeUMsVUFBVSxHQU9sRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvb3JkaW5hdGUgfSBmcm9tIFwiLi9Db29yZGluYXRlXCI7XG5cbmV4cG9ydCBjbGFzcyBDYXJ0ZXNpYW5Db29yZGluYXRlIGV4dGVuZHMgQ29vcmRpbmF0ZSB7XG4gIHg6IG51bWJlciA9IDA7XG4gIHk6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxufVxuIl19