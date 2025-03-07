import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Project } from '@shared/types';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  public getProjects() {
    return this.http.get<Project[]>(environment.apiGatewayUrl + '/projects');
  }

  public updateProjects(projects: Project[]) {
    return this.http.post(
      environment.apiGatewayUrl + '/projects/update',
      projects
    );
  }
}
