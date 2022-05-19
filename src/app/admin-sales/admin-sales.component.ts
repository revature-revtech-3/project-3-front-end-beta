import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-admin-sales',
  templateUrl: './admin-sales.component.html',
  styleUrls: ['./admin-sales.component.scss']
})
export class AdminSalesComponent implements OnInit {
    name: string = "";
    sum: number = 0;
    productdata: Productdata2[] = [];
    errorMsg: string = "";

  constructor(private activatedRoute: ActivatedRoute,
    private adminSalesService: AdminSalesService){}
 
  ngOnInit(): void {
    this.loadArrays();
    const ctx3 = document.getElementById('myChart');
    const myChart3 = new Chart("myChart", {
      
        type: 'line',
        data: {
            labels: ["05","06","09","10","11","13","14","15","16","17","18","19"],
            datasets: [{
                label: 'Total May Revenue',
                data: [1699.98,
                  12349.78,
                  2549.91,
                  1199.96,
                  1349.96,
                  10399.87,
                  199.99,
                  7149.88,
                  15699.71,
                  7149.86,
                  31049.54,
                  2449.96],
               /* backgroundColor: [
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
                ],*/
                borderWidth: 3,
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)'

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

    loadArrays(){
            fetch('http://localhost:7777/api/purchased-items/admin/trackpurchase')
                .then(response => response.json())
                .then(json => this.displayData(json))
                .then(this.displayData)    //pass data to displayData() OR print data to console
                .catch(err => console.log('Request Failed', err)); // Catch errors
    }
   
    displayData(response: string | any[]){
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
        const ctx2 = document.getElementById('myChart2');
        const myChart2 = new Chart("myChart2", {
        type: 'bar',
        data: {
            labels: namelist,
            datasets: [{
                label: 'Total Revenue',
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
