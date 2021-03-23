import { PercentPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SmartmeterData } from '../Models/SmartMeterData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pipe: any = new PercentPipe("en-US");

  dataSource: TempSmartmeterData[];
  currentUsageDataSource: CurrentSmartmeterData[];

  constructor() {

    this.currentUsageDataSource = [
      { usage: "In use", val: 1000, color: "#008000"},
      { usage: "Not in use", val: (3000 - 1000), color: "#2E8B57"}
    ];

    this.dataSource = [
      { day: "dag 1", kwh: 1800, cost: 3 },
      { day: "dag 2", kwh: 2000, cost: 4 },
      { day: "dag 3", kwh: 2100, cost: 4 },
      { day: "dag 4", kwh: 1700, cost: 3 },
      { day: "dag 5", kwh: 1500, cost: 2 },
      { day: "dag 6", kwh: 1800, cost: 5 },
      { day: "dag 7", kwh: 2100, cost: 3 }
    ];
  }

  customizeTooltipGraph = (info: any) => {
    return {
        html: "<div><div class='tooltip-header'>" +
            info.argumentText + "</div>" +
            "<div class='tooltip-body'><div class='series-name'>" +
            "<span class='top-series-name'>" + info.points[0].seriesName + "</span>" +": <span class='top-series-value'>" + info.points[0].valueText + "</span>" +
            "</div><div class='series-name'>" +
            "<span class='bottom-series-name'>" + info.points[1].seriesName + "</span>" +
            ": €" + "<span class='bottom-series-value'>" + info.points[1].valueText + "</span>" +
            " </div></div></div>"
    };
  }

  customizeTooltipDonut = (arg: any) => {
    return {
        text: arg.valueText + " - " + this.pipe.transform(arg.percent, "1.2-2")
    };
  }

  ngOnInit(): void {
  }

}

class TempSmartmeterData {
  day: string | undefined;
  kwh: string | undefined;
  cost: number | undefined;
}

class CurrentSmartmeterData {
  usage: string | undefined;
  val: number | undefined;
  color: string | undefined;
}
