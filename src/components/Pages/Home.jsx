import React from 'react';
import Banner from '../Banner';
import MonthlyHighlights from '../MonthlyHighlights';
import PopularBooks from '../PopularBooks';
import { useLoaderData } from 'react-router';
import FeaturedCategories from '../FeaturedCategories ';
import PersonalityMatcher from '../PersonalityMatcher';
import CustomerReviews from '../CustomerReviews';
import SalesPromotion from '../SalesPromotion';


const Home = () => {

    const books = useLoaderData();
    console.log(books);


    return (
        <div>
           
           <Banner></Banner>
           <SalesPromotion></SalesPromotion>
           <div className="w-11/12 sm:w-10/12 md:w-10/12 lg:w-8/12 mx-auto">
            <PopularBooks books={books}></PopularBooks>
           <FeaturedCategories></FeaturedCategories>
           <PersonalityMatcher></PersonalityMatcher>
           <MonthlyHighlights></MonthlyHighlights>
           <CustomerReviews></CustomerReviews>
           </div>
        </div>
    );
};

export default Home;