import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

import { UsersPage } from '../pages/users/users';
import { ReposPage } from '../pages/repos/repos';
import { OrganizationsPage } from '../pages/organizations/organizations';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
}
