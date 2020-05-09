import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Pipe({ name: 'dateLocale', pure: false })
export class DateLocaleFilterPipe implements PipeTransform {

	constructor(public translate: TranslateService) { }

	transform (value: string, dateFormat: string): any {
		const lang = this.translate.currentLang;
		moment.locale(lang);
		const dateLocale = moment.utc(value).local();
		return dateLocale.format(dateFormat);
	}
}
