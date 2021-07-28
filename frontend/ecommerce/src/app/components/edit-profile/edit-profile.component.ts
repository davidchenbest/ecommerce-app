import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  id!: any;
  user!: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    try {
      this.id = this.route.snapshot.paramMap.get('id');
      console.log(this.id);
      this.userService.profile().subscribe((res) => {
        if (res) {
          this.user = res;
          this.addProperties(this.user);
          console.log(this.user);
        }
      });
    } catch (error) {
      this.router.navigate(['/login']);
    }
  }

  save() {
    this.userService.editProfile(this.user).subscribe((res) => {
      if (res) this.router.navigate(['/profile']);
      else alert(res);
    });
  }

  addProperties(user: any) {
    const properties = [
      {
        name: 'address',
        props: { streetAddress: '', city: '', state: '', zip: '' },
      },
    ];
    properties.forEach((p) => (!user[p.name] ? (user[p.name] = {}) : null));
  }
}