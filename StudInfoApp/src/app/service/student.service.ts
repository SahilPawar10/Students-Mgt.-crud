import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Studentinfo } from '../studentinfo';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

   private baseUrl : string= 'http://localhost:9000';
  //  baseUrl ='http://localhost:9000';
    constructor( private http:HttpClient) {  }

   public getStudent(): Observable<any> {
    let dataUrl : string =`${this.baseUrl}/posts`;
    return this.http.get(dataUrl).pipe(catchError(this.handleError));
  }
  // getStudent(){
  //   return this.http.get<Studentinfo[]>(this.baseUrl+'posts');
  // }
public handleError(error:HttpErrorResponse){
  let errorMessage:string = '';
  if(error.error instanceof  ErrorEvent){
    errorMessage=`Error: ${error.error.message}`
  }
  else{
    errorMessage =`Status : ${error.status} \n Message : ${error.message}`;
  }
  return throwError(errorMessage);
}

  // postStudent(student:Studentinfo){
  //   return this.http.post<Studentinfo>(this.baseUrl,student);
  // }
    public postStudent(Student:Studentinfo): Observable<any>{
      let dataUrl : string =`${this.baseUrl}/posts`;
      return this.http.post<any>(dataUrl,Student).pipe(catchError(this.handleError));

    }


  // deletestudent(id:string){
  //   this.http.delete(this.baseUrl + '/'+ id);
  // }

  public deletestudent( id:string):Observable<{}>{
    let dataUrl : string =`${this.baseUrl}/posts/${id}`;
    return this.http.delete<{}>(dataUrl).pipe(catchError(this.handleError));
  }

}
