import React, { Fragment, ReactElement } from 'react'
import { Provider, connect } from 'react-redux'
import ErrorType from '../interfaces/error.interface'
import State from '../interfaces/state.interface'
import Loading from '../components/Loading'
import Error from '../components/Error'
import App from './App'

interface RootProps extends RootStateProps {
    store: any
}

const Root = ({ store, error, isLoading }: RootProps): ReactElement<{}> => {
    const loader = isLoading ? <Loading /> : null
    const content = error.hasOccurred ? <Error message={error.message} /> : <App />

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
    error: ErrorType
    isLoading: boolean
}

const mapStateToProps = (state: State): RootStateProps => ({
    isLoading: state.app.isLoading,
    error: state.app.error,
})

export default connect(mapStateToProps)(Root)
