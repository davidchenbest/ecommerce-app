import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.profile().subscribe((res) => {
      console.log(res);
      this.user = res;
    });
  }
}
