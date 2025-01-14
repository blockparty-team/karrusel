import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { environment } from '@env/environment'
import { RouteName } from '@app/shared/models/routeName';

interface NavigationItem {
  name: string,
  icon: string,
  routeName: RouteName
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.page.html',
  styleUrls: ['./sidebar.page.scss'],
})
export class SidebarPage implements OnInit {

  showLogin: boolean = environment.featureToggle.enableLogin;

  authenticated$: Observable<boolean>;

  navigationItems: NavigationItem[] = [
    {
      name: 'Tickets',
      icon: 'ticket-outline',
      routeName: RouteName.Tickets
    },
    // {
    //   name: 'Events',
    //   icon: 'musical-notes-outline',
    //   routeName: RouteName.Event
    // },
    // {
    //   name: 'Playlists',
    //   icon: 'play-outline',
    //   routeName: RouteName.Playlists
    // },
    // {
    //   name: 'Sponsors & Partners',
    //   icon: 'rocket-outline',
    //   routeName: RouteName.Partners
    // },
    // {
    //   name: 'Merch',
    //   icon: 'cash-outline',
    //   routeName: RouteName.Merch
    // },
    // {
    //   name: 'Transport - book a Viggo',
    //   icon: 'car-outline',
    //   routeName: RouteName.Transport
    // },
    // {
    //   name: 'Gadearmbånd - support us!',
    //   icon: 'thumbs-up-outline',
    //   routeName: RouteName.Gadearmbaand
    // },
    {
      name: 'About',
      icon: 'information-circle-outline',
      routeName: RouteName.About
    },
    {
      name: 'Settings',
      icon: 'settings-outline',
      routeName: RouteName.Settings,
    },
    {
      name: 'Search',
      icon: 'search-outline',
      routeName: RouteName.Search
    },
    {
      name: 'Profile',
      icon: 'person-circle-outline',
      routeName: RouteName.Profile
    },
    // Hide profile menu item when login is disabled
  ].filter(navItem => !environment.featureToggle.enableLogin
    && navItem.routeName === RouteName.Profile
    ? false
    : true
  ).filter(navItem => environment.production 
    && navItem.routeName === RouteName.Settings 
    ? false 
    : true
  ) // Show settings menu item when not in production

  constructor(
    private authService: AuthService,
    private router: Router,
    private menu: MenuController
  ) { }

  ngOnInit() {
    this.authenticated$ = this.authService.authenticated$
  }

  onGoTo(route: RouteName): void {
    this.menu.close();
    this.router.navigate([route]);
  }

  onCloseSideBar(): void {
    this.menu.close();
  }

  signInOrOut() {
    this.authService.authenticated$.pipe(
      first(),
      tap(authenticated => {
        if (authenticated) {
          this.authService.logOut();
        } else {
          this.router.navigate([RouteName.Login])
        }
      })
    ).subscribe()
  }

}
