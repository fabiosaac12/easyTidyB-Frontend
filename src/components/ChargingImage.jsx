import React from 'react'
import { connect } from 'react-redux'

const ChargingImage = ({charging}) => {    
    
    const imgStyle = {
        width: '74px',
        height: '74px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginTop: '-37px',
        marginLeft: '-37px',
        zIndex: '1000',
        display: charging > 0 ? '' : 'none'
    }

    return (
        <img id='generalChargingImage' src="https://github.com/fabiosaac12/easyTidyB-Frontend/blob/master/src/styles/chargingImageGandB.png?raw=true" className='imgr' alt='chargingImage' style={imgStyle}></img>
    )
}

const mapStateToProps = (state) => ({
    charging: state.charging
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ChargingImage)
