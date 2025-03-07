import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../../model';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private http: HttpClient) {}

  public getUserInfo(uuid: string) {
    //TODO change this to get user data from the backend
    const user = {
      uuid: 'XXX',
      name: 'John Doe',
      email: 'john.doe@example.com',
      assignments: ['468879bf-8e44-4c95-8321-edd2b8fb0108'],
      birthday: '',
    };

    return new Promise((resolve) => {
      resolve(user);
    });
  }

  public getUsers() {
    return this.http.get<User[]>(environment.apiGatewayUrl + '/users');
  }
}
