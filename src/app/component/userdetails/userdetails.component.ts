import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as Leaflet from 'leaflet';
import { Coordinate } from 'src/app/interfaces/coordinate.interface';
import { Response } from 'src/app/interfaces/response.interface';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  user: User;
  response:Response;
  mode: 'edit' | 'locked' = 'locked';
  buttonText: 'Save Changes' | 'Edit' = 'Edit';
  marker = new Leaflet.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconSize: [32, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41]
  })

  constructor(private activatedRoute: ActivatedRoute, private userService:UserService)
  { }


  ngOnInit(): void {
    // this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
    //   this.userService.getUser(params.get('uuid')!).subscribe((data) => {
    //     console.log(data);
    //     this.response=data
    //   })
    // })
    this.user = (<User>(this.activatedRoute.snapshot.data['resolvedResponse'].results[0]));
    console.log(this.user);
    this.loadMap(this.user.coordinate);

  }
  changeMode(mode: 'edit' | 'locked'): void {
    console.log(mode);
    this.mode = this.mode == 'locked' ? 'edit' : 'locked'
    this.buttonText = this.buttonText == 'Edit' ? 'Save Changes' : 'Edit'
  }

  private loadMap(coordinate: Coordinate): void{
    const map = Leaflet.map('map', {
      center: [coordinate.latitude, coordinate.longitude],
      zoom: 8
    })
    const layer = Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 1,
      maxZoom: 30,
      crossOrigin: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
    layer.addTo(map);
    const marker = Leaflet.marker([coordinate.latitude, coordinate.longitude],
      {icon: this.marker});
    marker.addTo(map).bindPopup(`${this.user.firstName}'s Location`).openPopup();
  }
}
