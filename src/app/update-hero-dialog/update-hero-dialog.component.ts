import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { NotifierService } from '../notifier.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-hero-dialog',
  templateUrl: './update-hero-dialog.component.html',
  styleUrls: ['./update-hero-dialog.component.css']
})
export class UpdateHeroDialogComponent implements OnInit {
  dialogForm={
    _id:'',
    name:"",
    description:"",
  };
  imageData:string="";
  updateForm!: FormGroup;

  closeDialog:boolean=false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private heroService: HeroService, 
              public dialogRef: MatDialogRef<UpdateHeroDialogComponent>,
              private location: Location,
              private notifierService:NotifierService
  ) { }

  ngOnInit(): void {
    this.dialogForm._id=this.data._id;
    this.dialogForm.name=this.data.name;
    this.dialogForm.description=this.data.description
    this.imageData=this.data.imagePath;
    this.updateForm = this.formBuilder.group({
      'name': [this.dialogForm.name,[Validators.required]],
      'description': [this.dialogForm.description,[Validators.required,Validators.minLength(15),
        Validators.maxLength(100)]],
      'image':[null]
    });
  }

  onFileSelect(event:Event){
    this.closeDialog=false;
    const target= event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    const allowedMimeTypes=['image/png', 'image/jpg', 'image/jpeg'];
    this.updateForm.patchValue({image: file});
    if(file && allowedMimeTypes.includes(file.type)){
      const reader=new FileReader();
      reader.onload=()=>{
        this.imageData=reader.result as string;
      }
      reader.readAsDataURL(file);
    }

    
  }

  goBack():void{
    this.location.back();
  }
  async onSubmit(){
    console.log(this.dialogForm);
    
    if (this.updateForm.value.image=== null) {
      await this.heroService.updateHeroWithoutImage(this.dialogForm._id,this.updateForm.value.name, this.updateForm.value.description).subscribe(
        async res=>{
          console.log("Updating",res);
          await this.notifierService.showNotification('Successfully Updated','OK','success')
          await this.dialogRef.close(res);
        
        // this.goBack();
      },
      error=>{
        if(error instanceof HttpErrorResponse){
          
          this.notifierService.showNotification(error.message,"OK",'error')
        }
      });
      // this.updateForm.reset();
      // this.imageData = '';
     
    } else {

     await this.heroService.updateHero(this.dialogForm._id,this.updateForm.value.name, this.updateForm.value.description, this.updateForm.value.image).subscribe(
       res=>{
        this.dialogRef.close(res);
        this.notifierService.showNotification('Successfully Updated','OK','success')
        // this.goBack();
      },
      error=>{
        if(error instanceof HttpErrorResponse){
          
          this.notifierService.showNotification(error.message,"OK",'error')
        }
      });
      // this.updateForm.reset();
      // this.imageData = '';
      
    }
    
  }

}
