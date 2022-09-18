import { AfterViewInit,Component,OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StudentService } from './service/student.service';
import { Studentinfo } from './studentinfo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  @ViewChild('fileinput') fileinput:any;
  @ViewChild('addStudentbutton') addStudentbutton:any;
  title = 'StudInfoApp';

  Studentform: FormGroup ;
  Student: Studentinfo[];
  StudentToDisplay:Studentinfo[];

  Religionption=[
    "Hindu",
    "muslim",
    "christian",
    "budhist",
    "Other"
  ];
  category=[
    "open",
    "OBC",
    "SC",
    "Maratha",
    "NT",
    "general",
    "Other"
  ];
  department=[
    "bca",
    "bsc",
    "SC",
    "horticulture",
    "commerse",
    "art",
    "english",
    "history"
  ];

  constructor( private fb:FormBuilder , private studentservice:StudentService){
    this.Studentform=this.fb.group({});
    this.Student=[];
    this.StudentToDisplay=this.Student;
  }
  ngOnInit(): void {
    this.Studentform=this.fb.group({
    firstname:this.fb.control(''),
    lastname:this.fb.control(''),
    birthday:this.fb.control('default'),
    gender:this.fb.control(''),
    religion:this.fb.control('default'),
    cast:this.fb.control('default'),
    mobile:this.fb.control(''),
    email:this.fb.control(''),
    department:this.fb.control('default'),
    fees:this.fb.control(''),
   });

          // .....subscribemethod.......
      this.studentservice.getStudent().subscribe( res =>
        {
          for(let Stud of res){
            this.Student.unshift(Stud);
          }
          this.StudentToDisplay=this.Student;
        // console.log(res);
      })
  }

  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
  }

// post data to server
  addstudent(){
    let Student : Studentinfo ={
      firstname: this.FirstName.value,
      lastname: this.LastName.value,
      birthday: this.Birthday.value,
      gender: this.Gender.value,
      relegion: this.Religionption[parseInt(this.Religion.value)],
      cast: this.category[parseInt(this.Cast.value)],
      mobile: this.Mobile.value,
      email: this.Email.value,
      department: this.department[parseInt(this.Department.value)],
      fees: this.Fees.value,
      profile:this.fileinput.nativeElement.files[0]?.name,
    }
    this.studentservice.postStudent(Student).subscribe({
       next:(res=>{
        this.Student.unshift(res);
        this.clearform();
        alert('Registered Succesfully....!');
      })
      
    });

  }

  removeStudent(event: any) {
    this.Student.forEach((val, index) => {
      if (val.id === parseInt(event)) {
        this.studentservice.deletestudent(event).subscribe({
          next:(res=>{
          //  alert('Deleted Succesfully....!');
            this.Student.splice(index, 1);
          })
        })
      }
    });
  }
// edit student

editStudent(event: any){
    this.Student.forEach((val,ind) => {
      if ( val.id === event){
        this.setform(val);
      }
    });
    this.removeStudent(event);
    this.addStudentbutton.nativeElement.click();
}
   
// search Student 

SerchStudent(event:any){
  let filterdstudent:Studentinfo[ ] = [];
  
  if(event === ''){
    this.StudentToDisplay=this.Student;
  }
  else{
    filterdstudent=this.Student.filter((val,index) => {
      let targetKey =val.firstname.toLowerCase()+''+val.lastname.toLowerCase();
      let searchKey=event.toLowerCase();
      return targetKey.includes(searchKey);
    });
    this.StudentToDisplay=filterdstudent;
  }
}
    setform(Stud:Studentinfo){

      this.FirstName.setValue(Stud.firstname);
      this.LastName.setValue(Stud.lastname);
      this.Birthday.setValue(Stud.birthday);
      this.Gender.setValue(Stud.gender);

        let religionindex = 0;
        this.Religionption.forEach((val,index) => {
          if(val===Stud.relegion) religionindex=index;
        });
      this.Religion.setValue(religionindex);

        let castindex = 0;
        this.category.forEach((val,index) => {
          if (val===Stud.cast) castindex=index;
        })
      this.Cast.setValue(castindex);
      this.Mobile.setValue(Stud.mobile);
      this.Email.setValue(Stud.email);
        let deptindex = 0 ;
        this.department.forEach((val,index) =>{
          if( val === Stud.department) deptindex =index ;
        })
      this.Department.setValue(deptindex);
      this.Fees.setValue(Stud.fees);
      this.fileinput.nativeElement.value = '';
      // this.fileinput.nativeElement(Stud.profile)
    }


  clearform(){
   
      this.FirstName.setValue('');
      this.LastName.setValue('');
      this.Birthday.setValue('');
      this.Gender.setValue('');
      this.Religion.setValue('');
      this.Cast.setValue('');
      this.Mobile.setValue('');
      this.Email.setValue('');
      this.Department.setValue('');
      this.Fees.setValue('');
      this.fileinput.nativeElement.value = '';
  }

  //  geteres and setors method
  public get FirstName(): FormControl{
      return this.Studentform.get('firstname') as FormControl;
    }
  public get LastName(): FormControl{
    return this.Studentform.get('lastname') as FormControl;
  }
  public get Birthday(): FormControl{
    return this.Studentform.get('birthday') as FormControl;
  }
  public get Gender(): FormControl{
    return this.Studentform.get('gender') as FormControl;
  }   
   public get Religion(): FormControl{
    return this.Studentform.get('religion') as FormControl;
  }
  public get Cast(): FormControl{
    return this.Studentform.get('cast') as FormControl;
  }
  public get Mobile(): FormControl{
    return this.Studentform.get('mobile') as FormControl;
  }
  public get Email(): FormControl{
    return this.Studentform.get('email') as FormControl;
  }
  public get Department(): FormControl{
    return this.Studentform.get('department') as FormControl;
  }   
  public get Fees(): FormControl{
    return this.Studentform.get('fees') as FormControl;
  }
}

