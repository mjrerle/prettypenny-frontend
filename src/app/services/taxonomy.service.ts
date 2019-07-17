import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Taxonomy } from '../products/taxonomy';
import { Observable } from 'rxjs';
import { Product } from '../products/product';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaxonomyService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  findAll(): Observable<Taxonomy[]> {
    return this.http.get(`${environment.apiBase}/taxonomies`)
      .pipe( map( (t) => t as Taxonomy[]));
  }


  findById(taxonomyId: number): Observable<Taxonomy> {
    return this.http.get(`${environment.apiBase}/taxonomy?taxonomyId=${taxonomyId}`)
      .pipe( map( (t) => t as Taxonomy));
  }

  insert(taxonomyName: string, taxType: string, subTypee: string, prodId: number): Observable<any> {
    let taxonomy = new Taxonomy();
    let product = new Product();
    taxonomy.name = taxonomyName;
    taxonomy.type = taxType;
    taxonomy.subType = subTypee;
    product.productId = prodId;
    taxonomy.product = product;
    return this.http.post(`${environment.apiBase}/taxonomy`, taxonomy)
     .pipe( map( (response: any) => response));
  }

  update(taxonomyName: string, taxType: string, subTypee: string, prodId: number, id: number): Observable<any> {
    let taxonomy = new Taxonomy();
    let product = new Product();
    taxonomy.name = taxonomyName;
    taxonomy.type = taxType;
    taxonomy.subType = subTypee;
    product.productId = prodId;
    taxonomy.product = product;
    taxonomy.taxonomyId = id;
    return this.http.put(`${environment.apiBase}/taxonomy`, taxonomy)
     .pipe( map( (response: any) => response));
  }

  delete(taxonomyId: number): Observable<any> {
    return this.http.delete(`${environment.apiBase}/taxonomy?taxonomyId=${taxonomyId}`)
    .pipe( map( (response: any) => response));
  }
}
