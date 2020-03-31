import { Component, OnInit } from '@angular/core';
import { PredictionService } from 'src/app/Services/prediction.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiResult } from 'src/app/models/DTO/ApiResult';

@Component({
  selector: 'app-text-sim',
  templateUrl: './text-sim.component.html',
  styleUrls: ['./text-sim.component.css'],
  providers: [PredictionService]
})
export class TextSimComponent implements OnInit {
  Title: string = 'Text Similarity';
  MLRequestForm: FormGroup;
  errorMessage: boolean;
  text1: string;
  text2: string;

  constructor(
    private predictionService: PredictionService,
  ) { 
    this.MLRequestForm = new FormGroup({
      'text1': new FormControl(this.text1, [Validators.required]),
      'text2': new FormControl(this.text2, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  onMLRequest() {
    console.log("Sending request")
    if (!this.MLRequestForm.value.text1 || !this.MLRequestForm.value.text2) {
      this.errorMessage = true;
      return
    }
    console.log("passed validation")
    this.predictionService.textSimilarity(this.MLRequestForm.value.text1, this.MLRequestForm.value.text2).subscribe(
      (res: ApiResult) => {
        console.log(ApiResult);
      }
    );
  }

  resetFields(event) {
    event.preventDefault();
    this.MLRequestForm.reset();
  }
}
