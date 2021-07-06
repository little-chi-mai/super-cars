import React from 'react';
import {CarDetails} from './car';
import currencyFormatter from '../helpers/currencyFormatter';

export interface IProps {
    car: CarDetails
  }

export const CarComponent: React.FC<IProps> = ({car}) => {
    if (car.model) {
        return (
            <div className="car">
                <h1 className="car-name">{car.make} {car.model}</h1>
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
                        <p>{car.fuelType}</p>
                        <p>{car.shiftType}</p>
                        <p>{car.colour}</p>
                    </div>
                </div>
                <div className="car-info-2">
                    <h2 className="car-price">{currencyFormatter(car.price)}</h2>
                    <p className="car-features">{car.features.join(' - ')}</p>
                </div>
            </div>
        ) 
    } else {
        return (
            <div></div>
        )
    }
    
}