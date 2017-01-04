﻿/*
 Highcharts JS v5.0.6 (2016-12-07)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (w) { "object" === typeof module && module.exports ? module.exports = w : w(Highcharts) })(function (w) {
    (function (a) {
        function q(a, b, d) { this.init(a, b, d) } var u = a.each, v = a.extend, l = a.merge, r = a.splat; v(q.prototype, {
            init: function (a, b, d) {
                var m = this, f = m.defaultOptions; m.chart = b; m.options = a = l(f, b.angular ? { background: {} } : void 0, a); (a = a.background) && u([].concat(r(a)).reverse(), function (b) {
                    var c, f = d.userOptions; c = l(m.defaultBackgroundOptions, b); b.backgroundColor && (c.backgroundColor = b.backgroundColor); c.color = c.backgroundColor;
                    d.options.plotBands.unshift(c); f.plotBands = f.plotBands || []; f.plotBands !== d.options.plotBands && f.plotBands.unshift(c)
                })
            }, defaultOptions: { center: ["50%", "50%"], size: "85%", startAngle: 0 }, defaultBackgroundOptions: { className: "highcharts-pane", shape: "circle", borderWidth: 1, borderColor: "#cccccc", backgroundColor: { linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, stops: [[0, "#ffffff"], [1, "#e6e6e6"]] }, from: -Number.MAX_VALUE, innerRadius: 0, to: Number.MAX_VALUE, outerRadius: "105%" }
        }); a.Pane = q
    })(w); (function (a) {
        var q = a.CenteredSeriesMixin,
        u = a.each, v = a.extend, l = a.map, r = a.merge, e = a.noop, b = a.Pane, d = a.pick, m = a.pInt, f = a.splat, t = a.wrap, c, h, k = a.Axis.prototype; a = a.Tick.prototype; c = { getOffset: e, redraw: function () { this.isDirty = !1 }, render: function () { this.isDirty = !1 }, setScale: e, setCategories: e, setTitle: e }; h = {
            defaultRadialGaugeOptions: { labels: { align: "center", x: 0, y: null }, minorGridLineWidth: 0, minorTickInterval: "auto", minorTickLength: 10, minorTickPosition: "inside", minorTickWidth: 1, tickLength: 10, tickPosition: "inside", tickWidth: 2, title: { rotation: 0 }, zIndex: 2 },
            defaultRadialXOptions: { gridLineWidth: 1, labels: { align: null, distance: 15, x: 0, y: null }, maxPadding: 0, minPadding: 0, showLastLabel: !1, tickLength: 0 }, defaultRadialYOptions: { gridLineInterpolation: "circle", labels: { align: "right", x: -3, y: -2 }, showLastLabel: !1, title: { x: 4, text: null, rotation: 90 } }, setOptions: function (p) { p = this.options = r(this.defaultOptions, this.defaultRadialOptions, p); p.plotBands || (p.plotBands = []) }, getOffset: function () {
                k.getOffset.call(this); this.chart.axisOffset[this.side] = 0; this.center = this.pane.center =
                q.getCenter.call(this.pane)
            }, getLinePath: function (p, g) { p = this.center; var b = this.chart, c = d(g, p[2] / 2 - this.offset); this.isCircular || void 0 !== g ? g = this.chart.renderer.symbols.arc(this.left + p[0], this.top + p[1], c, c, { start: this.startAngleRad, end: this.endAngleRad, open: !0, innerR: 0 }) : (g = this.postTranslate(this.angleRad, c), g = ["M", p[0] + b.plotLeft, p[1] + b.plotTop, "L", g.x, g.y]); return g }, setAxisTranslation: function () {
                k.setAxisTranslation.call(this); this.center && (this.transA = this.isCircular ? (this.endAngleRad - this.startAngleRad) /
                (this.max - this.min || 1) : this.center[2] / 2 / (this.max - this.min || 1), this.minPixelPadding = this.isXAxis ? this.transA * this.minPointOffset : 0)
            }, beforeSetTickPositions: function () { if (this.autoConnect = this.isCircular && void 0 === d(this.userMax, this.options.max) && this.endAngleRad - this.startAngleRad === 2 * Math.PI) this.max += this.categories && 1 || this.pointRange || this.closestPointRange || 0 }, setAxisSize: function () {
                k.setAxisSize.call(this); this.isRadial && (this.center = this.pane.center = q.getCenter.call(this.pane), this.isCircular &&
                (this.sector = this.endAngleRad - this.startAngleRad), this.len = this.width = this.height = this.center[2] * d(this.sector, 1) / 2)
            }, getPosition: function (b, g) { return this.postTranslate(this.isCircular ? this.translate(b) : this.angleRad, d(this.isCircular ? g : this.translate(b), this.center[2] / 2) - this.offset) }, postTranslate: function (b, g) { var d = this.chart, c = this.center; b = this.startAngleRad + b; return { x: d.plotLeft + c[0] + Math.cos(b) * g, y: d.plotTop + c[1] + Math.sin(b) * g } }, getPlotBandPath: function (b, g, c) {
                var p = this.center, f = this.startAngleRad,
                k = p[2] / 2, n = [d(c.outerRadius, "100%"), c.innerRadius, d(c.thickness, 10)], a = Math.min(this.offset, 0), h = /%$/, t, e = this.isCircular; "polygon" === this.options.gridLineInterpolation ? p = this.getPlotLinePath(b).concat(this.getPlotLinePath(g, !0)) : (b = Math.max(b, this.min), g = Math.min(g, this.max), e || (n[0] = this.translate(b), n[1] = this.translate(g)), n = l(n, function (b) { h.test(b) && (b = m(b, 10) * k / 100); return b }), "circle" !== c.shape && e ? (b = f + this.translate(b), g = f + this.translate(g)) : (b = -Math.PI / 2, g = 1.5 * Math.PI, t = !0), n[0] -= a, n[2] -=
                a, p = this.chart.renderer.symbols.arc(this.left + p[0], this.top + p[1], n[0], n[0], { start: Math.min(b, g), end: Math.max(b, g), innerR: d(n[1], n[0] - n[2]), open: t })); return p
            }, getPlotLinePath: function (b, g) {
                var c = this, d = c.center, m = c.chart, p = c.getPosition(b), f, k, a; c.isCircular ? a = ["M", d[0] + m.plotLeft, d[1] + m.plotTop, "L", p.x, p.y] : "circle" === c.options.gridLineInterpolation ? (b = c.translate(b)) && (a = c.getLinePath(0, b)) : (u(m.xAxis, function (b) { b.pane === c.pane && (f = b) }), a = [], b = c.translate(b), d = f.tickPositions, f.autoConnect && (d =
                d.concat([d[0]])), g && (d = [].concat(d).reverse()), u(d, function (c, g) { k = f.getPosition(c, b); a.push(g ? "L" : "M", k.x, k.y) })); return a
            }, getTitlePosition: function () { var b = this.center, c = this.chart, d = this.options.title; return { x: c.plotLeft + b[0] + (d.x || 0), y: c.plotTop + b[1] - { high: .5, middle: .25, low: 0 }[d.align] * b[2] + (d.y || 0) } }
        }; t(k, "init", function (m, g, k) {
            var p = g.angular, a = g.polar, n = k.isX, t = p && n, e, x = g.options, l = k.pane || 0; if (p) { if (v(this, t ? c : h), e = !n) this.defaultRadialOptions = this.defaultRadialGaugeOptions } else a && (v(this,
            h), this.defaultRadialOptions = (e = n) ? this.defaultRadialXOptions : r(this.defaultYAxisOptions, this.defaultRadialYOptions)); p || a ? (this.isRadial = !0, g.inverted = !1, x.chart.zoomType = null) : this.isRadial = !1; m.call(this, g, k); t || !p && !a || (m = this.options, g.panes || (g.panes = []), this.pane = g = g.panes[l] = g.panes[l] || new b(f(x.pane)[l], g, this), g = g.options, this.angleRad = (m.angle || 0) * Math.PI / 180, this.startAngleRad = (g.startAngle - 90) * Math.PI / 180, this.endAngleRad = (d(g.endAngle, g.startAngle + 360) - 90) * Math.PI / 180, this.offset = m.offset ||
            0, this.isCircular = e)
        }); t(k, "autoLabelAlign", function (b) { if (!this.isRadial) return b.apply(this, [].slice.call(arguments, 1)) }); t(a, "getPosition", function (b, c, d, m, f) { var g = this.axis; return g.getPosition ? g.getPosition(d) : b.call(this, c, d, m, f) }); t(a, "getLabelPosition", function (b, c, m, f, k, a, h, t, e) {
            var g = this.axis, p = a.y, n = 20, x = a.align, z = (g.translate(this.pos) + g.startAngleRad + Math.PI / 2) / Math.PI * 180 % 360; g.isRadial ? (b = g.getPosition(this.pos, g.center[2] / 2 + d(a.distance, -25)), "auto" === a.rotation ? f.attr({ rotation: z }) :
            null === p && (p = g.chart.renderer.fontMetrics(f.styles.fontSize).b - f.getBBox().height / 2), null === x && (g.isCircular ? (this.label.getBBox().width > g.len * g.tickInterval / (g.max - g.min) && (n = 0), x = z > n && z < 180 - n ? "left" : z > 180 + n && z < 360 - n ? "right" : "center") : x = "center", f.attr({ align: x })), b.x += a.x, b.y += p) : b = b.call(this, c, m, f, k, a, h, t, e); return b
        }); t(a, "getMarkPath", function (b, c, d, m, f, a, k) { var g = this.axis; g.isRadial ? (b = g.getPosition(this.pos, g.center[2] / 2 + m), c = ["M", c, d, "L", b.x, b.y]) : c = b.call(this, c, d, m, f, a, k); return c })
    })(w);
    (function (a) {
        var q = a.each, u = a.noop, v = a.pick, l = a.Series, r = a.seriesType, e = a.seriesTypes; r("arearange", "area", { lineWidth: 1, marker: null, threshold: null, tooltip: { pointFormat: '\x3cspan style\x3d"color:{series.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e' }, trackByArea: !0, dataLabels: { align: null, verticalAlign: null, xLow: 0, xHigh: 0, yLow: 0, yHigh: 0 }, states: { hover: { halo: !1 } } }, {
            pointArrayMap: ["low", "high"], dataLabelCollections: ["dataLabel",
            "dataLabelUpper"], toYData: function (b) { return [b.low, b.high] }, pointValKey: "low", deferTranslatePolar: !0, highToXY: function (b) { var d = this.chart, m = this.xAxis.postTranslate(b.rectPlotX, this.yAxis.len - b.plotHigh); b.plotHighX = m.x - d.plotLeft; b.plotHigh = m.y - d.plotTop }, translate: function () {
                var b = this, d = b.yAxis, m = !!b.modifyValue; e.area.prototype.translate.apply(b); q(b.points, function (f) {
                    var a = f.low, c = f.high, h = f.plotY; null === c || null === a ? f.isNull = !0 : (f.plotLow = h, f.plotHigh = d.translate(m ? b.modifyValue(c, f) : c, 0, 1,
                    0, 1), m && (f.yBottom = f.plotHigh))
                }); this.chart.polar && q(this.points, function (d) { b.highToXY(d) })
            }, getGraphPath: function (b) {
                var d = [], m = [], f, a = e.area.prototype.getGraphPath, c, h, k; k = this.options; var p = k.step; b = b || this.points; for (f = b.length; f--;) c = b[f], c.isNull || k.connectEnds || b[f + 1] && !b[f + 1].isNull || m.push({ plotX: c.plotX, plotY: c.plotY, doCurve: !1 }), h = { polarPlotY: c.polarPlotY, rectPlotX: c.rectPlotX, yBottom: c.yBottom, plotX: v(c.plotHighX, c.plotX), plotY: c.plotHigh, isNull: c.isNull }, m.push(h), d.push(h), c.isNull ||
                k.connectEnds || b[f - 1] && !b[f - 1].isNull || m.push({ plotX: c.plotX, plotY: c.plotY, doCurve: !1 }); b = a.call(this, b); p && (!0 === p && (p = "left"), k.step = { left: "right", center: "center", right: "left" }[p]); d = a.call(this, d); m = a.call(this, m); k.step = p; k = [].concat(b, d); this.chart.polar || "M" !== m[0] || (m[0] = "L"); this.graphPath = k; this.areaPath = this.areaPath.concat(b, m); k.isArea = !0; k.xMap = b.xMap; this.areaPath.xMap = b.xMap; return k
            }, drawDataLabels: function () {
                var b = this.data, d = b.length, m, a = [], t = l.prototype, c = this.options.dataLabels,
                h = c.align, k = c.verticalAlign, p = c.inside, g, n, e = this.chart.inverted; if (c.enabled || this._hasPointLabels) {
                    for (m = d; m--;) if (g = b[m]) n = p ? g.plotHigh < g.plotLow : g.plotHigh > g.plotLow, g.y = g.high, g._plotY = g.plotY, g.plotY = g.plotHigh, a[m] = g.dataLabel, g.dataLabel = g.dataLabelUpper, g.below = n, e ? h || (c.align = n ? "right" : "left") : k || (c.verticalAlign = n ? "top" : "bottom"), c.x = c.xHigh, c.y = c.yHigh; t.drawDataLabels && t.drawDataLabels.apply(this, arguments); for (m = d; m--;) if (g = b[m]) n = p ? g.plotHigh < g.plotLow : g.plotHigh > g.plotLow, g.dataLabelUpper =
                    g.dataLabel, g.dataLabel = a[m], g.y = g.low, g.plotY = g._plotY, g.below = !n, e ? h || (c.align = n ? "left" : "right") : k || (c.verticalAlign = n ? "bottom" : "top"), c.x = c.xLow, c.y = c.yLow; t.drawDataLabels && t.drawDataLabels.apply(this, arguments)
                } c.align = h; c.verticalAlign = k
            }, alignDataLabel: function () { e.column.prototype.alignDataLabel.apply(this, arguments) }, setStackedPoints: u, getSymbol: u, drawPoints: u
        })
    })(w); (function (a) { var q = a.seriesType; q("areasplinerange", "arearange", null, { getPointSpline: a.seriesTypes.spline.prototype.getPointSpline }) })(w);
    (function (a) {
        var q = a.defaultPlotOptions, u = a.each, v = a.merge, l = a.noop, r = a.pick, e = a.seriesType, b = a.seriesTypes.column.prototype; e("columnrange", "arearange", v(q.column, q.arearange, { lineWidth: 1, pointRange: null }), {
            translate: function () {
                var d = this, m = d.yAxis, a = d.xAxis, t = a.startAngleRad, c, h = d.chart, k = d.xAxis.isRadial, p; b.translate.apply(d); u(d.points, function (b) {
                    var g = b.shapeArgs, f = d.options.minPointLength, e, l; b.plotHigh = p = m.translate(b.high, 0, 1, 0, 1); b.plotLow = b.plotY; l = p; e = r(b.rectPlotY, b.plotY) - p; Math.abs(e) <
                    f ? (f -= e, e += f, l -= f / 2) : 0 > e && (e *= -1, l -= e); k ? (c = b.barX + t, b.shapeType = "path", b.shapeArgs = { d: d.polarArc(l + e, l, c, c + b.pointWidth) }) : (g.height = e, g.y = l, b.tooltipPos = h.inverted ? [m.len + m.pos - h.plotLeft - l - e / 2, a.len + a.pos - h.plotTop - g.x - g.width / 2, e] : [a.left - h.plotLeft + g.x + g.width / 2, m.pos - h.plotTop + l + e / 2, e])
                })
            }, directTouch: !0, trackerGroups: ["group", "dataLabelsGroup"], drawGraph: l, crispCol: b.crispCol, drawPoints: b.drawPoints, drawTracker: b.drawTracker, getColumnMetrics: b.getColumnMetrics, animate: function () {
                return b.animate.apply(this,
                arguments)
            }, polarArc: function () { return b.polarArc.apply(this, arguments) }, pointAttribs: b.pointAttribs
        })
    })(w); (function (a) {
        var q = a.each, u = a.isNumber, v = a.merge, l = a.pick, r = a.pInt, e = a.Series, b = a.seriesType, d = a.TrackerMixin; b("gauge", "line", { dataLabels: { enabled: !0, defer: !1, y: 15, borderRadius: 3, crop: !1, verticalAlign: "top", zIndex: 2, borderWidth: 1, borderColor: "#cccccc" }, dial: {}, pivot: {}, tooltip: { headerFormat: "" }, showInLegend: !1 }, {
            angular: !0, directTouch: !0, drawGraph: a.noop, fixedBox: !0, forceDL: !0, noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"], translate: function () {
                var b = this.yAxis, d = this.options, a = b.center; this.generatePoints(); q(this.points, function (c) {
                    var m = v(d.dial, c.dial), k = r(l(m.radius, 80)) * a[2] / 200, f = r(l(m.baseLength, 70)) * k / 100, g = r(l(m.rearLength, 10)) * k / 100, n = m.baseWidth || 3, t = m.topWidth || 1, e = d.overshoot, q = b.startAngleRad + b.translate(c.y, null, null, null, !0); u(e) ? (e = e / 180 * Math.PI, q = Math.max(b.startAngleRad - e, Math.min(b.endAngleRad + e, q))) : !1 === d.wrap && (q = Math.max(b.startAngleRad, Math.min(b.endAngleRad,
                    q))); q = 180 * q / Math.PI; c.shapeType = "path"; c.shapeArgs = { d: m.path || ["M", -g, -n / 2, "L", f, -n / 2, k, -t / 2, k, t / 2, f, n / 2, -g, n / 2, "z"], translateX: a[0], translateY: a[1], rotation: q }; c.plotX = a[0]; c.plotY = a[1]
                })
            }, drawPoints: function () {
                var b = this, d = b.yAxis.center, a = b.pivot, c = b.options, h = c.pivot, k = b.chart.renderer; q(b.points, function (d) {
                    var g = d.graphic, a = d.shapeArgs, m = a.d, f = v(c.dial, d.dial); g ? (g.animate(a), a.d = m) : (d.graphic = k[d.shapeType](a).attr({ rotation: a.rotation, zIndex: 1 }).addClass("highcharts-dial").add(b.group), d.graphic.attr({
                        stroke: f.borderColor ||
                        "none", "stroke-width": f.borderWidth || 0, fill: f.backgroundColor || "#000000"
                    }))
                }); a ? a.animate({ translateX: d[0], translateY: d[1] }) : (b.pivot = k.circle(0, 0, l(h.radius, 5)).attr({ zIndex: 2 }).addClass("highcharts-pivot").translate(d[0], d[1]).add(b.group), b.pivot.attr({ "stroke-width": h.borderWidth || 0, stroke: h.borderColor || "#cccccc", fill: h.backgroundColor || "#000000" }))
            }, animate: function (b) {
                var d = this; b || (q(d.points, function (b) {
                    var c = b.graphic; c && (c.attr({ rotation: 180 * d.yAxis.startAngleRad / Math.PI }), c.animate({ rotation: b.shapeArgs.rotation },
                    d.options.animation))
                }), d.animate = null)
            }, render: function () { this.group = this.plotGroup("group", "series", this.visible ? "visible" : "hidden", this.options.zIndex, this.chart.seriesGroup); e.prototype.render.call(this); this.group.clip(this.chart.clipRect) }, setData: function (b, d) { e.prototype.setData.call(this, b, !1); this.processData(); this.generatePoints(); l(d, !0) && this.chart.redraw() }, drawTracker: d && d.drawTrackerPoint
        }, { setState: function (b) { this.state = b } })
    })(w); (function (a) {
        var q = a.each, u = a.noop, v = a.pick, l = a.seriesType,
        r = a.seriesTypes; l("boxplot", "column", { threshold: null, tooltip: { pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eMaximum: {point.high}\x3cbr/\x3eUpper quartile: {point.q3}\x3cbr/\x3eMedian: {point.median}\x3cbr/\x3eLower quartile: {point.q1}\x3cbr/\x3eMinimum: {point.low}\x3cbr/\x3e' }, whiskerLength: "50%", fillColor: "#ffffff", lineWidth: 1, medianWidth: 2, states: { hover: { brightness: -.3 } }, whiskerWidth: 2 }, {
            pointArrayMap: ["low", "q1", "median",
            "q3", "high"], toYData: function (a) { return [a.low, a.q1, a.median, a.q3, a.high] }, pointValKey: "high", pointAttribs: function (a) { var b = this.options, d = a && a.color || this.color; return { fill: a.fillColor || b.fillColor || d, stroke: b.lineColor || d, "stroke-width": b.lineWidth || 0 } }, drawDataLabels: u, translate: function () { var a = this.yAxis, b = this.pointArrayMap; r.column.prototype.translate.apply(this); q(this.points, function (d) { q(b, function (b) { null !== d[b] && (d[b + "Plot"] = a.translate(d[b], 0, 1, 0, 1)) }) }) }, drawPoints: function () {
                var a =
                this, b = a.options, d = a.chart.renderer, m, f, t, c, h, k, p = 0, g, n, l, r, B = !1 !== a.doQuartiles, u, y = a.options.whiskerLength; q(a.points, function (e) {
                    var q = e.graphic, z = q ? "animate" : "attr", x = e.shapeArgs, w = {}, D = {}, H = {}, I = e.color || a.color; void 0 !== e.plotY && (g = x.width, n = Math.floor(x.x), l = n + g, r = Math.round(g / 2), m = Math.floor(B ? e.q1Plot : e.lowPlot), f = Math.floor(B ? e.q3Plot : e.lowPlot), t = Math.floor(e.highPlot), c = Math.floor(e.lowPlot), q || (e.graphic = q = d.g("point").add(a.group), e.stem = d.path().addClass("highcharts-boxplot-stem").add(q),
                    y && (e.whiskers = d.path().addClass("highcharts-boxplot-whisker").add(q)), B && (e.box = d.path(void 0).addClass("highcharts-boxplot-box").add(q)), e.medianShape = d.path(void 0).addClass("highcharts-boxplot-median").add(q), w.stroke = e.stemColor || b.stemColor || I, w["stroke-width"] = v(e.stemWidth, b.stemWidth, b.lineWidth), w.dashstyle = e.stemDashStyle || b.stemDashStyle, e.stem.attr(w), y && (D.stroke = e.whiskerColor || b.whiskerColor || I, D["stroke-width"] = v(e.whiskerWidth, b.whiskerWidth, b.lineWidth), e.whiskers.attr(D)), B && (q =
                    a.pointAttribs(e), e.box.attr(q)), H.stroke = e.medianColor || b.medianColor || I, H["stroke-width"] = v(e.medianWidth, b.medianWidth, b.lineWidth), e.medianShape.attr(H)), k = e.stem.strokeWidth() % 2 / 2, p = n + r + k, e.stem[z]({ d: ["M", p, f, "L", p, t, "M", p, m, "L", p, c] }), B && (k = e.box.strokeWidth() % 2 / 2, m = Math.floor(m) + k, f = Math.floor(f) + k, n += k, l += k, e.box[z]({ d: ["M", n, f, "L", n, m, "L", l, m, "L", l, f, "L", n, f, "z"] })), y && (k = e.whiskers.strokeWidth() % 2 / 2, t += k, c += k, u = /%$/.test(y) ? r * parseFloat(y) / 100 : y / 2, e.whiskers[z]({
                        d: ["M", p - u, t, "L", p + u, t,
                        "M", p - u, c, "L", p + u, c]
                    })), h = Math.round(e.medianPlot), k = e.medianShape.strokeWidth() % 2 / 2, h += k, e.medianShape[z]({ d: ["M", n, h, "L", l, h] }))
                })
            }, setStackedPoints: u
        })
    })(w); (function (a) {
        var q = a.each, u = a.noop, v = a.seriesType, l = a.seriesTypes; v("errorbar", "boxplot", { color: "#000000", grouping: !1, linkedTo: ":previous", tooltip: { pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e' }, whiskerWidth: null }, {
            type: "errorbar",
            pointArrayMap: ["low", "high"], toYData: function (a) { return [a.low, a.high] }, pointValKey: "high", doQuartiles: !1, drawDataLabels: l.arearange ? function () { var a = this.pointValKey; l.arearange.prototype.drawDataLabels.call(this); q(this.data, function (e) { e.y = e[a] }) } : u, getColumnMetrics: function () { return this.linkedParent && this.linkedParent.columnMetrics || l.column.prototype.getColumnMetrics.call(this) }
        })
    })(w); (function (a) {
        var q = a.correctFloat, u = a.isNumber, v = a.pick, l = a.Point, r = a.Series, e = a.seriesType, b = a.seriesTypes;
        e("waterfall", "column", { dataLabels: { inside: !0 }, lineWidth: 1, lineColor: "#333333", dashStyle: "dot", borderColor: "#333333", states: { hover: { lineWidthPlus: 0 } } }, {
            pointValKey: "y", translate: function () {
                var d = this.options, a = this.yAxis, f, e, c, h, k, p, g, n, l, r = v(d.minPointLength, 5), u = d.threshold, w = d.stacking, y = 0, x = 0, A; b.column.prototype.translate.apply(this); g = n = u; e = this.points; f = 0; for (d = e.length; f < d; f++) c = e[f], p = this.processedYData[f], h = c.shapeArgs, k = w && a.stacks[(this.negStacks && p < u ? "-" : "") + this.stackKey], A = this.getStackIndicator(A,
                c.x), l = k ? k[c.x].points[this.index + "," + f + "," + A.index] : [0, p], c.isSum ? c.y = q(p) : c.isIntermediateSum && (c.y = q(p - n)), k = Math.max(g, g + c.y) + l[0], h.y = a.toPixels(k, !0), c.isSum ? (h.y = a.toPixels(l[1], !0), h.height = Math.min(a.toPixels(l[0], !0), a.len) - h.y + y + x) : c.isIntermediateSum ? (h.y = a.toPixels(l[1], !0), h.height = Math.min(a.toPixels(n, !0), a.len) - h.y + y + x, n = l[1]) : (h.height = 0 < p ? a.toPixels(g, !0) - h.y : a.toPixels(g, !0) - a.toPixels(g - p, !0), g += p), 0 > h.height && (h.y += h.height, h.height *= -1), c.plotY = h.y = Math.round(h.y) - this.borderWidth %
                2 / 2, h.height = Math.max(Math.round(h.height), .001), c.yBottom = h.y + h.height, h.y -= x, h.height <= r && !c.isNull && (h.height = r, 0 > c.y ? x -= r : y += r), h.y -= y, h = c.plotY - x - y + (c.negative && 0 <= x ? h.height : 0), this.chart.inverted ? c.tooltipPos[0] = a.len - h : c.tooltipPos[1] = h
            }, processData: function (b) {
                var a = this.yData, d = this.options.data, e, c = a.length, h, k, p, g, n, l; k = h = p = g = this.options.threshold || 0; for (l = 0; l < c; l++) n = a[l], e = d && d[l] ? d[l] : {}, "sum" === n || e.isSum ? a[l] = q(k) : "intermediateSum" === n || e.isIntermediateSum ? a[l] = q(h) : (k += n, h += n),
                p = Math.min(k, p), g = Math.max(k, g); r.prototype.processData.call(this, b); this.dataMin = p; this.dataMax = g
            }, toYData: function (b) { return b.isSum ? 0 === b.x ? null : "sum" : b.isIntermediateSum ? 0 === b.x ? null : "intermediateSum" : b.y }, pointAttribs: function (a, m) { var d = this.options.upColor; d && !a.options.color && (a.color = 0 < a.y ? d : null); a = b.column.prototype.pointAttribs.call(this, a, m); delete a.dashstyle; return a }, getGraphPath: function () { return ["M", 0, 0] }, getCrispPath: function () {
                var b = this.data, a = b.length, f = this.graph.strokeWidth() +
                this.borderWidth, f = Math.round(f) % 2 / 2, e = [], c, h, k; for (k = 1; k < a; k++) h = b[k].shapeArgs, c = b[k - 1].shapeArgs, h = ["M", c.x + c.width, c.y + f, "L", h.x, c.y + f], 0 > b[k - 1].y && (h[2] += c.height, h[5] += c.height), e = e.concat(h); return e
            }, drawGraph: function () { r.prototype.drawGraph.call(this); this.graph.attr({ d: this.getCrispPath() }) }, getExtremes: a.noop
        }, {
            getClassName: function () { var b = l.prototype.getClassName.call(this); this.isSum ? b += " highcharts-sum" : this.isIntermediateSum && (b += " highcharts-intermediate-sum"); return b }, isValid: function () {
                return u(this.y,
                !0) || this.isSum || this.isIntermediateSum
            }
        })
    })(w); (function (a) {
        var q = a.Series, u = a.seriesType, v = a.seriesTypes; u("polygon", "scatter", { marker: { enabled: !1, states: { hover: { enabled: !1 } } }, stickyTracking: !1, tooltip: { followPointer: !0, pointFormat: "" }, trackByArea: !0 }, {
            type: "polygon", getGraphPath: function () { for (var a = q.prototype.getGraphPath.call(this), r = a.length + 1; r--;) (r === a.length || "M" === a[r]) && 0 < r && a.splice(r, 0, "z"); return this.areaPath = a }, drawGraph: function () { this.options.fillColor = this.color; v.area.prototype.drawGraph.call(this) },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, drawTracker: q.prototype.drawTracker, setStackedPoints: a.noop
        })
    })(w); (function (a) {
        var q = a.arrayMax, u = a.arrayMin, v = a.Axis, l = a.color, r = a.each, e = a.isNumber, b = a.noop, d = a.pick, m = a.pInt, f = a.Point, t = a.Series, c = a.seriesType, h = a.seriesTypes; c("bubble", "scatter", {
            dataLabels: { formatter: function () { return this.point.z }, inside: !0, verticalAlign: "middle" }, marker: { lineColor: null, lineWidth: 1, radius: null, states: { hover: { radiusPlus: 0 } } }, minSize: 8, maxSize: "20%", softThreshold: !1,
            states: { hover: { halo: { size: 5 } } }, tooltip: { pointFormat: "({point.x}, {point.y}), Size: {point.z}" }, turboThreshold: 0, zThreshold: 0, zoneAxis: "z"
        }, {
            pointArrayMap: ["y", "z"], parallelArrays: ["x", "y", "z"], trackerGroups: ["group", "dataLabelsGroup"], bubblePadding: !0, zoneAxis: "z", markerAttribs: null, pointAttribs: function (b, a) { var c = d(this.options.marker.fillOpacity, .5); b = t.prototype.pointAttribs.call(this, b, a); 1 !== c && (b.fill = l(b.fill).setOpacity(c).get("rgba")); return b }, getRadii: function (b, a, c, d) {
                var g, k, f, e = this.zData,
                m = [], h = this.options, p = "width" !== h.sizeBy, n = h.zThreshold, t = a - b; k = 0; for (g = e.length; k < g; k++) f = e[k], h.sizeByAbsoluteValue && null !== f && (f = Math.abs(f - n), a = Math.max(a - n, Math.abs(b - n)), b = 0), null === f ? f = null : f < b ? f = c / 2 - 1 : (f = 0 < t ? (f - b) / t : .5, p && 0 <= f && (f = Math.sqrt(f)), f = Math.ceil(c + f * (d - c)) / 2), m.push(f); this.radii = m
            }, animate: function (b) { var a = this.options.animation; b || (r(this.points, function (b) { var c = b.graphic; b = b.shapeArgs; c && b && (c.attr("r", 1), c.animate({ r: b.r }, a)) }), this.animate = null) }, translate: function () {
                var b,
                a = this.data, c, d, f = this.radii; h.scatter.prototype.translate.call(this); for (b = a.length; b--;) c = a[b], d = f ? f[b] : 0, e(d) && d >= this.minPxSize / 2 ? (c.shapeType = "circle", c.shapeArgs = { x: c.plotX, y: c.plotY, r: d }, c.dlBox = { x: c.plotX - d, y: c.plotY - d, width: 2 * d, height: 2 * d }) : c.shapeArgs = c.plotY = c.dlBox = void 0
            }, drawLegendSymbol: function (b, a) {
                var c = this.chart.renderer, d = c.fontMetrics(b.itemStyle && b.itemStyle.fontSize, a.legendItem).f / 2; a.legendSymbol = c.circle(d, b.baseline - d, d).attr({ zIndex: 3 }).add(a.legendGroup); a.legendSymbol.isMarker =
                !0
            }, drawPoints: h.column.prototype.drawPoints, alignDataLabel: h.column.prototype.alignDataLabel, buildKDTree: b, applyZones: b
        }, { haloPath: function (b) { return f.prototype.haloPath.call(this, 0 === b ? 0 : this.shapeArgs.r + b) }, ttBelow: !1 }); v.prototype.beforePadding = function () {
            var b = this, a = this.len, c = this.chart, f = 0, h = a, t = this.isXAxis, l = t ? "xData" : "yData", v = this.min, w = {}, x = Math.min(c.plotWidth, c.plotHeight), A = Number.MAX_VALUE, E = -Number.MAX_VALUE, F = this.max - v, C = a / F, G = []; r(this.series, function (a) {
                var f = a.options; !a.bubblePadding ||
                !a.visible && c.options.chart.ignoreHiddenSeries || (b.allowZoomOutside = !0, G.push(a), t && (r(["minSize", "maxSize"], function (b) { var a = f[b], c = /%$/.test(a), a = m(a); w[b] = c ? x * a / 100 : a }), a.minPxSize = w.minSize, a.maxPxSize = Math.max(w.maxSize, w.minSize), a = a.zData, a.length && (A = d(f.zMin, Math.min(A, Math.max(u(a), !1 === f.displayNegative ? f.zThreshold : -Number.MAX_VALUE))), E = d(f.zMax, Math.max(E, q(a))))))
            }); r(G, function (a) {
                var c = a[l], d = c.length, g; t && a.getRadii(A, E, a.minPxSize, a.maxPxSize); if (0 < F) for (; d--;) e(c[d]) && b.dataMin <=
                c[d] && c[d] <= b.dataMax && (g = a.radii[d], f = Math.min((c[d] - v) * C - g, f), h = Math.max((c[d] - v) * C + g, h))
            }); G.length && 0 < F && !this.isLog && (h -= a, C *= (a + f - h) / a, r([["min", "userMin", f], ["max", "userMax", h]], function (a) { void 0 === d(b.options[a[0]], b[a[1]]) && (b[a[0]] += a[2] / C) }))
        }
    })(w); (function (a) {
        function q(b, a) {
            var d = this.chart, f = this.options.animation, e = this.group, c = this.markerGroup, h = this.xAxis.center, k = d.plotLeft, p = d.plotTop; d.polar ? d.renderer.isSVG && (!0 === f && (f = {}), a ? (b = {
                translateX: h[0] + k, translateY: h[1] + p, scaleX: .001,
                scaleY: .001
            }, e.attr(b), c && c.attr(b)) : (b = { translateX: k, translateY: p, scaleX: 1, scaleY: 1 }, e.animate(b, f), c && c.animate(b, f), this.animate = null)) : b.call(this, a)
        } var u = a.each, v = a.pick, l = a.seriesTypes, r = a.wrap, e = a.Series.prototype; a = a.Pointer.prototype; e.searchPointByAngle = function (b) { var a = this.chart, e = this.xAxis.pane.center; return this.searchKDTree({ clientX: 180 + -180 / Math.PI * Math.atan2(b.chartX - e[0] - a.plotLeft, b.chartY - e[1] - a.plotTop) }) }; r(e, "buildKDTree", function (b) {
            this.chart.polar && (this.kdByAngle ? this.searchPoint =
            this.searchPointByAngle : this.kdDimensions = 2); b.apply(this)
        }); e.toXY = function (b) { var a, e = this.chart, f = b.plotX; a = b.plotY; b.rectPlotX = f; b.rectPlotY = a; a = this.xAxis.postTranslate(b.plotX, this.yAxis.len - a); b.plotX = b.polarPlotX = a.x - e.plotLeft; b.plotY = b.polarPlotY = a.y - e.plotTop; this.kdByAngle ? (e = (f / Math.PI * 180 + this.xAxis.pane.options.startAngle) % 360, 0 > e && (e += 360), b.clientX = e) : b.clientX = b.plotX }; l.spline && r(l.spline.prototype, "getPointSpline", function (b, a, e, f) {
            var d, c, h, k, m, g, n; this.chart.polar ? (d = e.plotX,
            c = e.plotY, b = a[f - 1], h = a[f + 1], this.connectEnds && (b || (b = a[a.length - 2]), h || (h = a[1])), b && h && (k = b.plotX, m = b.plotY, a = h.plotX, g = h.plotY, k = (1.5 * d + k) / 2.5, m = (1.5 * c + m) / 2.5, h = (1.5 * d + a) / 2.5, n = (1.5 * c + g) / 2.5, a = Math.sqrt(Math.pow(k - d, 2) + Math.pow(m - c, 2)), g = Math.sqrt(Math.pow(h - d, 2) + Math.pow(n - c, 2)), k = Math.atan2(m - c, k - d), m = Math.atan2(n - c, h - d), n = Math.PI / 2 + (k + m) / 2, Math.abs(k - n) > Math.PI / 2 && (n -= Math.PI), k = d + Math.cos(n) * a, m = c + Math.sin(n) * a, h = d + Math.cos(Math.PI + n) * g, n = c + Math.sin(Math.PI + n) * g, e.rightContX = h, e.rightContY = n),
            f ? (e = ["C", b.rightContX || b.plotX, b.rightContY || b.plotY, k || d, m || c, d, c], b.rightContX = b.rightContY = null) : e = ["M", d, c]) : e = b.call(this, a, e, f); return e
        }); r(e, "translate", function (b) { var a = this.chart; b.call(this); if (a.polar && (this.kdByAngle = a.tooltip && a.tooltip.shared, !this.preventPostTranslate)) for (b = this.points, a = b.length; a--;) this.toXY(b[a]) }); r(e, "getGraphPath", function (b, a) {
            var d = this, f, e; if (this.chart.polar) {
                a = a || this.points; for (f = 0; f < a.length; f++) if (!a[f].isNull) { e = f; break } !1 !== this.options.connectEnds &&
                void 0 !== e && (this.connectEnds = !0, a.splice(a.length, 0, a[e])); u(a, function (a) { void 0 === a.polarPlotY && d.toXY(a) })
            } return b.apply(this, [].slice.call(arguments, 1))
        }); r(e, "animate", q); l.column && (l = l.column.prototype, l.polarArc = function (a, d, e, f) { var b = this.xAxis.center, c = this.yAxis.len; return this.chart.renderer.symbols.arc(b[0], b[1], c - d, null, { start: e, end: f, innerR: c - v(a, c) }) }, r(l, "animate", q), r(l, "translate", function (a) {
            var b = this.xAxis, e = b.startAngleRad, f, l, c; this.preventPostTranslate = !0; a.call(this); if (b.isRadial) for (f =
            this.points, c = f.length; c--;) l = f[c], a = l.barX + e, l.shapeType = "path", l.shapeArgs = { d: this.polarArc(l.yBottom, l.plotY, a, a + l.pointWidth) }, this.toXY(l), l.tooltipPos = [l.plotX, l.plotY], l.ttBelow = l.plotY > b.center[1]
        }), r(l, "alignDataLabel", function (a, d, m, f, l, c) {
            this.chart.polar ? (a = d.rectPlotX / Math.PI * 180, null === f.align && (f.align = 20 < a && 160 > a ? "left" : 200 < a && 340 > a ? "right" : "center"), null === f.verticalAlign && (f.verticalAlign = 45 > a || 315 < a ? "bottom" : 135 < a && 225 > a ? "top" : "middle"), e.alignDataLabel.call(this, d, m, f, l, c)) : a.call(this,
            d, m, f, l, c)
        })); r(a, "getCoordinates", function (a, d) { var b = this.chart, f = { xAxis: [], yAxis: [] }; b.polar ? u(b.axes, function (a) { var c = a.isXAxis, e = a.center, k = d.chartX - e[0] - b.plotLeft, e = d.chartY - e[1] - b.plotTop; f[c ? "xAxis" : "yAxis"].push({ axis: a, value: a.translate(c ? Math.PI - Math.atan2(k, e) : Math.sqrt(Math.pow(k, 2) + Math.pow(e, 2)), !0) }) }) : f = a.call(this, d); return f })
    })(w)
});
