import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  formLogin! : FormGroup;

  constructor(private formBuilder : FormBuilder,private router : Router) {

  }
  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      username : this.formBuilder.control(""),
      password : this.formBuilder.control("")
    });


  }

  handleLogin() {
    console.log(this.formLogin.value);
    if(this.formLogin.value.username == "admin" &&
       this.formLogin.value.password == "1234"){
       this.router.navigateByUrl("/admin")
    }
  }
}
