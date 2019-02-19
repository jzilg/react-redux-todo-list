import React, { Fragment, ReactElement } from 'react'
import { Store } from 'redux'
import { Provider, connect } from 'react-redux'
import Notification from '../entities/notification.interface'
import State from '../redux/interfaces/state.interface'
import { unsetNotification } from '../redux/actions/ui.actions'
import Loading from '../components/Loading'
import Notifications from '../components/Notifications'
import App from './App'

interface RootProps extends RootStateProps {
    store: Store
}

const Root = ({ store, isLoading, notifications }: RootProps): ReactElement<{}> => {
    const removeNotification = (id, triggeredBy): void => {
        store.dispatch(unsetNotification(id, triggeredBy))
    }
    const loader = isLoading ? <Loading /> : null
    const notificationsElement = (
        <Notifications
            notifications={notifications}
            removeNotification={removeNotification}
        />
    )

    return (
        <Provider store={store}>
            <Fragment>
                {loader}
                {notificationsElement}
                <App />
            </Fragment>
        </Provider>
    )
}

interface RootStateProps {
    isLoading: boolean
    notifications: Notification[]
}

const mapStateToProps = (state: State): RootStateProps => ({
    isLoading: state.ui.isLoading,
    notifications: state.ui.notifications,
})

export default connect(mapStateToProps)(Root)
