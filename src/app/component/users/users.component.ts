import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/interfaces/response.interface';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  response:Response;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers(15).subscribe((data)=>{
      console.log(data );
      this.response=data
    })
  }

}
