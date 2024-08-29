var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useEffect, useRef, useMemo, useState, Fragment } from "react";
import { Text, View, Animated, StyleSheet, Easing, } from "react-native";
import { Svg, Path } from "react-native-svg";
import { Square } from "./packages/shape";
import { Arc, ViewBox } from "./packages/svg";
import { sum } from "./packages/array";
import { LinearInterpolation } from "./packages/math";
var AnimatedPath = Animated.createAnimatedComponent(Path);
export var DonutChart = function (_a) {
    var data = _a.data, containerWidth = _a.containerWidth, containerHeight = _a.containerHeight, radius = _a.radius, _b = _a.startAngle, startAngle = _b === void 0 ? -125 : _b, _c = _a.endAngle, endAngle = _c === void 0 ? startAngle * -1 : _c, _d = _a.strokeWidth, strokeWidth = _d === void 0 ? 10 : _d, _e = _a.type, type = _e === void 0 ? "round" : _e, _f = _a.animationType, animationType = _f === void 0 ? "slide" : _f, labelWrapperStyle = _a.labelWrapperStyle, labelValueStyle = _a.labelValueStyle, labelTitleStyle = _a.labelTitleStyle, containerStyle = _a.containerStyle;
    var donutItemListeners = [];
    var viewBox = new ViewBox({
        width: containerWidth,
        height: containerHeight,
    });
    var squareInCircle = new Square({ diameter: radius * 2 });
    var animateOpacity = useRef(new Animated.Value(0)).current;
    var animateContainerOpacity = useRef(new Animated.Value(0)).current;
    var animatedStrokeWidths = useRef(data.map(function () { return new Animated.Value(strokeWidth); })).current;
    var pathRefs = useRef([]);
    var animatedPaths = useRef([]).current;
    var _g = useState(data[0]), displayValue = _g[0], setDisplayValue = _g[1];
    // TODO:
    // remove WTF is this variable ?
    var _h = useState([]), rotationPaths = _h[0], setRotationPath = _h[1];
    var defaultInterpolateConfig = function () { return ({ inputRange: [0, 100], outputRange: [startAngle, endAngle] }); };
    var sumOfDonutItemValue = useMemo(function () {
        return data
            .map(function (d) { return d.value; })
            .reduce(function (total, prev) { return total + prev; });
    }, [data]);
    var donutItemValueToPercentage = useMemo(function () { return data.map(function (d) { return (d.value / sumOfDonutItemValue) * 100; }); }, [sumOfDonutItemValue, data]);
    useMemo(function () {
        var rotationRange = [];
        data.forEach(function (_, idx) {
            var fromValues = sum(donutItemValueToPercentage.slice(0, idx));
            var toValues = sum(donutItemValueToPercentage.slice(0, idx + 1));
            animatedPaths.push(new Animated.Value(LinearInterpolation(__assign({ value: fromValues }, defaultInterpolateConfig()))));
            rotationRange[idx] = {
                from: LinearInterpolation(__assign({ value: fromValues }, defaultInterpolateConfig())),
                to: LinearInterpolation(__assign({ value: toValues }, defaultInterpolateConfig())),
            };
        });
        setRotationPath(rotationRange);
    }, [data]);
    useEffect(function () {
        switch (animationType) {
            case "slide":
                animateContainerOpacity.setValue(1);
                slideAnimation();
                break;
            default:
                fadeAnimation();
                break;
        }
    }, []);
    var slideAnimation = function () {
        var animations = data.map(function (_, i) {
            var ani = Animated.timing(animatedPaths[i], {
                toValue: rotationPaths[i].to,
                duration: 3000,
                easing: Easing.bezier(0.075, 0.82, 0.165, 1),
                useNativeDriver: true,
            });
            return ani;
        });
        Animated.parallel(animations).start();
    };
    var fadeAnimation = function () {
        Animated.timing(animateContainerOpacity, {
            toValue: 1,
            duration: 5000,
            easing: Easing.bezier(0.075, 0.82, 0.165, 1),
            useNativeDriver: true,
        }).start();
    };
    useEffect(function () {
        data.forEach(function (_, i) {
            var element = pathRefs.current[i];
            donutItemListeners[i] = addListener({
                element: element,
                animatedValue: animatedPaths[i],
                startValue: rotationPaths[i].from,
            });
        });
    }, []);
    useEffect(function () {
        return function () {
            if (animationType === "slide") {
                data.forEach(function (_, i) {
                    var _a, _b;
                    if ((donutItemListeners === null || donutItemListeners === void 0 ? void 0 : donutItemListeners[i]) &&
                        (donutItemListeners === null || donutItemListeners === void 0 ? void 0 : donutItemListeners[i].removeAllListeners)) {
                        (_b = donutItemListeners === null || donutItemListeners === void 0 ? void 0 : (_a = donutItemListeners[i]).removeAllListeners) === null || _b === void 0 ? void 0 : _b.call(_a);
                    }
                });
            }
        };
    }, []);
    var addListener = function (_a) {
        var element = _a.element, animatedValue = _a.animatedValue, startValue = _a.startValue;
        animatedValue.addListener(function (angle) {
            var arcParams = {
                coordX: viewBox.getCenterCoord().x,
                coordY: viewBox.getCenterCoord().y,
                radius: radius,
                startAngle: startValue,
                endAngle: angle.value,
            };
            var drawPath = new Arc(arcParams).getDrawPath();
            if (element) {
                element.setNativeProps({ d: drawPath });
            }
        });
    };
    useEffect(function () {
        animateOpacity.setValue(0);
        Animated.timing(animateOpacity, {
            toValue: 1,
            duration: 500,
            easing: Easing.bezier(0.075, 0.82, 0.165, 1),
            useNativeDriver: true,
        }).start();
    }, []);
    var onUpdateDisplayValue = function (value, index) {
        setDisplayValue(value);
        animateOpacity.setValue(0);
        Animated.parallel([
            Animated.timing(animateOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    };
    var onPressIn = function (value, index) {
        Animated.timing(animatedStrokeWidths[index], {
            toValue: strokeWidth + 2,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.bezier(0.075, 0.82, 0.165, 1),
        }).start();
    };
    var onPressOut = function (index) {
        Animated.timing(animatedStrokeWidths[index], {
            toValue: strokeWidth,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.bezier(0.075, 0.82, 0.165, 1),
        }).start();
    };
    var _getContainerStyle = function () { return [
        styles.defaultContainer,
        containerStyle,
        { width: containerWidth, height: containerHeight },
    ]; };
    var _getLabelValueStyle = function (color) { return [
        styles.defaultLabelValue,
        { color: color },
        labelValueStyle,
    ]; };
    var _getLabelTitleStyle = function (color) { return [
        styles.defaultLabelTitle,
        { color: color },
        labelTitleStyle,
    ]; };
    var _getLabelWrapperStyle = function () { return [
        styles.defaultLabelWrapper,
        {
            width: squareInCircle.getCorner() - strokeWidth,
            height: squareInCircle.getCorner() - strokeWidth,
            opacity: animateOpacity,
        },
        labelWrapperStyle,
    ]; };
    return (<Fragment>
      <View style={_getContainerStyle()}>
        <Svg width={viewBox.width} height={viewBox.height}>
          {rotationPaths.map(function (d, i) {
            var arcParams = {
                coordX: viewBox.getCenterCoord().x,
                coordY: viewBox.getCenterCoord().y,
                radius: radius,
                startAngle: d.from,
                endAngle: d.to,
            };
            var drawPath = new Arc(arcParams).getDrawPath();
            return (<AnimatedPath key={"item-".concat(i)} ref={function (el) { return (pathRefs.current[i] = el); }} onPress={function () { return onUpdateDisplayValue(data[i], i); }} onPressIn={function () { return onPressIn(data[i], i); }} onPressOut={function () { return onPressOut(i); }} strokeLinecap={type} d={drawPath} opacity={animateContainerOpacity} fill="none" stroke={data[i].color} strokeWidth={animatedStrokeWidths[i]}/>);
        })}
        </Svg>
        <Animated.View style={_getLabelWrapperStyle()}>
          <Text style={_getLabelValueStyle(displayValue === null || displayValue === void 0 ? void 0 : displayValue.color)}>
            {displayValue === null || displayValue === void 0 ? void 0 : displayValue.value}
          </Text>
          <Text style={_getLabelTitleStyle(displayValue === null || displayValue === void 0 ? void 0 : displayValue.color)}>
            {displayValue === null || displayValue === void 0 ? void 0 : displayValue.name}
          </Text>
        </Animated.View>
      </View>
    </Fragment>);
};
var styles = StyleSheet.create({
    defaultContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    defaultLabelWrapper: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
    },
    defaultLabelValue: {
        fontSize: 32,
        fontWeight: "bold",
    },
    defaultLabelTitle: {
        fontSize: 16,
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQzlFLE9BQU8sRUFFTCxJQUFJLEVBQ0osSUFBSSxFQUVKLFFBQVEsRUFDUixVQUFVLEVBRVYsTUFBTSxHQUNQLE1BQU0sY0FBYyxDQUFDO0FBRXRCLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDN0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxHQUFHLEVBQWEsT0FBTyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBMkJ0RCxJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFNUQsTUFBTSxDQUFDLElBQU0sVUFBVSxHQUFHLFVBQUMsRUFlYjtRQWRaLElBQUksVUFBQSxFQUNKLGNBQWMsb0JBQUEsRUFDZCxlQUFlLHFCQUFBLEVBQ2YsTUFBTSxZQUFBLEVBQ04sa0JBQWlCLEVBQWpCLFVBQVUsbUJBQUcsQ0FBQyxHQUFHLEtBQUEsRUFDakIsZ0JBQTBCLEVBQTFCLFFBQVEsbUJBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQyxLQUFBLEVBQzFCLG1CQUFnQixFQUFoQixXQUFXLG1CQUFHLEVBQUUsS0FBQSxFQUNoQixZQUFjLEVBQWQsSUFBSSxtQkFBRyxPQUFPLEtBQUEsRUFDZCxxQkFBdUIsRUFBdkIsYUFBYSxtQkFBRyxPQUFPLEtBQUEsRUFF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SSxDQUFDLEtBQUssQ0FBQyxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FDNUM7VUFBQSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsS0FBSyxDQUFDLENBQUMsQ0FDcEQ7WUFBQSxDQUFDLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxLQUFLLENBQ3RCO1VBQUEsRUFBRSxJQUFJLENBQ047VUFBQSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsS0FBSyxDQUFDLENBQUMsQ0FDcEQ7WUFBQSxDQUFDLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxJQUFJLENBQ3JCO1VBQUEsRUFBRSxJQUFJLENBQ1I7UUFBQSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQ2pCO01BQUEsRUFBRSxJQUFJLENBQ1I7SUFBQSxFQUFFLFFBQVEsQ0FBQyxDQUNaLENBQUM7QUFDSixDQUFDLENBQUM7QUFDRixJQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQy9CLGdCQUFnQixFQUFFO1FBQ2hCLE9BQU8sRUFBRSxNQUFNO1FBQ2YsY0FBYyxFQUFFLFFBQVE7UUFDeEIsVUFBVSxFQUFFLFFBQVE7S0FDckI7SUFFRCxtQkFBbUIsRUFBRTtRQUNuQixRQUFRLEVBQUUsVUFBVTtRQUNwQixjQUFjLEVBQUUsUUFBUTtRQUN4QixVQUFVLEVBQUUsUUFBUTtLQUNyQjtJQUVELGlCQUFpQixFQUFFO1FBQ2pCLFFBQVEsRUFBRSxFQUFFO1FBQ1osVUFBVSxFQUFFLE1BQU07S0FDbkI7SUFFRCxpQkFBaUIsRUFBRTtRQUNqQixRQUFRLEVBQUUsRUFBRTtLQUNiO0NBQ0YsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VNZW1vLCB1c2VTdGF0ZSwgRnJhZ21lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gIFN0eWxlUHJvcCxcbiAgVGV4dCxcbiAgVmlldyxcbiAgVmlld1N0eWxlLFxuICBBbmltYXRlZCxcbiAgU3R5bGVTaGVldCxcbiAgVGV4dFN0eWxlLFxuICBFYXNpbmcsXG59IGZyb20gXCJyZWFjdC1uYXRpdmVcIjtcblxuaW1wb3J0IHsgU3ZnLCBQYXRoIH0gZnJvbSBcInJlYWN0LW5hdGl2ZS1zdmdcIjtcbmltcG9ydCB7IFNxdWFyZSB9IGZyb20gXCIuL3BhY2thZ2VzL3NoYXBlXCI7XG5pbXBvcnQgeyBBcmMsIEFyY1BhcmFtcywgVmlld0JveCB9IGZyb20gXCIuL3BhY2thZ2VzL3N2Z1wiO1xuaW1wb3J0IHsgc3VtIH0gZnJvbSBcIi4vcGFja2FnZXMvYXJyYXlcIjtcbmltcG9ydCB7IExpbmVhckludGVycG9sYXRpb24gfSBmcm9tIFwiLi9wYWNrYWdlcy9tYXRoXCI7XG5cbmV4cG9ydCB0eXBlIERvbnV0SXRlbSA9IHtcbiAgbmFtZTogc3RyaW5nO1xuICB2YWx1ZTogbnVtYmVyO1xuICBjb2xvcjogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgRG9udXRBbmltYXRpb25UeXBlID0gXCJmYWRlXCIgfCBcInNsaWRlXCI7XG5cbmV4cG9ydCB0eXBlIElEb251dFByb3BzID0ge1xuICBkYXRhOiBEb251dEl0ZW1bXTtcbiAgY29udGFpbmVyV2lkdGg6IG51bWJlcjtcbiAgY29udGFpbmVySGVpZ2h0OiBudW1iZXI7XG4gIHJhZGl1czogbnVtYmVyO1xuICBzdGFydEFuZ2xlPzogbnVtYmVyO1xuICBlbmRBbmdsZT86IG51bWJlcjtcbiAgc3Ryb2tlV2lkdGg/OiBudW1iZXI7XG4gIHR5cGU/OiBcImJ1dHRcIiB8IFwicm91bmRcIjtcbiAgbGFiZWxWYWx1ZVN0eWxlPzogU3R5bGVQcm9wPFRleHRTdHlsZT47XG4gIGxhYmVsVGl0bGVTdHlsZT86IFN0eWxlUHJvcDxUZXh0U3R5bGU+O1xuICBsYWJlbFdyYXBwZXJTdHlsZT86IFN0eWxlUHJvcDxWaWV3U3R5bGU+O1xuICBjb250YWluZXJTdHlsZT86IFN0eWxlUHJvcDxWaWV3U3R5bGU+O1xuXG4gIGFuaW1hdGlvblR5cGU/OiBEb251dEFuaW1hdGlvblR5cGU7XG59O1xuXG5jb25zdCBBbmltYXRlZFBhdGggPSBBbmltYXRlZC5jcmVhdGVBbmltYXRlZENvbXBvbmVudChQYXRoKTtcblxuZXhwb3J0IGNvbnN0IERvbnV0Q2hhcnQgPSAoe1xuICBkYXRhLFxuICBjb250YWluZXJXaWR0aCxcbiAgY29udGFpbmVySGVpZ2h0LFxuICByYWRpdXMsXG4gIHN0YXJ0QW5nbGUgPSAtMTI1LFxuICBlbmRBbmdsZSA9IHN0YXJ0QW5nbGUgKiAtMSxcbiAgc3Ryb2tlV2lkdGggPSAxMCxcbiAgdHlwZSA9IFwicm91bmRcIixcbiAgYW5pbWF0aW9uVHlwZSA9IFwic2xpZGVcIixcblxuICBsYWJlbFdyYXBwZXJTdHlsZSxcbiAgbGFiZWxWYWx1ZVN0eWxlLFxuICBsYWJlbFRpdGxlU3R5bGUsXG4gIGNvbnRhaW5lclN0eWxlLFxufTogSURvbnV0UHJvcHMpID0+IHtcbiAgbGV0IGRvbnV0SXRlbUxpc3RlbmVyczogYW55ID0gW107XG4gIGNvbnN0IHZpZXdCb3ggPSBuZXcgVmlld0JveCh7XG4gICAgd2lkdGg6IGNvbnRhaW5lcldpZHRoLFxuICAgIGhlaWdodDogY29udGFpbmVySGVpZ2h0LFxuICB9KTtcbiAgY29uc3Qgc3F1YXJlSW5DaXJjbGUgPSBuZXcgU3F1YXJlKHsgZGlhbWV0ZXI6IHJhZGl1cyAqIDIgfSk7XG5cbiAgY29uc3QgYW5pbWF0ZU9wYWNpdHkgPSB1c2VSZWYobmV3IEFuaW1hdGVkLlZhbHVlKDApKS5jdXJyZW50O1xuICBjb25zdCBhbmltYXRlQ29udGFpbmVyT3BhY2l0eSA9IHVzZVJlZihuZXcgQW5pbWF0ZWQuVmFsdWUoMCkpLmN1cnJlbnQ7XG4gIGNvbnN0IGFuaW1hdGVkU3Ryb2tlV2lkdGhzID0gdXNlUmVmKFxuICAgIGRhdGEubWFwKCgpID0+IG5ldyBBbmltYXRlZC5WYWx1ZShzdHJva2VXaWR0aCkpXG4gICkuY3VycmVudDtcbiAgY29uc3QgcGF0aFJlZnMgPSB1c2VSZWY8dHlwZW9mIEFuaW1hdGVkUGF0aFtdPihbXSk7XG4gIGNvbnN0IGFuaW1hdGVkUGF0aHMgPSB1c2VSZWY8QXJyYXk8QW5pbWF0ZWQuVmFsdWU+PihbXSkuY3VycmVudDtcblxuICBjb25zdCBbZGlzcGxheVZhbHVlLCBzZXREaXNwbGF5VmFsdWVdID0gdXNlU3RhdGU8RG9udXRJdGVtPihkYXRhWzBdKTtcblxuICAvLyBUT0RPOlxuICAvLyByZW1vdmUgV1RGIGlzIHRoaXMgdmFyaWFibGUgP1xuICBjb25zdCBbcm90YXRpb25QYXRocywgc2V0Um90YXRpb25QYXRoXSA9IHVzZVN0YXRlPFxuICAgIEFycmF5PHsgZnJvbTogbnVtYmVyOyB0bzogbnVtYmVyIH0+XG4gID4oW10pO1xuXG4gIGNvbnN0IGRlZmF1bHRJbnRlcnBvbGF0ZUNvbmZpZyA9ICgpOiB7XG4gICAgaW5wdXRSYW5nZTogW251bWJlciwgbnVtYmVyXTtcbiAgICBvdXRwdXRSYW5nZTogW251bWJlciwgbnVtYmVyXTtcbiAgfSA9PiAoeyBpbnB1dFJhbmdlOiBbMCwgMTAwXSwgb3V0cHV0UmFuZ2U6IFtzdGFydEFuZ2xlLCBlbmRBbmdsZV0gfSk7XG5cbiAgY29uc3Qgc3VtT2ZEb251dEl0ZW1WYWx1ZSA9IHVzZU1lbW8oXG4gICAgKCk6IG51bWJlciA9PlxuICAgICAgZGF0YVxuICAgICAgICAubWFwKChkKSA9PiBkLnZhbHVlKVxuICAgICAgICAucmVkdWNlKCh0b3RhbDogbnVtYmVyLCBwcmV2OiBudW1iZXIpID0+IHRvdGFsICsgcHJldiksXG4gICAgW2RhdGFdXG4gICk7XG5cbiAgY29uc3QgZG9udXRJdGVtVmFsdWVUb1BlcmNlbnRhZ2UgPSB1c2VNZW1vKFxuICAgICgpID0+IGRhdGEubWFwKChkKSA9PiAoZC52YWx1ZSAvIHN1bU9mRG9udXRJdGVtVmFsdWUpICogMTAwKSxcbiAgICBbc3VtT2ZEb251dEl0ZW1WYWx1ZSwgZGF0YV1cbiAgKTtcblxuICB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCByb3RhdGlvblJhbmdlOiBBcnJheTx7IGZyb206IG51bWJlcjsgdG86IG51bWJlciB9PiA9IFtdO1xuXG4gICAgZGF0YS5mb3JFYWNoKChfLCBpZHgpID0+IHtcbiAgICAgIGNvbnN0IGZyb21WYWx1ZXMgPSBzdW0oZG9udXRJdGVtVmFsdWVUb1BlcmNlbnRhZ2Uuc2xpY2UoMCwgaWR4KSk7XG4gICAgICBjb25zdCB0b1ZhbHVlcyA9IHN1bShkb251dEl0ZW1WYWx1ZVRvUGVyY2VudGFnZS5zbGljZSgwLCBpZHggKyAxKSk7XG5cbiAgICAgIGFuaW1hdGVkUGF0aHMucHVzaChcbiAgICAgICAgbmV3IEFuaW1hdGVkLlZhbHVlKFxuICAgICAgICAgIExpbmVhckludGVycG9sYXRpb24oe1xuICAgICAgICAgICAgdmFsdWU6IGZyb21WYWx1ZXMsXG4gICAgICAgICAgICAuLi5kZWZhdWx0SW50ZXJwb2xhdGVDb25maWcoKSxcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICApO1xuXG4gICAgICByb3RhdGlvblJhbmdlW2lkeF0gPSB7XG4gICAgICAgIGZyb206IExpbmVhckludGVycG9sYXRpb24oe1xuICAgICAgICAgIHZhbHVlOiBmcm9tVmFsdWVzLFxuICAgICAgICAgIC4uLmRlZmF1bHRJbnRlcnBvbGF0ZUNvbmZpZygpLFxuICAgICAgICB9KSxcbiAgICAgICAgdG86IExpbmVhckludGVycG9sYXRpb24oe1xuICAgICAgICAgIHZhbHVlOiB0b1ZhbHVlcyxcbiAgICAgICAgICAuLi5kZWZhdWx0SW50ZXJwb2xhdGVDb25maWcoKSxcbiAgICAgICAgfSksXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgc2V0Um90YXRpb25QYXRoKHJvdGF0aW9uUmFuZ2UpO1xuICB9LCBbZGF0YV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc3dpdGNoIChhbmltYXRpb25UeXBlKSB7XG4gICAgICBjYXNlIFwic2xpZGVcIjpcbiAgICAgICAgYW5pbWF0ZUNvbnRhaW5lck9wYWNpdHkuc2V0VmFsdWUoMSk7XG4gICAgICAgIHNsaWRlQW5pbWF0aW9uKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBmYWRlQW5pbWF0aW9uKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIGNvbnN0IHNsaWRlQW5pbWF0aW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IGFuaW1hdGlvbnM6IEFuaW1hdGVkLkNvbXBvc2l0ZUFuaW1hdGlvbltdID0gZGF0YS5tYXAoKF8sIGkpID0+IHtcbiAgICAgIGNvbnN0IGFuaSA9IEFuaW1hdGVkLnRpbWluZyhhbmltYXRlZFBhdGhzW2ldLCB7XG4gICAgICAgIHRvVmFsdWU6IHJvdGF0aW9uUGF0aHNbaV0udG8sXG4gICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICBlYXNpbmc6IEVhc2luZy5iZXppZXIoMC4wNzUsIDAuODIsIDAuMTY1LCAxKSxcbiAgICAgICAgdXNlTmF0aXZlRHJpdmVyOiB0cnVlLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBhbmk7XG4gICAgfSk7XG4gICAgQW5pbWF0ZWQucGFyYWxsZWwoYW5pbWF0aW9ucykuc3RhcnQoKTtcbiAgfTtcblxuICBjb25zdCBmYWRlQW5pbWF0aW9uID0gKCkgPT4ge1xuICAgIEFuaW1hdGVkLnRpbWluZyhhbmltYXRlQ29udGFpbmVyT3BhY2l0eSwge1xuICAgICAgdG9WYWx1ZTogMSxcbiAgICAgIGR1cmF0aW9uOiA1MDAwLFxuICAgICAgZWFzaW5nOiBFYXNpbmcuYmV6aWVyKDAuMDc1LCAwLjgyLCAwLjE2NSwgMSksXG4gICAgICB1c2VOYXRpdmVEcml2ZXI6IHRydWUsXG4gICAgfSkuc3RhcnQoKTtcbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGRhdGEuZm9yRWFjaCgoXywgaSkgPT4ge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHBhdGhSZWZzLmN1cnJlbnRbaV07XG4gICAgICBkb251dEl0ZW1MaXN0ZW5lcnNbaV0gPSBhZGRMaXN0ZW5lcih7XG4gICAgICAgIGVsZW1lbnQsXG4gICAgICAgIGFuaW1hdGVkVmFsdWU6IGFuaW1hdGVkUGF0aHNbaV0sXG4gICAgICAgIHN0YXJ0VmFsdWU6IHJvdGF0aW9uUGF0aHNbaV0uZnJvbSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKGFuaW1hdGlvblR5cGUgPT09IFwic2xpZGVcIikge1xuICAgICAgICBkYXRhLmZvckVhY2goKF8sIGkpID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBkb251dEl0ZW1MaXN0ZW5lcnM/LltpXSAmJlxuICAgICAgICAgICAgZG9udXRJdGVtTGlzdGVuZXJzPy5baV0ucmVtb3ZlQWxsTGlzdGVuZXJzXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBkb251dEl0ZW1MaXN0ZW5lcnM/LltpXS5yZW1vdmVBbGxMaXN0ZW5lcnM/LigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGFkZExpc3RlbmVyID0gKHtcbiAgICBlbGVtZW50LFxuICAgIGFuaW1hdGVkVmFsdWUsXG4gICAgc3RhcnRWYWx1ZSxcbiAgfToge1xuICAgIGVsZW1lbnQ6IGFueTtcbiAgICBhbmltYXRlZFZhbHVlOiBBbmltYXRlZC5WYWx1ZTtcbiAgICBzdGFydFZhbHVlOiBudW1iZXI7XG4gIH0pID0+IHtcbiAgICBhbmltYXRlZFZhbHVlLmFkZExpc3RlbmVyKChhbmdsZSkgPT4ge1xuICAgICAgY29uc3QgYXJjUGFyYW1zOiBBcmNQYXJhbXMgPSB7XG4gICAgICAgIGNvb3JkWDogdmlld0JveC5nZXRDZW50ZXJDb29yZCgpLngsXG4gICAgICAgIGNvb3JkWTogdmlld0JveC5nZXRDZW50ZXJDb29yZCgpLnksXG4gICAgICAgIHJhZGl1czogcmFkaXVzLFxuICAgICAgICBzdGFydEFuZ2xlOiBzdGFydFZhbHVlLFxuICAgICAgICBlbmRBbmdsZTogYW5nbGUudmFsdWUsXG4gICAgICB9O1xuICAgICAgY29uc3QgZHJhd1BhdGggPSBuZXcgQXJjKGFyY1BhcmFtcykuZ2V0RHJhd1BhdGgoKTtcblxuICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5zZXROYXRpdmVQcm9wcyh7IGQ6IGRyYXdQYXRoIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgYW5pbWF0ZU9wYWNpdHkuc2V0VmFsdWUoMCk7XG4gICAgQW5pbWF0ZWQudGltaW5nKGFuaW1hdGVPcGFjaXR5LCB7XG4gICAgICB0b1ZhbHVlOiAxLFxuICAgICAgZHVyYXRpb246IDUwMCxcbiAgICAgIGVhc2luZzogRWFzaW5nLmJlemllcigwLjA3NSwgMC44MiwgMC4xNjUsIDEpLFxuICAgICAgdXNlTmF0aXZlRHJpdmVyOiB0cnVlLFxuICAgIH0pLnN0YXJ0KCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBvblVwZGF0ZURpc3BsYXlWYWx1ZSA9ICh2YWx1ZTogRG9udXRJdGVtLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgc2V0RGlzcGxheVZhbHVlKHZhbHVlKTtcbiAgICBhbmltYXRlT3BhY2l0eS5zZXRWYWx1ZSgwKTtcblxuICAgIEFuaW1hdGVkLnBhcmFsbGVsKFtcbiAgICAgIEFuaW1hdGVkLnRpbWluZyhhbmltYXRlT3BhY2l0eSwge1xuICAgICAgICB0b1ZhbHVlOiAxLFxuICAgICAgICBkdXJhdGlvbjogNTAwLFxuICAgICAgICB1c2VOYXRpdmVEcml2ZXI6IHRydWUsXG4gICAgICB9KSxcbiAgICBdKS5zdGFydCgpO1xuICB9O1xuXG4gIGNvbnN0IG9uUHJlc3NJbiA9ICh2YWx1ZTogRG9udXRJdGVtLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgQW5pbWF0ZWQudGltaW5nKGFuaW1hdGVkU3Ryb2tlV2lkdGhzW2luZGV4XSwge1xuICAgICAgdG9WYWx1ZTogc3Ryb2tlV2lkdGggKyAyLFxuICAgICAgZHVyYXRpb246IDUwMCxcbiAgICAgIHVzZU5hdGl2ZURyaXZlcjogdHJ1ZSxcbiAgICAgIGVhc2luZzogRWFzaW5nLmJlemllcigwLjA3NSwgMC44MiwgMC4xNjUsIDEpLFxuICAgIH0pLnN0YXJ0KCk7XG4gIH07XG5cbiAgY29uc3Qgb25QcmVzc091dCA9IChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgQW5pbWF0ZWQudGltaW5nKGFuaW1hdGVkU3Ryb2tlV2lkdGhzW2luZGV4XSwge1xuICAgICAgdG9WYWx1ZTogc3Ryb2tlV2lkdGgsXG4gICAgICBkdXJhdGlvbjogNTAwLFxuICAgICAgdXNlTmF0aXZlRHJpdmVyOiB0cnVlLFxuICAgICAgZWFzaW5nOiBFYXNpbmcuYmV6aWVyKDAuMDc1LCAwLjgyLCAwLjE2NSwgMSksXG4gICAgfSkuc3RhcnQoKTtcbiAgfTtcblxuICBjb25zdCBfZ2V0Q29udGFpbmVyU3R5bGUgPSAoKTogU3R5bGVQcm9wPFZpZXdTdHlsZT4gPT4gW1xuICAgIHN0eWxlcy5kZWZhdWx0Q29udGFpbmVyLFxuICAgIGNvbnRhaW5lclN0eWxlLFxuICAgIHsgd2lkdGg6IGNvbnRhaW5lcldpZHRoLCBoZWlnaHQ6IGNvbnRhaW5lckhlaWdodCB9LFxuICBdO1xuXG4gIGNvbnN0IF9nZXRMYWJlbFZhbHVlU3R5bGUgPSAoY29sb3I6IHN0cmluZyk6IFN0eWxlUHJvcDxUZXh0U3R5bGU+ID0+IFtcbiAgICBzdHlsZXMuZGVmYXVsdExhYmVsVmFsdWUsXG4gICAgeyBjb2xvciB9LFxuICAgIGxhYmVsVmFsdWVTdHlsZSxcbiAgXTtcblxuICBjb25zdCBfZ2V0TGFiZWxUaXRsZVN0eWxlID0gKGNvbG9yOiBzdHJpbmcpOiBTdHlsZVByb3A8VGV4dFN0eWxlPiA9PiBbXG4gICAgc3R5bGVzLmRlZmF1bHRMYWJlbFRpdGxlLFxuICAgIHsgY29sb3IgfSxcbiAgICBsYWJlbFRpdGxlU3R5bGUsXG4gIF07XG5cbiAgY29uc3QgX2dldExhYmVsV3JhcHBlclN0eWxlID0gKCk6IEFuaW1hdGVkLldpdGhBbmltYXRlZEFycmF5PGFueT4gPT4gW1xuICAgIHN0eWxlcy5kZWZhdWx0TGFiZWxXcmFwcGVyLFxuICAgIHtcbiAgICAgIHdpZHRoOiBzcXVhcmVJbkNpcmNsZS5nZXRDb3JuZXIoKSAtIHN0cm9rZVdpZHRoLFxuICAgICAgaGVpZ2h0OiBzcXVhcmVJbkNpcmNsZS5nZXRDb3JuZXIoKSAtIHN0cm9rZVdpZHRoLFxuICAgICAgb3BhY2l0eTogYW5pbWF0ZU9wYWNpdHksXG4gICAgfSxcbiAgICBsYWJlbFdyYXBwZXJTdHlsZSxcbiAgXTtcblxuICByZXR1cm4gKFxuICAgIDxGcmFnbWVudD5cbiAgICAgIDxWaWV3IHN0eWxlPXtfZ2V0Q29udGFpbmVyU3R5bGUoKX0+XG4gICAgICAgIDxTdmcgd2lkdGg9e3ZpZXdCb3gud2lkdGh9IGhlaWdodD17dmlld0JveC5oZWlnaHR9PlxuICAgICAgICAgIHtyb3RhdGlvblBhdGhzLm1hcCgoZCwgaSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYXJjUGFyYW1zOiBBcmNQYXJhbXMgPSB7XG4gICAgICAgICAgICAgIGNvb3JkWDogdmlld0JveC5nZXRDZW50ZXJDb29yZCgpLngsXG4gICAgICAgICAgICAgIGNvb3JkWTogdmlld0JveC5nZXRDZW50ZXJDb29yZCgpLnksXG4gICAgICAgICAgICAgIHJhZGl1czogcmFkaXVzLFxuICAgICAgICAgICAgICBzdGFydEFuZ2xlOiBkLmZyb20sXG4gICAgICAgICAgICAgIGVuZEFuZ2xlOiBkLnRvLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGRyYXdQYXRoID0gbmV3IEFyYyhhcmNQYXJhbXMpLmdldERyYXdQYXRoKCk7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxBbmltYXRlZFBhdGhcbiAgICAgICAgICAgICAgICBrZXk9e2BpdGVtLSR7aX1gfVxuICAgICAgICAgICAgICAgIHJlZj17KGVsOiBhbnkpID0+IChwYXRoUmVmcy5jdXJyZW50W2ldID0gZWwpfVxuICAgICAgICAgICAgICAgIG9uUHJlc3M9eygpID0+IG9uVXBkYXRlRGlzcGxheVZhbHVlKGRhdGFbaV0sIGkpfVxuICAgICAgICAgICAgICAgIG9uUHJlc3NJbj17KCkgPT4gb25QcmVzc0luKGRhdGFbaV0sIGkpfVxuICAgICAgICAgICAgICAgIG9uUHJlc3NPdXQ9eygpID0+IG9uUHJlc3NPdXQoaSl9XG4gICAgICAgICAgICAgICAgc3Ryb2tlTGluZWNhcD17dHlwZX1cbiAgICAgICAgICAgICAgICBkPXtkcmF3UGF0aH1cbiAgICAgICAgICAgICAgICBvcGFjaXR5PXthbmltYXRlQ29udGFpbmVyT3BhY2l0eX1cbiAgICAgICAgICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgICAgICAgICAgc3Ryb2tlPXtkYXRhW2ldLmNvbG9yfVxuICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXthbmltYXRlZFN0cm9rZVdpZHRoc1tpXX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvU3ZnPlxuICAgICAgICA8QW5pbWF0ZWQuVmlldyBzdHlsZT17X2dldExhYmVsV3JhcHBlclN0eWxlKCl9PlxuICAgICAgICAgIDxUZXh0IHN0eWxlPXtfZ2V0TGFiZWxWYWx1ZVN0eWxlKGRpc3BsYXlWYWx1ZT8uY29sb3IpfT5cbiAgICAgICAgICAgIHtkaXNwbGF5VmFsdWU/LnZhbHVlfVxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICA8VGV4dCBzdHlsZT17X2dldExhYmVsVGl0bGVTdHlsZShkaXNwbGF5VmFsdWU/LmNvbG9yKX0+XG4gICAgICAgICAgICB7ZGlzcGxheVZhbHVlPy5uYW1lfVxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgPC9BbmltYXRlZC5WaWV3PlxuICAgICAgPC9WaWV3PlxuICAgIDwvRnJhZ21lbnQ+XG4gICk7XG59O1xuY29uc3Qgc3R5bGVzID0gU3R5bGVTaGVldC5jcmVhdGUoe1xuICBkZWZhdWx0Q29udGFpbmVyOiB7XG4gICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAganVzdGlmeUNvbnRlbnQ6IFwiY2VudGVyXCIsXG4gICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgfSxcblxuICBkZWZhdWx0TGFiZWxXcmFwcGVyOiB7XG4gICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIixcbiAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICB9LFxuXG4gIGRlZmF1bHRMYWJlbFZhbHVlOiB7XG4gICAgZm9udFNpemU6IDMyLFxuICAgIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLFxuICB9LFxuXG4gIGRlZmF1bHRMYWJlbFRpdGxlOiB7XG4gICAgZm9udFNpemU6IDE2LFxuICB9LFxufSk7XG4iXX0=