import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServicesService } from 'src/app/services/data-services.service';

type NewType = GoogleChartInterface;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
totalConfirmed=0;
totalActive=0;
totalDeaths=0;
totalRecovered=0;
globalData : GlobalDataSummary[];
PieChart: NewType = {
  chartType: 'PieChart'

}

  constructor(private dataServices : DataServicesService) { }


  initChart(){

    let datatable=[];
    datatable.push(["country", "Cases"])
    this.globalData.forEach(cs=>{

      datatable.push([
        cs.country, cs.confirmed
      ])
    })
   
    
    this.PieChart ={
      chartType:'PieChart',
      dataTable: datatable,
      options: {'Country': 'Cases'},
    }


  }
  ngOnInit(): void {
    this.dataServices.getGlobalData()
    .subscribe(
        {
            next: (result)=>{
              console.log(result);
              this.globalData=result;

              result.forEach(cs=>{
                if(!Number.isNaN(cs.confirmed)){
                  this.totalActive+=cs.active
                  this.totalConfirmed+=cs.confirmed
                  this.totalDeaths+=cs.deaths
                  this.totalRecovered+=cs.recovered

                }

              })
              this.initChart();
            }

        }

    )
  }

}
