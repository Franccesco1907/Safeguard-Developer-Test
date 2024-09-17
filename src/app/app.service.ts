import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AppService {
    currentTemperature = signal('Loading...');
    private weatherApiKey = environment.weatherApiKey;
    private updateInterval = 30;

    constructor(private httpClient: HttpClient) {
        this.getLocationAndTemperature();
        this.updateTemperature(this.updateInterval);
    }

    private getLocationAndTemperature() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                this.getTemperature(latitude, longitude);
            });
        } else {
            this.currentTemperature.set('Geolocation is not supported by this browser.');
        }
    }

    private getTemperature(latitude: number, longitude: number) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.weatherApiKey}&units=metric`;
        this.httpClient.get(url).subscribe({
            next: (response: any) => {
                this.currentTemperature.set(`${Math.round(response.main.temp)}º`);
            },
            error: (error) => {
                console.log('Error fetching temperature', error);
                this.currentTemperature.set('Error fetching temperature');
            }
        });
    }

    private updateTemperature(seconds: number) {
        setInterval(() => {
            this.getLocationAndTemperature();
        }, seconds * 1000);
    }
}
