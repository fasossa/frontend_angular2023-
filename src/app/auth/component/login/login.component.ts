import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms"
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('',  [Validators.required, Validators.email]), //Validators.required es para que el atributo sea obligatorio
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService:AuthService, private router: Router){ }

  ngOnInit(): void{

  }
  login(){
    this.authService.ingresarLogin(this.loginForm.value).subscribe(
      (res: any) => {
        console.log(res)
        localStorage.setItem('acces_token', res.acces_token)  
        this.router.navigate(["/admin/perfil"])  
      },
      (error: any) => {
        console.log(error)
        alert("password incorrecto")
      }
    )
  }

}
