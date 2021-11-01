import "./App.scss";
import {ProfileUser} from "./pages/Profile";
import {Header} from "./components/Header";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {getAuthMeServer} from "./redux/auth";
import {Route} from "react-router-dom";

const App = () => {
    const me = useSelector((state) => state.authMeReducer);
    const dispatch = useDispatch();

    React.useEffect( () => {
        dispatch(getAuthMeServer());
    }, []);
debugger
    return (
        <div className="App">
            <Header login={me.login}/>
            <Route exact path='/profile' render={() => <ProfileUser id={me.id}/>}/>
        </div>
    );
};

export default App;
