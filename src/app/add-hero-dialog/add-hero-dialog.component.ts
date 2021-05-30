import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HeroService } from '../hero.service';
import { Heroes } from '../heroes';
import { NotifierService } from '../notifier.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-hero-dialog',
  templateUrl: './add-hero-dialog.component.html',
  styleUrls: ['./add-hero-dialog.component.css']
})
export class AddHeroDialogComponent implements OnInit {
  hero!:Heroes;
  dialogForm={
    name:"",
    description:"",
  };
  closeDialog:boolean=false;
  imageData!:string;
  registerForm!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder, 
              private heroService: HeroService,
              public dialogRef: MatDialogRef<AddHeroDialogComponent>,
              private notifierService:NotifierService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'name': [null,[Validators.required]],
      'description': [this.dialogForm.description,[Validators.required,Validators.minLength(20),
        Validators.maxLength(100)]],
      'image':[null,[Validators.required]],
    });
  }

  onFileSelect(event:Event){
    this.closeDialog=false;
    const target= event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    const allowedMimeTypes=['image/png', 'image/jpg', 'image/jpeg'];
    this.registerForm.patchValue({image: file});
    if(file && allowedMimeTypes.includes(file.type)){
      const reader=new FileReader();
      reader.onload=()=>{
        this.imageData=reader.result as string;
      }
      reader.readAsDataURL(file);
    }

    
  }

  onSubmit(){
    if(this.registerForm.value.image === null){
    this.closeDialog=true;  
  }else{
    this.heroService.addHero(this.dialogForm.name, this.dialogForm.description, this.registerForm.value.image).subscribe(
      res=>{
      this.dialogRef.close(res);  
      this.notifierService.showNotification("Hero Added Successfully","OK",'success')
      },
      error=>{
        if(error instanceof HttpErrorResponse){
          
            this.notifierService.showNotification(error.message,"OK",'error')
          
        }
      });
    this.registerForm.reset();
    this.imageData = '';
    }
  }
  

}
