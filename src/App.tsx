import "./App.scss"
import {ProfileUser} from "./pages/Profile"
import {Header} from "./components/Header"
import React from "react"
import {Redirect, Route} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "./hooks/redux"
import {Login} from "./pages/Login"
import {PreLoader} from "./components/common/PreLoader/PreLoader"
import {initializeApp} from "./redux/app-reducer"
import {Users} from "./pages/Users"
import {ProfileDataForm} from "./components/ProfileData/ProfileForm/ProfileForm"
import {IProfileUser} from "./type/interface";
import {setProfileUser} from "./redux/profile-reducer";


const App: React.FC = () => {
    const me = useAppSelector((state) => state.authMeSlice)
    const profile = useAppSelector(state => state.profileSlice)
    const {initialized} = useAppSelector((state) => state.initialSlice)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(initializeApp())
    }, [])


    const onSubmit = (formData: IProfileUser) => {
        dispatch(setProfileUser(formData))
    }


    if (!initialized) {
        return <PreLoader/>
    }
    return (
        <>
            <Header login={me.data.login} photos={me.photos}/>
            <div className="App">

                <Route exact path="/">{!me.isAuth ? <Redirect to={"/login"}/> :
                    <ProfileUser id={me.data.id}/>}</Route>
                <Route exact path="/login">{me.isAuth ? <Redirect to={"/profile"}/> :
                    <Login messages={me.messages} captcha={me.captcha}/>}</Route>
                <Route exact path="/profile">{!me.isAuth ? <Redirect to={"/login"}/> :
                    <ProfileUser id={me.data.id}/>}</Route>
                <Route exact path="/profile:id">{!me.isAuth ? <Redirect to={"/login"}/> :
                    <ProfileUser />}</Route>
                <Route exact path={"/users"} render={() => <Users/>} />
                <Route exact path={"/profile/edit"} render={() => <ProfileDataForm onSubmit={onSubmit} initialValues={profile.user} profile={profile.user} />} />
            </div>
        </>

    );
};

export default App;
