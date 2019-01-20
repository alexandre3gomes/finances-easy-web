import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../router.animations';
import { LoginService } from '../shared/services/login.service';
import { User } from '../shared/model/user.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  username = new FormControl();
  password = new FormControl();

  constructor(
    private translate: TranslateService,
    public router: Router,
    public loginServ: LoginService
  ) {
    this.translate.addLangs([
      'en',
      'fr',
      'ur',
      'es',
      'it',
      'fa',
      'de',
      'zh-CHS'
    ]);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(
      browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en'
    );
    this.loginServ = loginServ;
  }

  ngOnInit() {}

  onLoggedin() {
    localStorage.setItem('isLoggedin', 'true');
  }

  login() {
    const user = new User(-1, '', this.username.value, this.password.value);
    this.loginServ.logon(user);
  }
}
