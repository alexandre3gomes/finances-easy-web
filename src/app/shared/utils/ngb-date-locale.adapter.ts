import { Injectable } from '@angular/core';
import { NgbDate, NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Injectable()
export class NgbDateLocaleAdapter extends NgbDateAdapter<Date> {

	constructor(private translate: TranslateService) {
		super();
	}

	fromModel (value: Date): NgbDateStruct {
		moment.locale(this.translate.currentLang);
		const dateLocale = moment.utc(value).local().toObject();
		const dateStruct = new NgbDate(dateLocale.years, dateLocale.months + 1, dateLocale.date);
		return dateStruct;
	}
	toModel (date: NgbDateStruct): Date {
		moment.locale(this.translate.currentLang);
		const dateToFormat = date ? new Date(Date.UTC(date.year, date.month - 1, date.day, 0, 0, 0)) : null;
		const dateLocale = moment.utc(dateToFormat).local();
		return dateLocale.toDate();
	}

}
