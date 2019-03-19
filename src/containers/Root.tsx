import React, { Fragment, ReactElement } from 'react'
import { Store } from 'redux'
import { Provider, connect } from 'react-redux'
import Notification from '../entities/notification.interface'
import ReduxState from '../redux/interfaces/state.interface'
import { unsetNotification as unsetNotificationActionCreator } from '../redux/actions/ui.actions'
import Loading from '../components/loading'
import Notifications from '../components/notifications'
import App from './App'

interface Props extends StateProps, DispatchProps {
    store: Store
}

const Root = (props: Props): ReactElement<{}> => {
    const {
        store,
        isLoading,
        notifications,
        unsetNotification,
    } = props

    const loaderElement = isLoading ? <Loading /> : null

    return (
        <Provider store={store}>
            <Fragment>
                {loaderElement}
                <Notifications
                    notifications={notifications}
                    removeNotification={unsetNotification}
                />
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

interface DispatchProps {
    unsetNotification: Function
}

const mapDispatchToProps = {
    unsetNotification: unsetNotificationActionCreator,
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)
