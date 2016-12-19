import { Component } from '@angular/core';
import { LoadingController, NavController, Refresher } from 'ionic-angular';

import { User } from '../../models/user';
import { GithubUsers } from '../../providers/github-users';
import { UserDetailsPage } from '../user-details/user-details';

/*
  Generated class for the Users page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {
  users: User[];
  originalUsers: User[];
  lastLoadedId: number;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              private githubUsers: GithubUsers) {

    this.fetchContent();
  }

  fetchContent(): void {
    let loading = this.loadingCtrl.create({
      content: 'Loading users...'
    });

    loading.present();

    this.githubUsers.load().subscribe(users => {
      this.users = users;
      this.originalUsers = users;

      this.lastLoadedId = this.users[this.users.length-1].id;

      loading.dismiss();
    });
  }

  doInfinite(infiniteScroll) {
    let paramsUrl = this.lastLoadedId.toString();

    this.githubUsers.load().subscribe(users => {
      this.users = users;
      this.originalUsers = users;

      this.lastLoadedId = this.users[this.users.length-1].id;

      infiniteScroll.complete();
    });
  }

  goToDetails(login: string): void {
    this.navCtrl.push(UserDetailsPage, { login });
  }

  search(searchEvent): void {
    let term = searchEvent.target.value
    // We will only perform the search if we have 3 or more characters
    if (term.trim() === '' || term.trim().length < 3) {
      // Load cached users
      this.users = this.originalUsers;
    } else {
      // Get the searched users from github
      this.githubUsers.searchUsers(term).subscribe(users => {
        this.users = users
      });
    }
  }
}
