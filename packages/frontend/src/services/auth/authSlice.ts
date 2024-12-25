import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
	UserResponse,
	LoginRequest,
	LogOutResponse,
	AuthState,
	RegisterResponse,
	RegisterRequest,
	User,
} from "./types";
import type { RootState } from "../../store";
import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";

// Create API with endpoints for authentication
export const authEcomerceApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: `${BASE_URL}/api/`,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.token;
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
		credentials: "include",
	}),
	endpoints: (builder) => ({
		login: builder.mutation<UserResponse, LoginRequest>({
			query: (credentials) => ({
				url: "auth/login",
				method: "POST",
				body: credentials,
			}),
		}),
		logout: builder.mutation<LogOutResponse, void>({
			query: () => ({
				url: "auth/logout",
				method: "POST",
				validateStatus(response) {
					return response.ok === true;
				},
			}),
		}),
		register: builder.mutation<RegisterResponse, RegisterRequest>({
			query: (info) => ({
				url: "auth/register",
				method: "POST",
				body: info,
				validateStatus(response) {
					return response.ok === true;
				}
			}),
		}),
		// Admin mutations
		adminCreateUser: builder.mutation<void, UserCreateRequest>({
			query: (data) => ({
				url: "admin/admin/user/create",
				method: "POST",
				body: data,
				validateStatus(response) {
					return response.ok === true;
				}
			}),
		}),
		adminUpdateUser: builder.mutation<UserResponse, UserUpdateRequest>({
			query: ({ userId, ...body }) => ({
				url: `admin/admin/user/update/${userId}`,
				method: "PUT",
				body,
				validateStatus(response) {
					return response.ok === true;
				},
			}),
		}),
		adminDeleteUser: builder.mutation<void, string>({
			query: (userId) => ({
				url: `admin/admin/user/delete/${userId}`,
				method: "DELETE",
				validateStatus(response) {
					return response.ok === true;
				},
			}),
		}),
		adminGetUsers: builder.query<UserResponse[], void>({
			query: () => "admin/admin/users",
			transformResponse: (response: { users: User[] }) => response.users,
			transformErrorResponse: (response) => response.data as ErrorResponse,
			providesTags: ["User"],
		}),
		adminGetUser: builder.query<UserResponse, string>({
			query: (userId) => `admin/admin/user/${userId}`,
			transformResponse: (response: { user: User }) => response.user,
			transformErrorResponse: (response) => response.data as ErrorResponse,
			providesTags: ["User"],
		}),
		adminSearchUsers: builder.query<User[], string>({
            query: (searchTerm) => `admin/admin/users/search?searchTerm=${searchTerm}`,
			transformResponse: (response: { users: User[] }) => response.users,
			transformErrorResponse: (response) => response.data as ErrorResponse,
			providesTags: ["User"],
        }),
		
	}),
});

// Export hooks for usage in functional components
export const { 
	useLoginMutation, 
	useLogoutMutation, 
	useRegisterMutation, 
	useAdminCreateUserMutation, 
	useAdminUpdateUserMutation, 
	useAdminDeleteUserMutation, 
	useAdminGetUsersQuery, 
	useAdminGetUserQuery,
	useAdminSearchUsersQuery,
} = authEcomerceApi;

// Create an auth slice for managing user authentication state
const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,
		token: null,
	} as AuthState,
	reducers: {},
	extraReducers(builder) {
		builder.addMatcher(
			authEcomerceApi.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				state.token = payload.token;
				state.user = {
					id: payload.userId,
					username: payload.username,
					email: payload.email,
					role: payload.role,
				};
				return state;
			},
		);
		builder.addMatcher(authEcomerceApi.endpoints.logout.matchFulfilled, (state) => {
			state.token = null;
			state.user = null;
			return state;
		});
	},
});

// Export the reducer for the store
export default authSlice.reducer;
