import React, { Fragment, ReactElement } from 'react'
import { Store } from 'redux'
import { Provider, connect } from 'react-redux'
import Notification from '../entities/notification.interface'
import ReduxState from '../redux/interfaces/state.interface'
import { unsetNotification } from '../redux/actions/ui.actions'
import Loading from '../components/loading'
import Notifications from '../components/notifications'
import App from './App'

interface Props extends StateProps {
    store: Store
}

const Root = ({ store, isLoading, notifications }: Props): ReactElement<{}> => {
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

interface StateProps {
    isLoading: boolean
    notifications: Notification[]
}

const mapStateToProps = (state: ReduxState): StateProps => ({
    isLoading: state.ui.isLoading,
    notifications: state.ui.notifications,
})

export default connect(mapStateToProps)(Root)
