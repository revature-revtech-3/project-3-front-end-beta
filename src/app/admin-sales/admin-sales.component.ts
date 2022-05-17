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
    name: string[] = [];
    sum: number[] = [];
    productdata: Productdata[] = []
    errorMsg: string = "";

  constructor(private activatedRoute: ActivatedRoute,
    private AdminSalesService: AdminSalesService){}
 
  ngOnInit(): void {
    this.loadArrays();
    this.loadCharts();
  }

  loadCharts() {
    const ctx = document.getElementById('myChart');
    const myChart = new Chart("myChart", {
        type: 'bar',
        data: {
            labels: ['Xbox One', 'Macbook Pro', 'Dell Inspiron', 'Kodak Compact Digital Camera',
             'Leica Vintage Digital Camera', 'Bose QuietComfort 35 II Headphones','65" Samsung 4K UHD Smart TV',
             '55" Samsung 4K UHD Curved TV','iMac Desktop/Monitor','Dell OLED Monitor','Sony Pro Digital Camera',
             'Nikon DSLR D5100 Camera','Cannon DSLR Camera','Generic Gaming Laptop','Xbox One Controller','AirPod Pro'
             ,'Beats Wireless Studio Headphones','iPhone 13 Pro'],
            datasets: [{
                label: '# of Product sold',
                data: [12, 19, 3, 5, 2, 3,6,7,9,2,4,14,23,33,32,55,16,1],
                backgroundColor: [
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
    const ctx2 = document.getElementById('myChart2');
    const myChart2 = new Chart("myChart2", {
        type: 'pie',
        data: {
            labels: ['Xbox One', 'Macbook Pro', 'Dell Inspiron', 'Kodak Compact Digital Camera',
             'Leica Vintage Digital Camera', 'Bose QuietComfort 35 II Headphones','65" Samsung 4K UHD Smart TV',
             '55" Samsung 4K UHD Curved TV','iMac Desktop/Monitor','Dell OLED Monitor','Sony Pro Digital Camera',
             'Nikon DSLR D5100 Camera','Cannon DSLR Camera','Generic Gaming Laptop','Xbox One Controller','AirPod Pro'
             ,'Beats Wireless Studio Headphones','iPhone 13 Pro'],
            datasets: [{
                label: 'Total Revenue',
                data: [20000, 1900, 3, 5, 2, 3,6,7,9,2,4,14,23,33,32,55,16,1],
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
  loadArrays(){
    this.AdminSalesService.PurchasedItemsQty().subscribe((response) => {
        console.log("hello")
        this.productdata = response;
        console.log(this.productdata)
        console.log("hello but agaon")
      }, error => {
        this.errorMsg = 'There was some internal error! Please try again later!';
      });
      

    }

}
