export const LOGIN_ROUTE = '/login';
export const NO_PAGE_FOUND_ROUTE = '*';
export const SIGNUP_ROUTE = '/signup';
export const DASHBOARD = '/';
export const PROFILE = '/p/:username';
export const POST_ROUTE = 'post';
export const POST_DETAIL_ROUTE = 'post-detail';
export const ACCOUNT_SETTINGS_ROUTE = '/account';
export const PROFILE_EDIT_ROUTE = `edit`;
export const EXPLORE_ROUTE = '/explore';
export const PEOPLE_ROUTE = 'people';

// Return the complete route for edit profile
export function getProfileEditAccount(){
    return `${ACCOUNT_SETTINGS_ROUTE}/${PROFILE_EDIT_ROUTE}`;
}