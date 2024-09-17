import {Component, WritableSignal} from '@angular/core';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AppService} from "../../app.service";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        FontAwesomeModule,
        RouterLink,
        RouterLinkActive,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    faGithub = faGithub;
    currentTemperature: WritableSignal<string>;

    constructor(public appService: AppService) {
        this.currentTemperature = appService.currentTemperature;
    }
}
