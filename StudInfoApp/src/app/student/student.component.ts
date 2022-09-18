7import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, Output,OnInit } from '@angular/core';
import { Studentinfo } from '../studentinfo';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  @Input() student:Studentinfo;
  @Output() onRemoveStudent=new EventEmitter<number>();
  @Output()onEditStudent =new EventEmitter<number>();

  constructor() {
    this.student= {
      firstname: '',
      lastname:'',
      birthday:'',
      gender:'',
      relegion:'',
      cast:'',
      mobile:0,
      email:'',
      department:'',
      fees:'',
      profile:'',
    }
  }

  ngOnInit(): void {
    console.log(this.student);
  }
    deleteStudent(){
      this.onRemoveStudent.emit(this.student.id);
    }
    editStudentClicked(){
      this.onEditStudent.emit(this.student.id);
    }
}
