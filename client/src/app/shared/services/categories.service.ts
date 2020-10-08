import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category, Message} from "../interfaces/interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})

export class CategoriesService {

  constructor(private http: HttpClient) { }

  fetch(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/category');
  }

  getById(id: string): Observable<Category[]> {
    return this.http.get<Category[]>(`/api/category/${id}`)
  }

  create(name: string, imagePath?: File): Observable<Category> {
    const fordData = new FormData();

    if (imagePath) {
      fordData.append('image', imagePath, imagePath.name)
    }

    fordData.append('name', name);

    return this.http.post<Category>('/api/category', fordData);
  }

  update(id: string, name: string, imagePath?: File): Observable<Category> {
    const fordData = new FormData();

    if (imagePath) {
      fordData.append('image', imagePath, imagePath.name)
    }

    fordData.append('name', name);

    return this.http.patch<Category>(`/api/category/${id}`, fordData);
  }

  remove(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/category/${id}`);
  }

}
