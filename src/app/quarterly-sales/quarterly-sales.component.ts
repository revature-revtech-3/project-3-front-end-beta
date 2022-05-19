import { Component, OnInit } from '@angular/core';

import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js';
import { Productdata } from '../models/productdata.model';
import { Productdata2 } from '../models/productdata2.model';
import { AdminSalesService } from '../services/admin-sales.service';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

@Component({
  selector: 'app-quarterly-sales',
  templateUrl: './quarterly-sales.component.html',
  styleUrls: ['./quarterly-sales.component.scss']
})
export class QuarterlySalesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  this.loadArray2();
  const ctx4 = document.getElementById("myChart4");
    const myChart4 = new Chart("myChart4", {
        type: 'bar',
        data: {
            labels: ['Quarter 1', 'Quarter 2','Quarter 3','Quarter 4'],
            datasets: [{
                label: 'Total Quarterly Revenue',
                data: [200345,90798.44,,],
                /**/backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
  }
  loadArray2(){
    fetch('http://localhost:7777/api/purchased-items/admin/tracksales')
        .then(response => response.json())
        .then(json => this.displayData2(json))
        .then(this.displayData2)    //pass data to displayData() OR print data to console
        .catch(err => console.log('Request Failed', err)); // Catch errors
}
displayData2(response: string | any[]){
  //var dataSection = document.getElementsByClassName('divChart');

  //alert(response.length)
  var namelist= [];
  var qtylist= [];
  let i =0;
   


  for(i=0;i<response.length;i++){
      let item = response[i].name;
      let item2 = response[i].sum;
      //let item = document.createElement("li");
      //item.innerHTML = response[i].name +" "+ response[i].sum;
      namelist.push(item);
      qtylist.push(item2);
      
  }
  const ctx = document.getElementById('myChart3');
  const myChart = new Chart("myChart3", {
  type: 'bar',
  data: {
      labels: namelist,
      datasets: [{
          label: 'Total Revenue per item',
          data: qtylist,
          /**/backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
});
  console.log(namelist);
  return namelist;
}

}
