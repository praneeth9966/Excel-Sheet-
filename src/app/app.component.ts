import { Component, ViewChild, OnInit, ElementRef, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataServiceService } from './Services/data-service.service';
// import {MatSnackBar} from '@angular/material';
import { ExcelService } from './Services/excel-service/excel.service';
import { DatePipe } from '@angular/common';

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
  public existDeatails1: any = [];
  public updateExistDeatails: any = [];
  public updateDeatails: any = [];
  public responseKey: any = [];
  public excelDetails: any = [];
  public result = {};
  public hide = false;
  public exportData;
  public exportNewData: any = [];
  public myDate=new Date();
    public today='';
  constructor(private dataService: DataServiceService,
    private excelService: ExcelService,private datePipe: DatePipe) {
      this.today = this.datePipe.transform(this.myDate, 'MM-dd-yyyy');
      console.log( this.today);
      
     }

  ngOnInit() {
    // var myDate = new Date();
    // this.today = new Date();
    // console.log( this.today);
  }

  newUserDeatails() {
    this.newUser = true;
  }

  more() {
    this.moreFields = true;
    this.hide = true;
  }

  less() {
    this.moreFields = false;
    this.hide = false;
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
          // this.snackBar.open("Data", "Submitted", {
          //   duration: 1000
          // })
        },
        (error) => console.log(error)
      );
  }

  update(type) {
    console.log(type);
    console.log(this.updatedData['value']['Story Maturity']);
    this.dataService.getData().subscribe(
      (response) => {
        console.log(response);
        this.mapped = Object.keys(response).map(key => ({ type: key, value: response[key] }))
        console.log(this.mapped);

        for (var i = this.mapped.length - 1; i >= 0; i--) {
          this.userStory1 = this.mapped[i]['value']['User Story'];
          console.log(this.userStory1);
          if (this.existUserData.nativeElement.value === this.userStory1) {
            this.newUser = false;
            this.userStory = this.userStory1;
            this.updateExistDeatails.push(this.mapped[i]);
          }
        }
        console.log(this.updateExistDeatails);

        for (var j = 0; j < this.mapped.length; j++) {

          console.log(this.mapped[j]['type']);
          if (type === this.mapped[j]['type']) {
            console.log(this.updatedData);
            this.mapped[j]['value']['Story Status'] = this.updatedData['value']['Story Status']
            this.mapped[j]['value']['Activity Status'] = this.updatedData['value']['Activity Status']
            this.mapped[j]['value']['Date'] = this.updatedData['value']['Date']
            this.mapped[j]['value']['Consumed SP'] = this.updatedData['value']['Consumed SP']
            this.mapped[j]['value']['Activity Start Date'] = this.updatedData['value']['Activity Start Date']
            this.mapped[j]['value']['Activity End Date'] = this.updatedData['value']['Activity End Date']
            this.mapped[j]['value']['Resource'] = this.updatedData['value']['Resource']
            this.mapped[j]['value']['Reason of Variance'] = this.updatedData['value']['Reason of Variance']
            this.mapped[j]['value']['Corrective Measures'] = this.updatedData['value']['Corrective Measures']
            this.mapped[j]['value']['Risk If Any'] = this.updatedData['value']['Risk If Any']
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
          }
        }
      }
    )
  }

  // update() {
  //   console.log(this.updatedData['value']['Story Maturity']);
  //   this.dataService.getData().subscribe(
  //     (response) => {
  //       console.log(response);
  //       this.mapped = Object.keys(response).map(key => ({ type: key, value: response[key] }))
  //       console.log(this.mapped);
  //       for (var i = 0; i < this.mapped.length; i++) {
  //         this.userStory1 = this.mapped[i]['value']['User Story'];
  //         console.log(this.userStory1);
  //         if (this.existUserData.nativeElement.value === this.userStory1) {
  //           console.log(this.updatedData);
  //           console.log(this.mapped[i]['value']['Story Maturity']);
  //           this.updateDeatails = JSON.stringify(this.updatedData.value);
  //           console.log(this.updateDeatails);
  //           this.mapped[i]['value']['Story Status'] = this.updatedData['value']['Story Status']
  //           this.mapped[i]['value']['Activity Status'] = this.updatedData['value']['Activity Status']
  //           this.mapped[i]['value']['Date'] = this.updatedData['value']['Date']
  //           this.mapped[i]['value']['Consumed SP'] = this.updatedData['value']['Consumed SP']
  //           this.mapped[i]['value']['Activity Start Date'] = this.updatedData['value']['Activity Start Date']
  //           this.mapped[i]['value']['Activity End Date'] = this.updatedData['value']['Activity End Date']
  //           this.mapped[i]['value']['Resource'] = this.updatedData['value']['Resource']
  //           this.mapped[i]['value']['Reason of Variance'] = this.updatedData['value']['Reason of Variance']
  //           this.mapped[i]['value']['Corrective Measures'] = this.updatedData['value']['Corrective Measures']
  //           this.mapped[i]['value']['Risk If Any'] = this.updatedData['value']['Risk If Any']
  //           console.log(this.mapped);
  //           for (var i = 0; i < this.mapped.length; i++) {
  //             this.result[this.mapped[i].type] = this.mapped[i].value;
  //           }
  //           console.log(this.result);
  //           this.dataService.updateData(this.result)
  //             .subscribe(
  //               (response) => console.log(response),
  //               (error) => console.log(error)
  //             );
  //           this.newUser = false;
  //           break;
  //         }
  //       }
  //     }
  //   )
  // }

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
            // break;
          }
        }
        this.existDeatails1.push(this.existDeatails[0]);
        console.log(this.existDeatails1);

        if (this.existDeatails.length == 0) {
          alert("Please enter Valid User Story");
        }

      }
    )
  }

  exportAsXLSX() {
    console.log(this.mapped);
    console.log(this.mapped[0]['value']['Start Date']);
    for (var i = 0; i < this.mapped.length; i++) {
      this.exportData = {
        StartDate: this.mapped[i]['value']['Start Date'],
        EndDate: this.mapped[i]['value']['End Date'],
        PlannedBandwidth: this.mapped[i]['value']['Planned Bandwitdh'],
        ActualBandwidth: this.mapped[i]['value']['Actual Bandwitdh'],
        UserStory: this.mapped[i]['value']['User Story'],
        StoryType: this.mapped[i]['value']['Story Type'],
        StoryStatus: this.mapped[i]['value']['Story Status'],
        Activity: this.mapped[i]['value']['activity'],
        ActivityStatus: this.mapped[i]['value']['Activity Status'],
        Date: this.mapped[i]['value']['Date'],
        PlannedStoryPoint: this.mapped[i]['value']['Planned Story Point'],
        ActualStoryPoint: this.mapped[i]['value']['Actual Story Point'],
        ConsumedSP: this.mapped[i]['value']['Consumed SP'],
        Variance: this.mapped[i]['value']['variance'],
        StoryMaturity: this.mapped[i]['value']['Story Maturity'],
        ActivityStartDate: this.mapped[i]['value']['Activity Start Date'],
        ActivityEndDate: this.mapped[i]['value']['Activity End Date'],
        Resource: this.mapped[i]['value']['Resource'],
        PercentageComletion: this.mapped[i]['value']['Percentage Completion'],
        AccountableHour: this.mapped[i]['value']['Accountable Hour'],
        ReasonOfVariance: this.mapped[i]['value']['Reason of Variance'],
        CorrectiveMeasures: this.mapped[i]['value']['Corrective Measures'],
        RiskIfAny: this.mapped[i]['value']['Risk If Any'],
      }
      this.excelDetails.push(this.exportData)
    }
    console.log(this.excelDetails);
    this.excelService.exportAsExcelFile(this.excelDetails, 'sample');
  }

}