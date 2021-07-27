import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/User';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any;
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getUsers().subscribe((res) => {
      console.log(res);
      this.users = res;
    });
  }
}