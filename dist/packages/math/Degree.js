var Degree = /** @class */ (function () {
    function Degree(value) {
        var _this = this;
        this._value = 0;
        // degree = radian * 180 / Math.PI => radian = degree * Math.PI / 180
        this.toRadian = function () { return (_this._value * Math.PI) / 180; };
        this._value = value;
    }
    return Degree;
}());
export { Degree };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVncmVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhY2thZ2VzL21hdGgvRGVncmVlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUdFLGdCQUFZLEtBQWE7UUFBekIsaUJBRUM7UUFKRCxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBTVgscUVBQXFFO1FBQ3JFLGFBQVEsR0FBRyxjQUFjLE9BQUEsQ0FBQyxLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQTdCLENBQTZCLENBQUM7UUFKckQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUlILGFBQUM7QUFBRCxDQUFDLEFBVEQsSUFTQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBEZWdyZWUge1xuICBfdmFsdWUgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgLy8gZGVncmVlID0gcmFkaWFuICogMTgwIC8gTWF0aC5QSSA9PiByYWRpYW4gPSBkZWdyZWUgKiBNYXRoLlBJIC8gMTgwXG4gIHRvUmFkaWFuID0gKCk6IG51bWJlciA9PiAodGhpcy5fdmFsdWUgKiBNYXRoLlBJKSAvIDE4MDtcbn1cbiJdfQ==