import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { Subject } from 'rxjs';
import { Default } from '../../shared/enum/default.enum';
import { Breakpoint } from '../../shared/model/budget/breakpoing.model';
import { Category } from '../../shared/model/category.model';
import { Pagination } from '../../shared/model/pagination/pagination.model';
import { AppState } from '../../store/app.reducers';
import { ListCategories } from '../category/store/category.actions';
import { CategoryState } from '../category/store/category.reducers';
import { ListBudgets, ResetBudgets } from './store/budget.actions';

const colors: any = {
	red: {
		primary: '#ad2121',
		secondary: '#FAE3E3'
	},
	blue: {
		primary: '#1e90ff',
		secondary: '#D1E8FF'
	},
	yellow: {
		primary: '#e3bc08',
		secondary: '#FDF1BA'
	}
};

@Component({
	selector: 'app-budget',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: 'budget.component.html'
})
export class BudgetComponent implements OnInit {

	state = this.store.select('expense');
	categories: Category[];
	editModal = false;
	currentId: number;
	breakpoints: Array<Breakpoint>;

	@ViewChild('modalContent') modalContent: TemplateRef<any>;
	view: CalendarView = CalendarView.Month;
	CalendarView = CalendarView;
	viewDate: Date = new Date();
	modalData: {
		action: string;
		event: CalendarEvent;
	};
	actions: CalendarEventAction[] = [
		{
			label: '<i class="fa fa-fw fa-pencil"></i>',
			onClick: ({ event }: { event: CalendarEvent }): void => {
				this.handleEvent('Edited', event);
			}
		},
		{
			label: '<i class="fa fa-fw fa-times"></i>',
			onClick: ({ event }: { event: CalendarEvent }): void => {
				this.events = this.events.filter(iEvent => iEvent !== event);
				this.handleEvent('Deleted', event);
			}
		}
	];
	refresh: Subject<any> = new Subject();
	events: CalendarEvent[] = [
		{
			start: subDays(startOfDay(new Date()), 1),
			end: addDays(new Date(), 1),
			title: 'A 3 day event',
			color: colors.red,
			actions: this.actions,
			allDay: true,
			resizable: {
				beforeStart: true,
				afterEnd: true
			},
			draggable: true
		},
		{
			start: startOfDay(new Date()),
			title: 'An event with no end date',
			color: colors.yellow,
			actions: this.actions
		},
		{
			start: subDays(endOfMonth(new Date()), 3),
			end: addDays(endOfMonth(new Date()), 3),
			title: 'A long event that spans 2 months',
			color: colors.blue,
			allDay: true
		},
		{
			start: addHours(startOfDay(new Date()), 2),
			end: new Date(),
			title: 'A draggable and resizable event',
			color: colors.yellow,
			actions: this.actions,
			resizable: {
				beforeStart: true,
				afterEnd: true
			},
			draggable: true
		}
	];
	activeDayIsOpen = true;
	constructor(private modal: NgbModal, private store: Store<AppState>) { }

	closedEditModal () {
		this.resetData();
		setTimeout(() => {
			this.store.dispatch(new ListBudgets(new Pagination(Default.START_PAGE, Default.MAX_SIZE)));
		}, 100);
	}

	resetData () {
		this.store.dispatch(new ResetBudgets());
		this.editModal = false;
		this.currentId = -1;
	}

	ngOnInit () {
		this.store.select('category').subscribe((categoryState: CategoryState) => {
			if (categoryState.categories.length <= 0) {
				this.store.dispatch(new ListCategories(new Pagination(Default.START_PAGE, Default.MAX_SIZE)));
			}
			this.categories = categoryState.categories;
		});
		this.breakpoints = new Array();
		this.breakpoints.push(new Breakpoint(1, 'Monthly'));
		this.breakpoints.push(new Breakpoint(2, 'Weekly'));
	}

	dayClicked ({ date, events }: { date: Date; events: CalendarEvent[] }): void {
		if (isSameMonth(date, this.viewDate)) {
			this.viewDate = date;
			if (
				(isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
				events.length === 0
			) {
				this.activeDayIsOpen = false;
			} else {
				this.activeDayIsOpen = true;
			}
		}
	}

	eventTimesChanged ({
		event,
		newStart,
		newEnd
	}: CalendarEventTimesChangedEvent): void {
		this.events = this.events.map(iEvent => {
			if (iEvent === event) {
				return {
					...event,
					start: newStart,
					end: newEnd
				};
			}
			return iEvent;
		});
		this.handleEvent('Dropped or resized', event);
	}

	handleEvent (action: string, event: CalendarEvent): void {
		this.modalData = { event, action };
		this.modal.open(this.modalContent, { size: 'lg' });
	}

	addEvent (): void {
		this.events = [
			...this.events,
			{
				title: 'New event',
				start: startOfDay(new Date()),
				end: endOfDay(new Date()),
				color: colors.red,
				draggable: true,
				resizable: {
					beforeStart: true,
					afterEnd: true
				}
			}
		];
	}

	deleteEvent (eventToDelete: CalendarEvent) {
		this.events = this.events.filter(event => event !== eventToDelete);
	}

	setView (view: CalendarView) {
		this.view = view;
	}

	closeOpenMonthViewDay () {
		this.activeDayIsOpen = false;
	}
}
