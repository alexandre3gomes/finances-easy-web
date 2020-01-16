import { Default } from '../../../shared/enum/default.enum';
import { Page } from '../../../shared/model/pagination/page.model';
import { User } from '../../../shared/model/user.model';
import { UserActions, UserActionsEnum } from './user.actions';

export interface UserState {
    users: User[];
    page: Page;
}

export const initialUserState: UserState = {
    users: [],
    page: null
}


export function userReducers(state = initialUserState, action: UserActions): UserState {
    switch(action.type) {
        case (UserActionsEnum.RESET_USERS): {
            return {
                ...state,
                users: initialUserState.users,
                page: initialUserState.page
            };
        }
        case (UserActionsEnum.ADD_USERS): {
            return {
                ...state,
				users: [...state.users, ...action.payload.content].sort((user1, user2) => user1.name.localeCompare(user2.name)),
                page: action.payload
            };
        }
        case (UserActionsEnum.ADD_USER): {
			const newUsers = [...state.users];
			if(newUsers.length >= Default.PAGE_SIZE) {
				newUsers.pop();
			}
            return {
                ...state,
				users: [action.payload, ...newUsers].sort((user1, user2) => user1.name.localeCompare(user2.name))
            };
        }
        case (UserActionsEnum.ALTER_USER): {
            const newUsers = [...state.users];
            return {
                ...state,
                users: newUsers.sort((user1, user2) => user1.name.localeCompare(user2.name))
            };
        }
        case (UserActionsEnum.REMOVE_USER): {
            const newUsers = [...state.users];
            const deletedUser = newUsers.filter((elem) => elem.id === action.payload);
            newUsers.splice(newUsers.indexOf(deletedUser[0]), 1);
            return {
                ...state,
                users: newUsers
            };
        }
        default:
            return state;
    }
}
