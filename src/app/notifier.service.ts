import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from './notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackBar:MatSnackBar) { }

  showNotification(message:string,buttonText:string,messageType:'error' | 'success'){
    this.snackBar.openFromComponent(NotificationComponent ,{
      data:{
        message,
        buttonText,
        type:messageType 
      },
      duration:5000,
      horizontalPosition:"center",
      verticalPosition:'bottom',
      // panelClass:messageType
    })
  }
}
