import { Component, NgModule } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-packages',
  imports: [],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css',
  standalone: true,
})
export class PackagesComponent {

  ai: GoogleGenAI;
  packages: string[] = [];

  constructor() {
    this.ai = new GoogleGenAI({ 
      apiKey: environment.apiKey
    });
  }

  async generatePackages() {

    // context for the prompt
    const request: string = environment.context + " " + environment.jsonFormat;

    // grab user data from mongo
    const userData: string = "";

    // grab packages associated with user (match user id) in mongo
    const packageData: string = "";

    // api call
    const response = await this.ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "*For now I have no test data, so given this prompt, please just generate RANDOM results for me to test. Thank you!" + request,
    });
    console.log(response.text);
  }

}
