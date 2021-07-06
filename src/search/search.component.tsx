import React, { useState } from 'react';
import {findCars, getCarDetails} from '../cars/car.api';
import {IProps as Props} from '../cars/car.component';
import currencyFormatter from '../helpers/currencyFormatter';

interface IProps {
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
    car: Props["car"]
    setCar: React.Dispatch<React.SetStateAction<Props["car"]>>
}

export const SearchComponent: React.FC<IProps> = ({searchTerm, setSearchTerm, car, setCar}) => {

    let [searchResult, setSearchResult] = useState([]);
    let [isResultShown, setIsResultShown] = useState(false);

    const onChange = function(e: React.ChangeEvent<HTMLInputElement>): void {
        setSearchTerm(e.target.value)
        findCars(e.target.value).then((response: any) => {
            if (!e.target.value) {
                setSearchResult([]);
                setIsResultShown(false);
            } else {
                setSearchResult(response);
                setIsResultShown(true);
            }
            // console.log(response);
        })
    }

    const onClick = function(car: any): void {
        console.log("CAR", car);
        
        let carDetails: any = getCarDetails(car.make, car.model);
        console.log('carDetails', carDetails);
        
        setCar(carDetails);
        setSearchTerm('');
        setSearchResult([]);
    }

    const showSearchResult = (): JSX.Element[] => {
      
        return searchResult.map((car: any) => {
            return (
                <div 
                    className="search-result-car" 
                    key={car.model} 
                    onClick={() => onClick(car)}
                >
                    <h3>{car.make} {car.model}</h3>
                    <h3>{currencyFormatter(car.price)}</h3>
                </div>
            )
        })
    }

    const closeSearchResult = (): void => {
        setTimeout(() => {
            setIsResultShown(false)
        }, 100)
        
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
                onFocus={() => setIsResultShown(true)}
            />
            {isResultShown && searchResult.length > 0 && <div className="search-result">
                {showSearchResult()}
            </div>
            }         
        </div>
    ) 
}