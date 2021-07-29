import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  user!: any;
  role: string = '';
  constructor(
    private router: Router,
    private adminService: AdminService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    try {
      const id = this.route.snapshot.paramMap.get('id');
      if (!id) throw 'no user id given';
      this.adminService.getUser(id).subscribe((res) => {
        if (res) {
          this.user = res;
          this.addProperties(this.user);
        }
      });
    } catch (error) {
      this.router.navigate(['/login']);
    }
  }

  save() {
    this.user.role ? (this.user.role = 'admin') : null;
    this.adminService.editUser(this.user).subscribe((res) => {
      if (res.error) alert(JSON.stringify(res.error));
      else this.router.navigate(['/users']);
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
