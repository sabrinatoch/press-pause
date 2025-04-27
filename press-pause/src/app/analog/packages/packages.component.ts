import { Component, NgModule } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { environment } from '../../../environments/environment';
import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';
import { LoadingComponent } from '../../loading/loading.component';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-packages',
  imports: [CommonModule, LoadingComponent],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css',
  standalone: true,
})
export class PackagesComponent {

  ai: GoogleGenAI;
  packages: Package[] = [];
  isLoading: boolean = false;

  constructor(private http: HttpClient) {
    // this.packages = [
    //   { name: 'Package 1', ...this.packageData['package-1'] },
    //   { name: 'Package 2', ...this.packageData['package-2'] },
    //   { name: 'Package 3', ...this.packageData['package-3'] },
    //   { name: 'Package 4', ...this.packageData['package-4'] }
    // ];

    this.ai = new GoogleGenAI({ 
      apiKey: environment.apiKey
    });
  }

  selectPackage(selectedPackage: any) {
    console.log('Selected package:', selectedPackage);
    // Navigate or display more info
  }

  async generatePackages() {
    this.isLoading = true;
    // context for the prompt
    const request: string = environment.context + " " + environment.jsonFormat;

    const payload = { query: "princess bride" };

try {
  const response = await firstValueFrom(this.http.post('http://localhost:3000/api/image-retrieval', payload, {
    headers: { 'Content-Type': 'application/json' }  // Explicitly set content type if needed
  }));
  console.log('Server response:', response);
} catch (error) {
  console.error('Error retrieving image:', error);
}



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
    let cleanedResponse = response.text || '';
    const jsonMatch = cleanedResponse.match(/```(?:json)?\s*([\s\S]*?)```/);
    
    if (jsonMatch && jsonMatch[1]) {
      cleanedResponse = jsonMatch[1].trim();
    }

    try {
      const parsedData = JSON.parse(cleanedResponse);
      this.packages = Object.keys(parsedData).map(key => {
        return {
          name: key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          ...parsedData[key]
        };
      });
    } catch (error) {
      console.error('Failed to parse the response:', error);
      console.log('Raw response:', cleanedResponse);
      this.packages = [];
    }
    
    this.isLoading = false;
  }
}


interface Package {
  name: string;
  movie: any;
  book: any;
  music: any;
  show: any;
  game: any;
  new: any;
  activity: any;
}


// async generateImage() {
//     try {
//       const response = await firstValueFrom(this.http.post('http://localhost:3000/api/image-retrieval', "princess bride"));
//       console.log('Server response:', response);
//     } catch (error) {
//       console.error('Error retrieving image:', error);
//     }
//   }
  