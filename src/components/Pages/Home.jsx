import React from 'react';
import Banner from '../Banner';
import MonthlyHighlights from '../MonthlyHighlights';
import PopularBooks from '../PopularBooks';
import { useLoaderData } from 'react-router';
import FeaturedCategories from '../FeaturedCategories ';
import PersonalityMatcher from '../PersonalityMatcher';


const Home = () => {

    const books = useLoaderData();
    console.log(books);


    return (
        <div>
           <Banner></Banner>
           <PopularBooks books={books}></PopularBooks>
           <FeaturedCategories></FeaturedCategories>
           <PersonalityMatcher></PersonalityMatcher>
           <MonthlyHighlights></MonthlyHighlights>
        </div>
    );
};

export default Home;