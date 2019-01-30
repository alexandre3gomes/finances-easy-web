import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Income } from 'src/app/shared/model/income.model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class IncomeService {
	private incomeEndPoint = environment.api.concat('income');

	constructor(private http: HttpClient) {}

	public create(income: Income): Observable<Income> {
		return this.http.put<Income>(this.incomeEndPoint.concat('/create'), income);
	}
}
