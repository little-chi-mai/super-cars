import React, { useState } from 'react';
import {findCars, getCarDetails} from '../cars/car.api';
import {Car, CarDetails} from '../cars/car';
import {IProps as Props} from '../cars/car.component';
import currencyFormatter from '../helpers/currencyFormatter';

interface IProps {
    searchTerm: string,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
    setCarDetails: React.Dispatch<React.SetStateAction<Props["carDetails"]>>,
}

export const SearchComponent: React.FC<IProps> = ({searchTerm, setSearchTerm, setCarDetails}) => {
    let [searchResult, setSearchResult] = useState<Car[]>([]);
    let [isResultShown, setIsResultShown] = useState<boolean>(false);

    const onInputChange = function(e: React.ChangeEvent<HTMLInputElement>): void {
        const input = e.target.value;
        // update searchTerm
        setSearchTerm(input);
        // search in database with input
        console.log( typeof setSearchTerm )
        findCars(input).then((response: Car[]) => {
            // set searchResult with the response
            setSearchResult(response);
            // show the result on the screen
            setIsResultShown(true);
        })
    }

    const onResultClick = function(car: Car): void {
        let carDetails = getCarDetails(car.make, car.model) as CarDetails;
        // update carDetails
        setCarDetails(carDetails);
        // reset searchTerm into empty string
        setSearchTerm('');
        // reset searchResult into empty array
        setSearchResult([]);
    }

    const showSearchResult = function(): JSX.Element[] {
        return searchResult.map((car: Car) => {
            return (
                <div 
                    className="search-result-car" 
                    key={car.model} 
                    onClick={() => onResultClick(car)}  
                >
                    <p className="search-result-info">{car.make} {car.model}</p>
                    <p className="search-result-info">{currencyFormatter(car.price)}</p>
                </div>
            )
        })
    }

    const closeSearchResult = function(): void {
        // delay closing searchResult to trigger onResultClick() if users click on a result
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
                onChange={onInputChange}
                value={searchTerm}
                onBlur={closeSearchResult}
                onFocus={openSearchResult}
                data-testid="search-input"
            />
            {
                isResultShown && 
                searchResult.length > 0 && 
                <div className="search-result">
                    {showSearchResult()}
                </div>
            }         
        </div>
    ) 
}