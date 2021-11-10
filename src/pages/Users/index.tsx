import {User} from "../../components/Users/User";
import style from "./Users.module.scss"
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import React from "react";
import {getCurrentPage, getFollowUser, getUnfollowUser, setCurrentPage} from "../../redux/users-reducer";
import {PreLoader} from "../../components/common/PreLoader/PreLoader";
import {Container, Pagination, PaginationItem, Stack} from "@mui/material";
import {NavLink, useHistory} from "react-router-dom";
import queryString from "querystring";

type QueryParamsType = { term?: string; page?: string; friend?: string }

export const Users: React.FC = React.memo(() => {
        const history = useHistory()
        const dispatch = useAppDispatch()
        const users = useAppSelector(state => state.usersSlice)

        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

        React.useEffect(() => {
            const pageNumberPush = Number(parsed.page || 1)
            dispatch(getCurrentPage(pageNumberPush, users.count))
        }, [parsed.page])

        const onPageChanged = (pageNumber: number) => {
            dispatch(setCurrentPage(pageNumber))
        }

        const subscribe = (id: number) => {
            dispatch(getFollowUser(id))
        }
        const unsubscribe = (id: number) => {
            dispatch(getUnfollowUser(id))
        }

        const countPages = Math.ceil(users.totalCount / users.count)

        return (
            <Container maxWidth="xl">
                <Stack spacing={2}>
                    <Pagination count={countPages} onChange={(_, page: number) => onPageChanged(page)}
                                page={users.page} siblingCount={3} variant="outlined" shape="rounded" showFirstButton
                                showLastButton
                                sx={{my: 3, mx: "auto"}}
                                renderItem={(item) => (
                                    <PaginationItem component={NavLink} to={`/users?page=${item.page}`} {...item}/>)}/>
                </Stack>
                {!users.isLoading
                    ? <div className={style.blockUsers}>
                        {users.users.map(user => <User key={user.id} unsubscribe={unsubscribe}
                                                       subscribe={subscribe} {...user}/>)}
                    </div>
                    : <PreLoader/>
                }
            </Container>
        )
    }
)