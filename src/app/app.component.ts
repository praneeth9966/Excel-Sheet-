import { Component, ViewChild, OnInit, ElementRef, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataServiceService } from './Services/data-service.service';
import { ExcelService } from './Services/excel-service/excel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'my-assignment';
  defaultActivity = ""
  defaultStoryMaturity = ""
  @ViewChild('sprintData') formSprintData: NgForm;
  @ViewChild('existUser') existUserData: ElementRef;
  @ViewChild('newdata') updatedData: NgForm;
  @Input() editable: boolean = false;
  butDisabled: boolean = true;
  public data: any = [];
  public mapped;
  public userStory;
  public userStory1;
  public newUser = true;
  public moreFields = false;
  public existDeatails: any = [];
  public updateDeatails: any = [];
  public responseKey: any = [];
  public excelDetails: any = [];
  public result = {};

  constructor(private dataService: DataServiceService, private excelService: ExcelService) { }

  ngOnInit() {
  }

  newUserDeatails() {
    this.newUser = true;
  }

  more() {
    this.moreFields = true;
  }

  less(){
    this.moreFields = false;
  }

  refresh(): void {
    window.location.reload();
  }

  onSubmit() {
    console.log(this.formSprintData);
    this.data = JSON.stringify(this.formSprintData.value);
    this.dataService.postData(this.data)
      .subscribe(
        (response) => {
          console.log(response)
          this.responseKey.push(response)
          console.log(this.responseKey);
        },
        (error) => console.log(error)
      );
  }

  update() {
    console.log(this.updatedData['value']['Story Maturity']);
    this.dataService.getData().subscribe(
      (response) => {
        console.log(response);
        this.mapped = Object.keys(response).map(key => ({ type: key, value: response[key] }))
        console.log(this.mapped);
        for (var i = 0; i < this.mapped.length; i++) {
          this.userStory1 = this.mapped[i]['value']['User Story'];
          console.log(this.userStory1);
          if (this.existUserData.nativeElement.value === this.userStory1) {
            console.log(this.updatedData);
            console.log(this.mapped[i]['value']['Story Maturity']);
            this.updateDeatails = JSON.stringify(this.updatedData.value);
            console.log(this.updateDeatails);
            this.mapped[i]['value']['Story Status'] = this.updatedData['value']['Story Status']
            this.mapped[i]['value']['Activity Status'] = this.updatedData['value']['Activity Status']
            this.mapped[i]['value']['Date'] = this.updatedData['value']['Date']
            this.mapped[i]['value']['Consumed SP'] = this.updatedData['value']['Consumed SP']
            this.mapped[i]['value']['Activity Start Date'] = this.updatedData['value']['Activity Start Date']
            this.mapped[i]['value']['Activity End Date'] = this.updatedData['value']['Activity End Date']
            this.mapped[i]['value']['Resource'] = this.updatedData['value']['Resource']
            this.mapped[i]['value']['Reason of Variance'] = this.updatedData['value']['Reason of Variance']
            this.mapped[i]['value']['Corrective Measures'] = this.updatedData['value']['Corrective Measures']
            this.mapped[i]['value']['Risk If Any'] = this.updatedData['value']['Risk If Any']
            console.log(this.mapped);
            for (var i = 0; i < this.mapped.length; i++) {
              this.result[this.mapped[i].type] = this.mapped[i].value;
            }
            console.log(this.result);
            this.dataService.updateData(this.result)
              .subscribe(
                (response) => console.log(response),
                (error) => console.log(error)
              );
            this.newUser = false;
            break;
          }
        }
      }
    )
  }

  existingUserDeatails() {
    console.log(this.existUserData.nativeElement.value);
    this.dataService.getData().subscribe(
      (response) => {
        console.log(response);
        this.mapped = Object.keys(response).map(key => ({ type: key, value: response[key] }))
        console.log(this.mapped);
        this.existDeatails = [];
        for (var i = this.mapped.length - 1; i >= 0; i--) {
          this.userStory1 = this.mapped[i]['value']['User Story'];
          console.log(this.userStory1);
          if (this.existUserData.nativeElement.value === this.userStory1) {
            this.newUser = false;
            this.userStory = this.userStory1;
            this.existDeatails.push(this.mapped[i]);
            console.log(this.existDeatails);
            break;
          }
        }
        if (this.existDeatails.length == 0) {
          alert("Please enter Valid User Story");
        }
      }
    )
  }

  exportAsXLSX() {
    for (var i = 0; i < this.mapped.length; i++) {
      this.excelDetails.push(this.mapped[i]['value'])
      console.log(this.excelDetails);
    }
    this.excelService.exportAsExcelFile(this.excelDetails, 'sample');
  }

}