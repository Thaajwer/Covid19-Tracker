import { Component, Input, OnInit } from '@angular/core';
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
ColumnChart: NewType = {
  chartType: 'ColumnChart'

}
  constructor(private dataServices : DataServicesService) { }

  initChart(caseType: string){

    let datatable=[];
    datatable.push(["country", "Cases"])
    this.globalData.forEach(cs=>{
      let value :number;
      if(caseType == 'c')
       if(cs.confirmed  > 2000)
        value =cs.confirmed

      if(caseType == 'd')
       if(cs.deaths  > 1000)
        value =cs.deaths

      if(caseType == 'r')
       if(cs.recovered  > 2000)
        value =cs.recovered
    

      if(caseType == 'a')
       if(cs.active  > 2000)
         value =cs.active
     
        datatable.push([
          cs.country, value
        ])

    })
    console.log(datatable)
    
    this.PieChart ={
      chartType:'PieChart',
      dataTable: datatable,
      options: {
        height : 500
      },
    };
    this.ColumnChart ={
      chartType:'ColumnChart',
      dataTable: datatable,
      
      options: {
        height : 500
      },
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
              this.initChart('c');
            }

        }

    )
  }

  updateChart(input : HTMLInputElement){
    console.log(input.value);
    this.initChart(input.value);
    
  }

}
