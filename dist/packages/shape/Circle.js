var Circle = /** @class */ (function () {
    function Circle(_a) {
        var _this = this;
        var r = _a.r;
        this.radius = 20;
        this.circumference = function () { return _this.radius * 2 * Math.PI; };
        this.getArcByPercentage = function (percentage) {
            var degreeInPercentage = 360 * percentage;
            return (degreeInPercentage / 360) * _this.circumference();
        };
        this.getAngleByPercentange = function (percentage) {
            return ((_this.getArcByPercentage(percentage) * 360) / 2 / Math.PI / _this.radius);
        };
        this.radius = r !== null && r !== void 0 ? r : 50;
    }
    return Circle;
}());
export { Circle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2lyY2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhY2thZ2VzL3NoYXBlL0NpcmNsZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFHRSxnQkFBWSxFQUFvQjtRQUFoQyxpQkFFQztZQUZhLENBQUMsT0FBQTtRQUZmLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFNWixrQkFBYSxHQUFHLGNBQU0sT0FBQSxLQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUF6QixDQUF5QixDQUFDO1FBRWhELHVCQUFrQixHQUFHLFVBQUMsVUFBa0I7WUFDdEMsSUFBTSxrQkFBa0IsR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDO1lBQzVDLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxHQUFHLENBQUMsR0FBRyxLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDM0QsQ0FBQyxDQUFDO1FBRUYsMEJBQXFCLEdBQUcsVUFBQyxVQUFrQjtZQUN6QyxPQUFPLENBQ0wsQ0FBQyxLQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FDeEUsQ0FBQztRQUNKLENBQUMsQ0FBQztRQWRBLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxhQUFELENBQUMsY0FBRCxDQUFDLEdBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFjSCxhQUFDO0FBQUQsQ0FBQyxBQW5CRCxJQW1CQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDaXJjbGUge1xuICByYWRpdXMgPSAyMDtcblxuICBjb25zdHJ1Y3Rvcih7IHIgfTogeyByOiBudW1iZXIgfSkge1xuICAgIHRoaXMucmFkaXVzID0gciA/PyA1MDtcbiAgfVxuXG4gIGNpcmN1bWZlcmVuY2UgPSAoKSA9PiB0aGlzLnJhZGl1cyAqIDIgKiBNYXRoLlBJO1xuXG4gIGdldEFyY0J5UGVyY2VudGFnZSA9IChwZXJjZW50YWdlOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCBkZWdyZWVJblBlcmNlbnRhZ2UgPSAzNjAgKiBwZXJjZW50YWdlO1xuICAgIHJldHVybiAoZGVncmVlSW5QZXJjZW50YWdlIC8gMzYwKSAqIHRoaXMuY2lyY3VtZmVyZW5jZSgpO1xuICB9O1xuXG4gIGdldEFuZ2xlQnlQZXJjZW50YW5nZSA9IChwZXJjZW50YWdlOiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgKHRoaXMuZ2V0QXJjQnlQZXJjZW50YWdlKHBlcmNlbnRhZ2UpICogMzYwKSAvIDIgLyBNYXRoLlBJIC8gdGhpcy5yYWRpdXNcbiAgICApO1xuICB9O1xufVxuIl19