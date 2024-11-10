import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {



  constructor(private ds: DataService, private router: Router, private fb: FormBuilder) {

  }
  //FormBuilder class is injected
  //the group is Declared with the form name'registerForm' and array is created and intialized as empty array....now to get the control to store the uname,acno& psw data
  //the connection will be done in HTML file
  registerForm = this.fb.group({
    uname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9]+')]]
  })

  register() {
    var uname = this.registerForm.value.uname
    var acno = this.registerForm.value.acno
    var psw = this.registerForm.value.psw

    


    if (this.registerForm.valid) {
      const result = this.ds.register(acno, uname, psw).subscribe((result: any) => {
        alert(result.message)
        this.router.navigateByUrl('')
      },
      result=>{
        alert(result.error.message)
        this.router.navigateByUrl('') 
      })

    //  
    // if (result) {
    //     alert('registeration success')
    //     this.router.navigateByUrl('')
    //   } else {
    //     alert('User already exists')
    //     this.router.navigateByUrl('')
    //   } 
    // } else {
    //   alert('Invalid form')
    }
    else {
      alert("Invalid form")
    }
  }
}
