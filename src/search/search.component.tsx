import React, { useState } from 'react';
import {findCars, getCarDetails} from '../cars/car.api';
import {Car, CarDetails} from '../cars/car';
import {IProps as Props} from '../cars/car.component';
import currencyFormatter from '../helpers/currencyFormatter';

interface IProps {
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
    setCarDetails: React.Dispatch<React.SetStateAction<Props["carDetails"]>>,
}

export const SearchComponent: React.FC<IProps> = ({searchTerm, setSearchTerm, setCarDetails}) => {

    let [searchResult, setSearchResult] = useState<Car[]>([]);
    let [isResultShown, setIsResultShown] = useState<boolean>(false);

    const onChange = function(e: React.ChangeEvent<HTMLInputElement>): void {
        const input = e.target.value;
        setSearchTerm(input)
        findCars(input).then((response: Car[]) => {
            setSearchResult(response);
            setIsResultShown(true);
        })
    }

    const onClick = function(car: Car): void {
        let carDetails = getCarDetails(car.make, car.model) as CarDetails;
        
        setCarDetails(carDetails);
        setSearchTerm('');
        setSearchResult([]);
    }

    const showSearchResult = function(): JSX.Element[] {
      
        return searchResult.map((car: Car) => {
            return (
                <div 
                    className="search-result-car" 
                    key={car.model} 
                    onClick={() => onClick(car)}
                >
                    <p className="search-result-info">{car.make} {car.model}</p>
                    <p className="search-result-info">{currencyFormatter(car.price)}</p>
                </div>
            )
        })
    }

    const closeSearchResult = function(): void {
        setTimeout(() => {
            setIsResultShown(false);
        }, 200) 
    }

    const openSearchResult = function(): void {
        setIsResultShown(true);
    }

    return (
        <div className="search">
            <input 
                className="search-input" 
                type="search" 
                placeholder="Search..."
                onChange={onChange}
                value={searchTerm}
                onBlur={closeSearchResult}
                onFocus={openSearchResult}
            />
            {isResultShown && searchResult.length > 0 && <div className="search-result">
                {showSearchResult()}
            </div>
            }         
        </div>
    ) 
}