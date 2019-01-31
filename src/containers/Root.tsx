import React, { Fragment, ReactElement } from 'react'
import { Store } from 'redux'
import { Provider, connect } from 'react-redux'
import Error from '../interfaces/error.interface'
import State from '../interfaces/state.interface'
import Loading from '../components/Loading'
import ErrorMsg from '../components/ErrorMsg'
import App from './App'

interface RootProps extends RootStateProps {
    store: Store
}

const Root = ({ store, error, isLoading }: RootProps): ReactElement<{}> => {
    const loader = isLoading ? <Loading /> : null
    const content = error.hasOccurred ? <ErrorMsg message={error.message} /> : <App />

    return (
        <Provider store={store}>
            <Fragment>
                {loader}
                {content}
            </Fragment>
        </Provider>
    )
}

interface RootStateProps {
    error: Error
    isLoading: boolean
}

const mapStateToProps = (state: State): RootStateProps => ({
    isLoading: state.app.isLoading,
    error: state.app.error,
})

export default connect(mapStateToProps)(Root)
