import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Provider, connect } from 'react-redux'
import Loading from '../components/Loading'
import Error from '../components/Error'
import App from './App'

const Root = ({ store, error, isLoading }) => {
    const loader = isLoading ? <Loading /> : null
    const content = error.get('appears') ? <Error message={error.get('message')} /> : <App />

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
    error: ImmutablePropTypes.mapContains({
        appears: PropTypes.bool.isRequired,
        message: PropTypes.string.isRequired,
    }).isRequired,
}

const mapStateToProps = state => ({
    isLoading: state.app.get('isLoading'),
    error: state.app.get('error'),
})

export default connect(mapStateToProps)(Root)
