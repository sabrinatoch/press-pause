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
    const request: string = environment.context + " " + environment.jsonFormat;
    const payload = { query: "princess bride" }; // This is the prompt you want to send
  
    try {
      // Step 1: Call to Gemini AI to generate content
      const response = await this.ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: "*For now I have no test data, so given this prompt, please just generate RANDOM results for me to test. Thank you!" + request,
      });
  
      console.log('Gemini AI response:', response.text);
      let cleanedResponse = response.text || '';
      const jsonMatch = cleanedResponse.match(/```(?:json)?\s*([\s\S]*?)```/);
      
      if (jsonMatch && jsonMatch[1]) {
        cleanedResponse = jsonMatch[1].trim();
      }
  
      // Step 2: Parse the generated content
      const parsedData = JSON.parse(cleanedResponse);
      this.packages = Object.keys(parsedData).map(key => {
        return {
          name: key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          ...parsedData[key]
        };
      });
  
      // Step 3: Iterate through each package and each item (movie, book, etc.)
      for (let pkg of this.packages) {
        for (let key of ['movie', 'book', 'music', 'show', 'game', 'new', 'activity']) {
          if ((pkg as any)[key] && (pkg as any)[key].hasOwnProperty('title')) {
            const title = (pkg as any)[key].title;
            const query = `${title} ${key}`; // Construct the query: "Hitch movie", "Harry Potter book", etc.
            var queryWithPlus = query;
            
            if (query) {
              try {
                // Step 4: Manually replace spaces with '+' in the query before encoding
                queryWithPlus = query.replace(/ /g, '+'); // Replaces spaces with '+'
  
                // Step 5: Fetch the image from the image retrieval API
                const imageResponse = await firstValueFrom(this.http.get(`http://localhost:3000/api/image-retrieval/retrieve?id=${queryWithPlus}`));
                console.log(`Image response for ${queryWithPlus}:`, imageResponse);
  
                // Assuming the API returns an array and we need the first image
                const imageArray = imageResponse as any[];
  
                if (imageArray && imageArray.length > 0) {
                  // Step 6: Set the image_link to the first image URL
                  (pkg as any)[key].image_link = imageArray[0].urls?.regular || ''; // Adjust based on the actual API response format
                } else {
                  console.warn(`No image found for ${queryWithPlus}, skipping...`);
                }
              } catch (error) {
                // If image retrieval fails, just log the error and continue to the next item
                console.error(`Error retrieving image for ${queryWithPlus}:`, error);
              }
            }
          }
        }
      }
  
    } catch (error) {
      console.error('Error generating packages or retrieving images:', error);
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
  