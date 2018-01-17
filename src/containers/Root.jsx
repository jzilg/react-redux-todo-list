import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Provider, connect } from 'react-redux'
import Loading from '../components/Loading'
import Error from '../components/Error'
import App from './App'

const Root = ({ store, error, isLoading }) => {
    const loader = isLoading ? <Loading /> : null
    const content = error.appears ? <Error obj={error.obj} /> : <App />

    return (
        <Provider store={store}>
            <Fragment>
                {loader}
                {content}
            </Fragment>
        </Provider>
    )
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    isLoading: state.app.isLoading,
    error: state.app.error,
})

export default connect(mapStateToProps)(Root)
