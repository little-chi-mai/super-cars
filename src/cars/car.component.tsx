import React from 'react';
import {CarDetails} from './car';
import currencyFormatter from '../helpers/currencyFormatter';

export interface IProps {
    carDetails: CarDetails
  }

export const CarComponent: React.FC<IProps> = ({carDetails}) => {
    if (carDetails.model) {
        return (
            <div className="car">
                <h1 className="car-name">{carDetails.make} {carDetails.model}</h1>
                <div className="car-info-1">
                    <div className="car-info-left"
                    >
                        <p>Fuel</p>
                        <p>Shift</p>
                        <p>Color</p>
                    </div>
                    <div className="divider"></div>
                    <div className="car-info-right"
                    >
                        <p>{carDetails.fuelType}</p>
                        <p>{carDetails.shiftType}</p>
                        <p>{carDetails.colour}</p>
                    </div>
                </div>
                <div className="car-info-2">
                    <p className="search-result-info">
                        {currencyFormatter(carDetails.price)}
                    </p>
                    <p className="car-features">{carDetails.features.join(' - ')}</p>
                </div>
            </div>
        ) 
    } else {
        return (
            <div></div>
        )
    }
    
}