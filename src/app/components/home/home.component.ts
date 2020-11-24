import { Component, Input, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServicesService } from 'src/app/services/data-services.service';


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

datatable = [];
  chart = {
    PieChart : "PieChart" ,
    ColumnChart : 'ColumnChart' ,
   
    height: 500, 
    options: {
      animation:{
        duration: 1000,
        easing: 'out',
      },
      is3D: true
    }  
  }
  loading: boolean;
 
  constructor(private dataServices : DataServicesService) { }

  ngOnInit(): void {

    this.dataServices.getGlobalData()
      .subscribe(
        {
          next: (result) => {
            console.log(result);
            this.globalData = result;
            result.forEach(cs => {
              if (!Number.isNaN(cs.confirmed)) {
                this.totalActive += cs.active
                this.totalConfirmed += cs.confirmed
                this.totalDeaths += cs.deaths
                this.totalRecovered += cs.active
              }

            })

            this.initChart('c');
          }, 
          complete : ()=>{
            this.loading = false;
          }
        }
      )
  }




  updateChart(input: HTMLInputElement) {
    console.log(input.value);
    this.initChart(input.value)
  }

  initChart(caseType: string){

    this.datatable=[];
    //datatable.push(["Country", "Cases"])

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
     
        this.datatable.push([
          cs.country, value
        ])

    })
    console.log(this.datatable)

  }
 
}
