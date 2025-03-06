import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Project, User } from '../../model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  public updateProjects(projects: Project[]) {
    return this.http.post(
      environment.apiGatewayUrl + '/projects/update',
      projects
    );
  }
}
