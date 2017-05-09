import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ColorService } from '../_services/color.service';

declare var Chart: any;

Chart.pluginService.register({
    afterUpdate: function (chart) {
        console.log(chart);
        if (chart.config.options.elements.center) {
            var helpers = Chart.helpers;
            var centerConfig = chart.config.options.elements.center;
            var globalConfig = Chart.defaults.global;
            var ctx = chart.chart.ctx;

            var fontStyle = helpers.getValueOrDefault(centerConfig.fontStyle, globalConfig.defaultFontStyle);
            var fontFamily = helpers.getValueOrDefault(centerConfig.fontFamily, globalConfig.defaultFontFamily);

            if (centerConfig.fontSize)
                var fontSize = centerConfig.fontSize;
            // figure out the best font size, if one is not specified
            else {
                ctx.save();
                var fontSize = helpers.getValueOrDefault(centerConfig.minFontSize, 1);
                var maxFontSize = helpers.getValueOrDefault(centerConfig.maxFontSize, 256);
                var maxText = helpers.getValueOrDefault(centerConfig.maxText, centerConfig.text);

                do {
                    ctx.font = helpers.fontString(fontSize, fontStyle, fontFamily);
                    var textWidth = ctx.measureText(maxText).width;

                    // check if it fits, is within configured limits and that we are not simply toggling back and forth
                    if (textWidth < chart.innerRadius * 2 && fontSize < maxFontSize)
                        fontSize += 1;
                    else {
                        // reverse last step
                        fontSize -= 1;
                        break;
                    }
                } while (true)
                ctx.restore();
            }

            // save properties
            chart.center = {
                font: helpers.fontString(fontSize, fontStyle, fontFamily),
                fillStyle: helpers.getValueOrDefault(centerConfig.fontColor, globalConfig.defaultFontColor)
            };
        }
    },
    afterDraw: function (chart) {
        if (chart.center) {
            var centerConfig = chart.config.options.elements.center;
            var ctx = chart.chart.ctx;

            ctx.save();
            ctx.font = chart.center.font;
            ctx.fillStyle = chart.center.fillStyle;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
            var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

            var text = chart.config.data.datasets[0].data[0];
            ctx.fillText(text, centerX, centerY);
            ctx.restore();
        }
    },
});

@Component({
    selector: 'dashboard-doughnut',
    templateUrl: 'dashboard-doughnut.component.html'
})
export class DashboardDoughnutComponent implements OnInit {

    @Input() title: string;
    @Input() data: number[];
    @Input() color: any;
    public doughnutChartColors: Array<any>;
    public doughnutChartOption: any;

    constructor(private colorService: ColorService) {
    }

    ngOnInit(): void {
        this.doughnutChartColors = [{
            backgroundColor: [
                this.colorService.getColor(this.color, '500'),
                this.colorService.getColor(this.color, '100')
            ]
        }];

        this.doughnutChartOption = {
            cutoutPercentage: 60,
            responsive: true,
            maintainAspectRatio: false,
            tooltips: { enabled: false },
            elements: {
                center: {
                    maxText: '100%',
                    text: this.data,
                    fontColor: this.colorService.getColor(this.color, '400'),
                    fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                    fontStyle: 'normal',
                    minFontSize: 1,
                    maxFontSize: 256,
                }
            }
        };
    }
}